import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  firstName?: string
}

const GUIDE_URL = 'https://supremenergies.com/guide-aides-renovation-2026.pdf'

const Email = ({ firstName }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre guide des aides rénovation 2026, à jour des règles de septembre 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>SupremEnergies</Text>
        <Heading style={h1}>{firstName ? `Bonjour ${firstName},` : 'Bonjour,'}</Heading>
        <Text style={text}>
          Voici votre guide des aides rénovation 2026 : MaPrimeRénov', primes CEE, éco-PTZ et TVA à 5,5 %,
          à jour des changements du 1er septembre 2026.
        </Text>
        <Button href={GUIDE_URL} style={button}>Télécharger le guide (PDF)</Button>
        <Section style={card}>
          <Text style={cardTitle}>À retenir</Text>
          <Text style={li}>• MaPrimeRénov' par geste finance désormais surtout les pompes à chaleur air/eau et géothermiques.</Text>
          <Text style={li}>• Inscrivez la prime CEE avant de signer votre devis.</Text>
          <Text style={li}>• Attendez l'accord MaPrimeRénov' avant le début des travaux.</Text>
        </Section>
        <Text style={text}>
          Vous voulez connaître le montant exact pour votre logement ? Nous faisons l'étude et le devis gratuitement,
          avec réponse sous 24 h.
        </Text>
        <Text style={text}>
          <Link href="https://supremenergies.com/devis-gratuit" style={link}>Demander mon devis gratuit</Link>
          {' '}ou appelez le 01 86 04 68 89.
        </Text>
        <Text style={footer}>
          France Rénov' est le service public qui vous informe gratuitement sur la rénovation : france-renov.gouv.fr — 0 808 800 700.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Votre guide des aides rénovation 2026',
  displayName: 'Guide des aides (envoi au visiteur)',
  previewData: { firstName: 'Céline' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '28px 24px', maxWidth: '560px' }
const brand = { color: '#0B2545', fontWeight: 700, fontSize: '16px', margin: '0 0 18px' }
const h1 = { color: '#0B2545', fontSize: '22px', margin: '0 0 12px' }
const text = { color: '#1F2937', fontSize: '15px', lineHeight: '22px', margin: '0 0 14px' }
const button = { backgroundColor: '#F59E0B', color: '#0B2545', fontWeight: 700, fontSize: '15px', padding: '13px 22px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', margin: '6px 0 20px' }
const card = { backgroundColor: '#F6F8FA', borderRadius: '8px', padding: '14px 18px', margin: '0 0 18px' }
const cardTitle = { color: '#0B2545', fontWeight: 700, fontSize: '14px', margin: '0 0 6px' }
const li = { color: '#1F2937', fontSize: '14px', lineHeight: '20px', margin: '0 0 4px' }
const link = { color: '#13315C', fontWeight: 700 }
const footer = { color: '#6B7280', fontSize: '12px', lineHeight: '18px', marginTop: '24px' }
