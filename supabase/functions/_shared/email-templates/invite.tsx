/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head>
      <style>{darkModeCss}</style>
    </Head>
    <Preview>Vous êtes invité à rejoindre {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Vous êtes invité</Heading>
        <Text style={text}>
          Vous avez été invité à rejoindre{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Cliquez sur le bouton ci-dessous pour accepter l'invitation et créer
          votre compte.
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          Accepter l'invitation
        </Button>
        <Text style={footer}>
          Si vous n'attendiez pas cette invitation, vous pouvez ignorer cet
          e-mail.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Montserrat, Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#0B2545',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#36455C',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const link = { color: 'inherit', textDecoration: 'underline' }
const button = {
  backgroundColor: '#0B2545',
  color: '#ffffff',
  fontSize: '14px',
  border: '1px solid #0B2545',
  borderRadius: '8px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
// Rendered as a text child, which React may HTML-escape: keep this CSS free of >, &, and quotes.
const darkModeCss = `
  @media (prefers-color-scheme: dark) {
    .dm-btn { background-color: #ffffff !important; color: #0B2545 !important; }
  }
  [data-ogsc] .dm-btn { background-color: #ffffff !important; color: #0B2545 !important; }
  [data-ogsb] .dm-btn { background-color: #ffffff !important; color: #0B2545 !important; }
`
