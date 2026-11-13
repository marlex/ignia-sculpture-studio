/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'
const DEFAULT_INVITE_URL = 'https://igniainstitution.com/invite-artist'

interface Props {
  name?: string
  inviteUrl?: string
}

const BENEFITS = [
  'Permanent free access to the Pro plan.',
  '3D digitization of your first three works, at no cost.',
  'A 15% commission for life.',
  'Your own dashboard with statistics on how your works perform.',
  'Access to the art advisors working with Ignia.',
  'A direct voice in how the platform evolves.',
]

const Email = ({ name = '', inviteUrl = DEFAULT_INVITE_URL }: Props) => {
  const greetingName = name || 'there'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>You're invited to join Ignia Institution's founding collection of sculptors</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
          <Heading style={h1}>You're invited to Ignia</Heading>
          <Text style={text}>Hi {greetingName},</Text>
          <Text style={text}>
            Ignia Institution is a home built entirely for sculpture — original works presented in 3D, with a
            blockchain certificate of authenticity, shown to collectors around the world. We'd love for your work
            to be part of our founding collection.
          </Text>
          <Text style={text}>As a founding artist, you get:</Text>
          <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <tbody>
              {BENEFITS.map((b, i) => (
                <tr key={i}>
                  <td style={bulletCell}>—</td>
                  <td style={bulletText}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Text style={text}>
            It's fully compatible with your gallery or your own portfolio: we don't ask for exclusivity, we just
            want to help expand your sculpture's reach to the world.
          </Text>
          <Button href={inviteUrl} style={button}>Invitation Link</Button>
          <Text style={{ ...text, marginTop: 28 }}>Talk soon,</Text>
          <Text style={{ ...text, marginBottom: 0 }}>Mariana</Text>
          <Text style={text}>Ignia Institution</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: () => "You're invited to Ignia Institution",
  displayName: 'Artist invitation',
  previewData: { name: 'Ada', inviteUrl: DEFAULT_INVITE_URL },
} satisfies TemplateEntry

const main: React.CSSProperties = { backgroundColor: '#ffffff', fontFamily: "'Hanken Grotesk', Arial, sans-serif", color: '#121212' }
const container: React.CSSProperties = { padding: '48px 40px', maxWidth: '560px' }
const logo: React.CSSProperties = { display: 'block', margin: '0 0 32px' }
const h1: React.CSSProperties = { fontFamily: "'Albert Sans', Georgia, serif", fontWeight: 600, fontSize: '28px', lineHeight: 1.2, color: '#121212', margin: '0 0 24px' }
const text: React.CSSProperties = { fontSize: '16px', lineHeight: 1.6, color: '#121212', margin: '0 0 16px', fontWeight: 400 }
const bulletCell: React.CSSProperties = { width: 20, verticalAlign: 'top', fontSize: '15px', color: '#121212', paddingBottom: 10 }
const bulletText: React.CSSProperties = { fontSize: '15px', lineHeight: 1.5, color: '#121212', paddingBottom: 10 }
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
