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
    preview: 'Bienvenida al equipo fundador de Ignia',
    heading: 'Bienvenida al equipo fundador',
    body: (n: string) =>
      `Hola ${n}, es un honor darte la bienvenida oficialmente a Ignia. Desde hoy formas parte del equipo fundador: un grupo reducido de artistas que están dando forma a la galería desde su origen.`,
    body2:
      'Tu obra, tu voz y tu criterio son parte esencial de lo que Ignia quiere ser. Pronto te escribiremos para coordinar los siguientes pasos: perfil público, primeras piezas y presencia en la colección.',
    sign: 'Con admiración,',
    team: 'Ignia.',
  },
  en: {
    preview: 'Welcome to the Ignia founding team',
    heading: 'Welcome to the founding team',
    body: (n: string) =>
      `Hi ${n}, it's an honour to officially welcome you to Ignia. From today you are part of the founding team: a small group of artists shaping the gallery from its very beginning.`,
    body2:
      'Your work, your voice and your judgement are essential to what Ignia is becoming. We\'ll be in touch soon to coordinate the next steps: public profile, first pieces and presence in the collection.',
    sign: 'With admiration,',
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
          <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>{c.body(greetingName)}</Text>
          <Text style={text}>{c.body2}</Text>
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
      ? 'Welcome to the Ignia founding team'
      : 'Bienvenida al equipo fundador de Ignia',
  displayName: 'Founding artist welcome',
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
