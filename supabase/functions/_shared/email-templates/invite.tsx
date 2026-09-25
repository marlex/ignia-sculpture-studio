/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://igniainstitution.com/ignia-logo-email.png'


interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to Ignia</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Ignia Institution" width="120" height="34" style={logo} />
        <Heading style={h1}>Welcome to Ignia</Heading>

        <Text style={text}>
          You've been invited to join Ignia. Click the button below to accept your invitation and set your password.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Accept invitation
        </Button>
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

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
const button: React.CSSProperties = {
  backgroundColor: '#121212',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  padding: '14px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '8px 0 24px',
}
const footer: React.CSSProperties = { fontSize: '13px', color: '#6b6b6b', margin: '24px 0 0' }
