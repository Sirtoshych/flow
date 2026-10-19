import { useEffect, useState } from 'react'

import events from './events.json'
import type { Lang } from './i18n.js'

export const LOCALE: Record<Lang, string> = { pl: 'pl-PL', en: 'en-GB' }

const TRAINING_WEEKDAYS = [1, 3]
const TRAINING_HOUR = 20

export type SiteEvent = { date: Date; championship: boolean; title: string; desc: string }

export function localizedEvents(lang: Lang): SiteEvent[] {
  return events.map(e => ({ date: new Date(`${e.date}T09:00`), championship: e.kind === 'championship', title: e.title[lang], desc: e.desc[lang] }))
}

export function nextEvent(list: SiteEvent[], now: number): SiteEvent | undefined {
  return list.find(e => e.date.getTime() > now) ?? list.at(-1)
}

export function nextTraining(now: number): Date {
  for (let k = 0; ; k++) {
    const d = new Date(now)
    d.setDate(d.getDate() + k)
    d.setHours(TRAINING_HOUR, 0, 0, 0)
    if (TRAINING_WEEKDAYS.includes(d.getDay()) && d.getTime() > now) return d
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function countdown(target: number, now: number): [days: string, hours: string, minutes: string] {
  const diff = Math.max(0, target - now)
  return [pad(Math.floor(diff / 864e5)), pad(Math.floor(diff / 36e5) % 24), pad(Math.floor(diff / 6e4) % 60)]
}

export function useNow(intervalMs: number): number {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
