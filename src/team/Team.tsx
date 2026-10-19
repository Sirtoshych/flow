import type { Scope } from '../data.js'
import { HeadToHead } from './HeadToHead.js'
import { PassingNetwork } from './PassingNetwork.js'

export function Team({ scope }: { scope: Scope }) {
  return (
    <>
      <PassingNetwork scope={scope} />
      <HeadToHead scope={scope} />
    </>
  )
}
