/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head>
      <style>{darkModeCss}</style>
    </Head>
    <Preview>Réinitialisez votre mot de passe pour {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Réinitialisation du mot de passe</Heading>
        <Text style={text}>
          Nous avons reçu une demande de réinitialisation de votre mot de passe
          pour {siteName}. Cliquez sur le bouton ci-dessous pour en choisir un
          nouveau.
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          Réinitialiser mon mot de passe
        </Button>
        <Text style={footer}>
          Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer
          cet e-mail. Votre mot de passe ne sera pas modifié.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

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
