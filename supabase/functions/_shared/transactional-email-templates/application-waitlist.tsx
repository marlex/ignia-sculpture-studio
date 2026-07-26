/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  lang?: 'es' | 'en'
}

const copy = {
  es: {
    preview: 'Tu solicitud está en lista de espera',
    heading: 'Estás en la lista de espera',
    body: (n: string) => `Hola ${n}, gracias de nuevo por tu interés en Ignia. Por ahora hemos incluido tu solicitud en nuestra lista de espera. El cupo actual está limitado, y te escribiremos en cuanto se abra un espacio para ti.`,
    sign: 'Un abrazo,',
    team: 'Ignia.',
  },
  en: {
    preview: 'Your application is on the waitlist',
    heading: 'You are on the waitlist',
    body: (n: string) => `Hi ${n}, thank you again for your interest in Ignia. For now, we've placed your application on our waitlist. Our current cohort is limited, and we'll be in touch as soon as a spot opens for you.`,
    sign: 'Warmly,',
    team: 'Ignia.',
  },
}

const Email = ({ name = '', lang = 'es' }: Props) => {
  const c = copy[lang] ?? copy.es
  const greetingName = name || (lang === 'es' ? 'artista' : 'artist')
  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{c.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>{c.body(greetingName)}</Text>
          <Text style={text}>{c.sign}</Text>
          <Text style={text}>{c.team}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) =>
    data?.lang === 'en'
      ? 'Your Ignia application — waitlist'
      : 'Tu solicitud en Ignia — lista de espera',
  displayName: 'Application waitlisted',
  previewData: { name: 'Ada', lang: 'es' },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Manrope', Arial, sans-serif",
  color: '#121212',
}
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const h1: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 600,
  fontSize: '28px',
  lineHeight: 1.2,
  color: '#121212',
  margin: '0 0 24px',
}
const text: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.6,
  color: '#121212',
  margin: '0 0 16px',
  fontWeight: 400,
}
