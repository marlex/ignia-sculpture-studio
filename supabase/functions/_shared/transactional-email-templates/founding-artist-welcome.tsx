/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
const LOGIN_URL = 'https://igniainstitution.com/dashboard'
const RESET_URL = 'https://igniainstitution.com/recuperar-password'
const REPLY_EMAIL = 'hello@igniainstitution.com'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  lang?: 'es' | 'en'
}

const copy = {
  es: {
    preview: 'Bienvenida a la primera colección de escultores de Ignia',
    heading: (n: string) => `Bienvenida a Ignia, ${n}`,
    greeting: (n: string) => `Hola ${n},`,
    body:
      'Tu solicitud ha sido aprobada. Bienvenida a la primera colección de escultores de Ignia.',
    body2:
      'Inicia sesión con el email y la contraseña que elegiste al registrarte en la invitación, y sube tu primera obra:',
    cta: 'Ir a mi perfil',
    forgot: '¿Olvidaste tu contraseña?',
    resetCta: 'Crea una nueva aquí',
    control:
      'Tú mantienes el control total de tu perfil: tus fotos, tus textos, tus precios. Si prefieres que te lo preparemos nosotros, responde a este email con tus fotos y detalles y nosotros nos encargamos.',
    replyNote: (email: string) => `Puedes escribirnos directamente a ${email}.`,
    thanks: 'Gracias por ser parte de esto desde el principio.',
    sign: 'Mariana',
    team: 'Ignia Institution',
  },
  en: {
    preview: "Welcome to Ignia's first collection of sculptors",
    heading: (n: string) => `Welcome to Ignia Institution, ${n}`,
    greeting: (n: string) => `Hello ${n},`,
    body: "Your application has been approved. Welcome to Ignia's first collection of sculptors.",
    body2: 'Log in with the email and password you chose when you registered on the invitation, and add your first work:',
    cta: 'Go to my profile',
    forgot: 'Forgot your password?',
    resetCta: 'Set a new one here',
    control:
      'You stay in full control of your profile: your photos, your texts, your prices. If you would rather we prepare it for you, just reply to this email with your photos and details and we will take care of it.',
    replyNote: (email: string) => `You can write to us directly at ${email}.`,
    thanks: 'Thank you for being part of this from the beginning.',
    sign: 'Mariana',
    team: 'Ignia Institution',
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
          <Heading style={h1}>{c.heading(greetingName)}</Heading>
          <Text style={text}>{c.greeting(greetingName)}</Text>
          <Text style={text}>{c.body}</Text>
          <Text style={text}>{c.body2}</Text>
          <Button href={LOGIN_URL} style={button}>{c.cta}</Button>
          <Text style={{ ...text, marginTop: 28 }}>
            {c.forgot}{' '}
            <Link href={RESET_URL} style={link}>{c.resetCta}</Link>
          </Text>
          <Text style={text}>{c.control}</Text>
          <Text style={text}>{c.replyNote(REPLY_EMAIL)}</Text>
          <Text style={text}>{c.thanks}</Text>
          <Text style={{ ...text, marginBottom: 0 }}>{c.sign}</Text>
          <Text style={text}>{c.team}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) => {
    const n = data?.name || (data?.lang === 'en' ? 'artist' : 'artista')
    return data?.lang === 'en' ? `Welcome to Ignia Institution, ${n}` : `Bienvenida a Ignia Institution, ${n}`
  },
  displayName: 'Founding artist welcome',
  previewData: { name: 'Ada', lang: 'es' },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Hanken Grotesk', Arial, sans-serif",
  color: '#121212',
}
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const logo: React.CSSProperties = { display: 'block', margin: '0 0 32px' }
const h1: React.CSSProperties = {
  fontFamily: "'Albert Sans', Georgia, serif",
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
const link: React.CSSProperties = { color: '#121212', textDecoration: 'underline' }
const button: React.CSSProperties = {
  backgroundColor: '#121212',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '16px 28px',
  display: 'inline-block',
}
