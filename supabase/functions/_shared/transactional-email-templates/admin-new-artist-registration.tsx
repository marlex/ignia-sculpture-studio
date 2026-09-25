/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  requestedRole?: string
}

const Email = ({ name, email, requestedRole }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nuevo registro pendiente de aprobación</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
        <Heading style={h1}>Nuevo registro pendiente</Heading>
        <Text style={text}>
          {name || 'Alguien'} ({email}) acaba de registrarse solicitando el rol de{' '}
          {requestedRole === 'artist' ? 'artista' : requestedRole || 'usuario'}.
        </Text>
        <Text style={text}>
          Revísalo y apruébalo en{' '}
          <Link href="https://igniainstitution.com/admin/dashboard/solicitudes" style={link}>
            tu panel de Solicitudes
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Nuevo registro pendiente de aprobación',
  displayName: 'Admin: new artist registration',
  to: 'magbolivar@gmail.com',
  previewData: { name: 'Ada', email: 'ada@example.com', requestedRole: 'artist' },
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
