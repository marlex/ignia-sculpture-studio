/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  lang?: 'es' | 'en'
}

const copy = {
  es: {
    preview: 'Aún no has publicado tu primera obra',
    heading: 'Tu perfil está listo. ¿Publicamos tu primera obra?',
    body: (n: string) =>
      `Hola ${n}, notamos que tu cuenta de artista ya está activa pero todavía no has publicado ninguna obra.`,
    body2: 'Cuando quieras, puedes subir tu primera pieza desde tu panel — toma solo unos minutos.',
    cta: 'Publicar una obra',
    sign: 'Un saludo,',
    team: 'El equipo de Ignia',
  },
  en: {
    preview: "You haven't published your first work yet",
    heading: "Your profile is ready. Let's publish your first work?",
    body: (n: string) =>
      `Hi ${n}, we noticed your artist account is active but you haven't published any work yet.`,
    body2: 'Whenever you\'re ready, you can upload your first piece from your dashboard — it only takes a few minutes.',
    cta: 'Publish a work',
    sign: 'Best,',
    team: 'The Ignia team',
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
          <Text style={text}>
            <Link href="https://igniainstitution.com/publicar" style={link}>{c.cta}</Link>
          </Text>
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
    data?.lang === 'en' ? "You haven't published your first work yet" : 'Aún no has publicado tu primera obra',
  displayName: 'Artist upload reminder (24h)',
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
  fontSize: '24px',
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
const link: React.CSSProperties = { color: '#121212', textDecoration: 'underline' }
