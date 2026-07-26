import type { ComponentType } from 'npm:react@18.3.1'
import { template as applicationReceived } from './application-received.tsx'
import { template as applicationWaitlist } from './application-waitlist.tsx'
import { template as applicationRejected } from './application-rejected.tsx'
import { template as foundingArtistWelcome } from './founding-artist-welcome.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'application-received': applicationReceived,
  'application-waitlist': applicationWaitlist,
  'application-rejected': applicationRejected,
  'founding-artist-welcome': foundingArtistWelcome,
}
