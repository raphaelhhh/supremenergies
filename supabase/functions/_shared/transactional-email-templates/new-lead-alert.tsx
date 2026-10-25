import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  sourceLabel?: string
  name?: string
  phone?: string
  email?: string
  postalCode?: string
  message?: string
  pagePath?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={row}><strong>{label} :</strong> {value}</Text>
  ) : null

const Email = ({ sourceLabel, name, phone, email, postalCode, message, pagePath }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Nouveau lead {sourceLabel ?? ''} : {name ?? phone ?? email ?? ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>SupremEnergies</Text>
        <Heading style={h1}>Nouveau lead à rappeler</Heading>
        <Text style={badge}>{sourceLabel ?? 'Formulaire du site'}</Text>
        <Section style={card}>
          <Row label="Nom" value={name} />
          <Row label="Téléphone" value={phone} />
          <Row label="E-mail" value={email} />
          <Row label="Code postal / ville" value={postalCode} />
          <Row label="Détails" value={message} />
          <Row label="Page" value={pagePath} />
        </Section>
        {phone ? (
          <Button href={`tel:${phone.replace(/\s/g, '')}`} style={button}>Appeler {phone}</Button>
        ) : null}
        <Text style={footer}>Tous les leads sont aussi visibles sur supremenergies.com/admin/leads</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `Nouveau lead ${d.sourceLabel ?? ''} – ${d.name ?? d.phone ?? d.email ?? ''}`.trim(),
  displayName: 'Alerte nouveau lead',
  to: 'admin@supremenergies.com',
  previewData: { sourceLabel: 'Demande de devis', name: 'Jean Dupont', phone: '06 12 34 56 78', email: 'jean@example.com', postalCode: '93500', message: 'Pompe à chaleur, maison 110 m²', pagePath: '/devis-gratuit' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Montserrat, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const brand = { color: '#0B2545', fontWeight: 700, fontSize: '16px', margin: '0 0 12px' }
const h1 = { color: '#0B2545', fontSize: '22px', margin: '0 0 8px' }
const badge = { display: 'inline-block', backgroundColor: '#FEF3C7', color: '#0A1B2E', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 }
const card = { border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px', margin: '16px 0' }
const row = { fontSize: '14px', color: '#0A1B2E', margin: '6px 0', lineHeight: '20px' }
const button = { backgroundColor: '#F59E0B', color: '#0A1B2E', padding: '12px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#64748B', marginTop: '24px' }
