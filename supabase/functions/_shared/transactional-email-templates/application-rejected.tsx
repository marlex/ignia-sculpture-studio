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
    preview: 'Sobre tu solicitud en Ignia',
    heading: 'Sobre tu solicitud',
    body: (n: string) => `Hola ${n}, gracias por tu interés en Ignia y por el tiempo que dedicaste a tu solicitud. Tras revisarla con calma, en este momento no podemos ofrecerte una plaza en el proyecto. Valoramos mucho tu trabajo y te deseamos lo mejor en tu camino.`,
    sign: 'Un abrazo,',
    team: 'Ignia.',
  },
  en: {
    preview: 'About your Ignia application',
    heading: 'About your application',
    body: (n: string) => `Hi ${n}, thank you for your interest in Ignia and for the time you put into your application. After reviewing it carefully, we're not able to offer you a place in the project right now. We truly value your work and wish you all the best on your path.`,
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
      ? 'About your Ignia application'
      : 'Sobre tu solicitud en Ignia',
  displayName: 'Application rejected',
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
