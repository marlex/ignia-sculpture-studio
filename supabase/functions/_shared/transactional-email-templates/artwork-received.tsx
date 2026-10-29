/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  title?: string
  lang?: 'es' | 'en'
}

const copy = {
  es: {
    preview: (title: string) => `Recibimos tu obra "${title}"`,
    heading: 'Obra recibida',
    greeting: (n: string, title: string) => `Hola ${n}, recibimos "${title}" y ya está en revisión.`,
    body: 'Te avisaremos por email en cuanto la aprobemos y quede activa en la colección.',
    sign: 'Un saludo,',
    team: 'El equipo de Ignia',
  },
  en: {
    preview: (title: string) => `We received your work "${title}"`,
    heading: 'Artwork received',
    greeting: (n: string, title: string) => `Hi ${n}, we received "${title}" and it's now in review.`,
    body: "We'll email you as soon as it's approved and live in the collection.",
    sign: 'Best,',
    team: 'The Ignia team',
  },
}

const Email = ({ name, title = '', lang = 'en' }: Props) => {
  const c = copy[lang] ?? copy.en
  const greetingName = name || (lang === 'es' ? 'artista' : 'artist')
  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{c.preview(title)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>{c.greeting(greetingName, title)}</Text>
          <Text style={text}>{c.body}</Text>
          <Text style={text}>{c.sign}<br />{c.team}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) =>
    data?.lang === 'es' ? `Recibimos tu obra "${data?.title ?? ''}"` : `We received your work "${data?.title ?? ''}"`,
  displayName: 'Artwork received (artist)',
  previewData: { name: 'Ada', title: 'Celosía menor', lang: 'en' },
} satisfies TemplateEntry

const main: React.CSSProperties = { backgroundColor: '#ffffff', fontFamily: "'Hanken Grotesk', Arial, sans-serif", color: '#121212' }
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const logo: React.CSSProperties = { display: 'block', margin: '0 0 32px' }
const h1: React.CSSProperties = { fontFamily: "'Albert Sans', Georgia, serif", fontWeight: 600, fontSize: '24px', lineHeight: 1.2, color: '#121212', margin: '0 0 24px' }
const text: React.CSSProperties = { fontSize: '16px', lineHeight: 1.6, color: '#121212', margin: '0 0 16px', fontWeight: 400 }
