/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Preview, Text } from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  title?: string
}

const Email = ({ name, title }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Recibimos tu obra "{title}"</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
        <Heading style={h1}>Obra recibida</Heading>
        <Text style={text}>Hola {name || 'artista'}, recibimos "{title}" y ya está en revisión.</Text>
        <Text style={text}>Te avisaremos por email en cuanto la aprobemos y quede activa en la colección.</Text>
        <Text style={text}>Un saludo,<br />El equipo de Ignia</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) => `Recibimos tu obra "${data?.title ?? ''}"`,
  displayName: 'Artwork received (artist)',
  previewData: { name: 'Ada', title: 'Celosía menor' },
} satisfies TemplateEntry

const main: React.CSSProperties = { backgroundColor: '#ffffff', fontFamily: "'Manrope', Arial, sans-serif", color: '#121212' }
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const logo: React.CSSProperties = { display: 'block', margin: '0 0 32px' }
const h1: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: '24px', lineHeight: 1.2, color: '#121212', margin: '0 0 24px' }
const text: React.CSSProperties = { fontSize: '16px', lineHeight: 1.6, color: '#121212', margin: '0 0 16px', fontWeight: 400 }
