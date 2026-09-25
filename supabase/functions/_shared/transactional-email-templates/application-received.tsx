/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  lang?: 'es' | 'en'
}

const copy = {
  es: {
    preview: 'Hemos recibido tu solicitud',
    heading: 'Hemos recibido tu solicitud',
    body: (n: string) => `Hola ${n}, gracias por querer formar parte de Ignia. Hemos recibido tu solicitud y la estamos revisando con calma. Te escribiremos pronto con los siguientes pasos.`,
    sign: 'Un abrazo,',
    team: 'Ignia.',
  },
  en: {
    preview: "We've received your application",
    heading: "We've received your application",
    body: (n: string) => `Hi ${n}, thank you for wanting to be part of Ignia. We've received your application and are reviewing it carefully. We'll be in touch soon with next steps.`,
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
          <Img src={LOGO_URL} alt="Ignia Gallery" width="120" height="34" style={logo} />
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
      ? "We've received your application — Ignia"
      : 'Hemos recibido tu solicitud — Ignia',
  displayName: 'Application received',
  previewData: { name: 'Ada', lang: 'es' },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Manrope', Arial, sans-serif",
  color: '#121212',
}
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const logo: React.CSSProperties = { display: 'block', margin: '0 0 32px' }
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
