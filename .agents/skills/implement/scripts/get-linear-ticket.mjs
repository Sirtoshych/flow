#!/usr/bin/env node

import { pathToFileURL } from 'node:url';

const LINEAR_GRAPHQL_URL = 'https://api.linear.app/graphql';
const ISSUE_IDENTIFIER_PATTERN = /^[A-Z][A-Z0-9]*-\d+$/;

const ISSUE_SELECTION = `
      id
      identifier
      title
      description
      priority
      estimate
      url
      createdAt
      updatedAt
      dueDate
      state {
        id
        name
        type
      }
      team {
        id
        key
        name
      }
      project {
        id
        name
      }
      assignee {
        id
        name
        email
      }
      labels {
        nodes {
          id
          name
        }
      }
      attachments {
        nodes {
          id
          title
          subtitle
          url
          sourceType
        }
      }
      comments {
        nodes {
          id
          body
          createdAt
          updatedAt
          user {
            id
            name
            displayName
            email
          }
        }
      }
`;

const ISSUE_QUERY_BY_IDENTIFIER_ARGUMENT = `
  query GetIssueByIdentifier($identifier: String!) {
    issue(identifier: $identifier) {
${ISSUE_SELECTION}
    }
  }
`;

const ISSUE_QUERY_BY_ID_ARGUMENT = `
  query GetIssueById($identifier: String!) {
    issue(id: $identifier) {
${ISSUE_SELECTION}
    }
  }
`;

const ISSUE_QUERY_BY_ISSUES_FILTER = `
  query GetIssueByFilter($identifier: String!) {
    issues(first: 1, filter: { identifier: { eq: $identifier } }) {
      nodes {
${ISSUE_SELECTION}
      }
    }
  }
`;

const ISSUE_QUERY_CANDIDATES = [
  ISSUE_QUERY_BY_IDENTIFIER_ARGUMENT,
  ISSUE_QUERY_BY_ID_ARGUMENT,
  ISSUE_QUERY_BY_ISSUES_FILTER,
];

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertNonEmpty(value, fieldName) {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string.`);
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${fieldName} must be provided.`);
  }

  return trimmed;
}

export function normalizeTicketIdentifier(value) {
  const normalized = assertNonEmpty(value, 'Ticket identifier').toUpperCase();

  if (!ISSUE_IDENTIFIER_PATTERN.test(normalized)) {
    throw new Error(`Ticket identifier "${value}" is invalid. Expected format: TEAM-123.`);
  }

  return normalized;
}

function parseUrl(value) {
  try {
    return new URL(value).toString();
  } catch (_error) {
    throw new Error(`LINEAR_API_URL is invalid: "${value}".`);
  }
}

function parseFlagValue(argument, flagName) {
  const prefix = `${flagName}=`;
  if (!argument.startsWith(prefix)) {
    return null;
  }

  return argument.slice(prefix.length);
}

export function parseCliArgs(argv, env = process.env) {
  const args = argv.slice(2);
  let showHelp = false;
  let identifier = '';
  let apiKey = env.LINEAR_API_KEY ?? '';
  let apiUrl = env.LINEAR_API_URL ?? LINEAR_GRAPHQL_URL;

  for (const argument of args) {
    if (argument === '--help' || argument === '-h') {
      showHelp = true;
      continue;
    }

    const apiKeyValue = parseFlagValue(argument, '--api-key');
    if (apiKeyValue !== null) {
      apiKey = apiKeyValue;
      continue;
    }

    const apiUrlValue = parseFlagValue(argument, '--api-url');
    if (apiUrlValue !== null) {
      apiUrl = apiUrlValue;
      continue;
    }

    if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`);
    }

    if (identifier.length > 0) {
      throw new Error(`Unexpected extra argument: "${argument}". Provide only one ticket identifier.`);
    }

    identifier = argument;
  }

  if (showHelp) {
    return { showHelp: true };
  }

  const normalizedIdentifier = normalizeTicketIdentifier(identifier);
  const normalizedApiKey = assertNonEmpty(apiKey, 'LINEAR_API_KEY');
  const normalizedApiUrl = parseUrl(assertNonEmpty(apiUrl, 'LINEAR_API_URL'));

  return {
    showHelp: false,
    identifier: normalizedIdentifier,
    apiKey: normalizedApiKey,
    apiUrl: normalizedApiUrl,
  };
}

function normalizeIssuePayload(issue) {
  const labels = Array.isArray(issue.labels?.nodes) ? issue.labels.nodes : [];
  const comments = Array.isArray(issue.comments?.nodes) ? issue.comments.nodes : [];
  const attachments = Array.isArray(issue.attachments?.nodes) ? issue.attachments.nodes : [];

  return {
    issue: {
      id: issue.id,
      identifier: issue.identifier,
      title: issue.title,
      description: issue.description ?? '',
      priority: issue.priority ?? null,
      estimate: issue.estimate ?? null,
      url: issue.url ?? null,
      createdAt: issue.createdAt ?? null,
      updatedAt: issue.updatedAt ?? null,
      dueDate: issue.dueDate ?? null,
      state: issue.state ?? null,
      team: issue.team ?? null,
      project: issue.project ?? null,
      assignee: issue.assignee ?? null,
      labels: labels.map(label => ({
        id: label.id,
        name: label.name,
      })),
    },
    comments: comments.map(comment => ({
      id: comment.id,
      body: comment.body ?? '',
      createdAt: comment.createdAt ?? null,
      updatedAt: comment.updatedAt ?? null,
      user: comment.user ?? null,
    })),
    attachments: attachments.map(attachment => ({
      id: attachment.id,
      title: attachment.title ?? '',
      subtitle: attachment.subtitle ?? '',
      url: attachment.url ?? '',
      sourceType: attachment.sourceType ?? '',
    })),
  };
}

function joinGraphQLErrorMessages(errors) {
  const messages = [];

  for (const error of errors) {
    if (isRecord(error) && typeof error.message === 'string' && error.message.trim().length > 0) {
      messages.push(error.message.trim());
    }
  }

  if (messages.length === 0) {
    return 'Unknown GraphQL error.';
  }

  return messages.join(' | ');
}

function hasGraphQLErrors(parsed) {
  return isRecord(parsed) && Array.isArray(parsed.errors) && parsed.errors.length > 0;
}

function isSchemaValidationError(errors) {
  for (const error of errors) {
    if (!isRecord(error)) {
      continue;
    }

    const code = isRecord(error.extensions) && typeof error.extensions.code === 'string' ? error.extensions.code : '';
    if (code === 'GRAPHQL_VALIDATION_FAILED') {
      return true;
    }

    const message = typeof error.message === 'string' ? error.message : '';
    if (
      message.includes('Unknown argument') ||
      message.includes('Unknown type') ||
      message.includes('Unknown field') ||
      message.includes('Field "issue" argument "id" of type') ||
      message.includes('is required')
    ) {
      return true;
    }
  }

  return false;
}

async function readResponseText(response) {
  try {
    return await response.text();
  } catch (_error) {
    return '';
  }
}

async function executeLinearQuery(input, query, fetchFn) {
  const payload = {
    query,
    variables: { identifier: input.identifier },
  };

  const response = await fetchFn(input.apiUrl, {
    method: 'POST',
    headers: {
      Authorization: input.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await readResponseText(response);
  let parsed = null;

  if (responseText.trim().length > 0) {
    try {
      parsed = JSON.parse(responseText);
    } catch (_error) {
      if (!response.ok) {
        throw new Error(`Linear API request failed with status ${response.status}. Response body: ${responseText.trim().slice(0, 300)}`);
      }
      throw new Error('Linear API response is malformed: expected valid JSON.');
    }
  }

  if (!response.ok && !hasGraphQLErrors(parsed)) {
    const preview = responseText.trim().slice(0, 300);
    const details = preview.length > 0 ? ` Response body: ${preview}` : '';
    throw new Error(`Linear API request failed with status ${response.status}.${details}`);
  }

  if (!isRecord(parsed)) {
    throw new Error('Linear API response is malformed: expected a JSON object.');
  }

  return parsed;
}

function extractIssueFromGraphQLData(data) {
  if (!isRecord(data)) {
    return null;
  }

  if (isRecord(data.issue)) {
    return data.issue;
  }

  if (isRecord(data.issues) && Array.isArray(data.issues.nodes) && data.issues.nodes.length > 0 && isRecord(data.issues.nodes[0])) {
    return data.issues.nodes[0];
  }

  return null;
}

export async function fetchLinearTicket(input, fetchFn = globalThis.fetch) {
  if (typeof fetchFn !== 'function') {
    throw new Error('Global fetch is unavailable. Use Node.js 18+ or provide a custom fetch function.');
  }

  let lastNonValidationErrors = null;

  for (const query of ISSUE_QUERY_CANDIDATES) {
    const parsed = await executeLinearQuery(input, query, fetchFn);
    const errors = Array.isArray(parsed.errors) ? parsed.errors : [];

    if (errors.length > 0) {
      if (isSchemaValidationError(errors)) {
        continue;
      }
      lastNonValidationErrors = errors;
      continue;
    }

    const issue = extractIssueFromGraphQLData(parsed.data);
    if (issue !== null) {
      return normalizeIssuePayload(issue);
    }
  }

  if (lastNonValidationErrors !== null) {
    throw new Error(`Linear GraphQL errors: ${joinGraphQLErrorMessages(lastNonValidationErrors)}`);
  }

  throw new Error(`Ticket "${input.identifier}" was not found.`);
}

function formatUsage() {
  return [
    'Usage:',
    '  node .agents/skills/implement/scripts/get-linear-ticket.mjs <TICKET-ID> [--api-url=<url>]',
    '',
    'Examples:',
    '  LINEAR_API_KEY=lin_api_*** node .agents/skills/implement/scripts/get-linear-ticket.mjs PET-123',
    '  node .agents/skills/implement/scripts/get-linear-ticket.mjs PET-123',
  ].join('\n');
}

async function main() {
  const parsed = parseCliArgs(process.argv);

  if (parsed.showHelp) {
    process.stdout.write(`${formatUsage()}\n`);
    return;
  }

  const ticket = await fetchLinearTicket(parsed);
  process.stdout.write(`${JSON.stringify(ticket, null, 2)}\n`);
}

const entrypoint = process.argv[1] ? pathToFileURL(process.argv[1]).href : '';
if (import.meta.url === entrypoint) {
  main().catch(error => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`get-linear-ticket: ${message}\n`);
    process.exitCode = 1;
  });
}
