"""Génère public/guide-aides-renovation-2026.pdf (guide envoyé aux visiteurs).

Relancer après chaque changement de règles : python3 scripts/generate-guide-pdf.py
Règles vérifiées le 4 novembre 2026 (service-public.gouv.fr, Anah, CAPEB oct. 2026).
"""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer,
                                Table, TableStyle, PageBreak, KeepTogether)

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))

NAVY = colors.HexColor("#0B2545")
NAVY2 = colors.HexColor("#13315C")
ORANGE = colors.HexColor("#F59E0B")
LIGHT = colors.HexColor("#F6F8FA")
GREY = colors.HexColor("#5B6573")
LINE = colors.HexColor("#DDE3EA")
PROFILE = {"Bleu": "#2563EB", "Jaune": "#EAB308", "Violet": "#7C3AED", "Rose": "#EC4899"}

OUT = Path(__file__).resolve().parent.parent / "public" / "guide-aides-renovation-2026.pdf"
W, H = A4
M = 18 * mm

def s(**k):
    base = dict(fontName="Sans", fontSize=10, leading=14.5, textColor=colors.HexColor("#1F2937"))
    base.update(k)
    return ParagraphStyle("x", **base)
body = s()
small = s(fontSize=8.5, leading=12, textColor=GREY)
h1 = s(fontName="Sans-Bold", fontSize=19, leading=24, textColor=NAVY, spaceAfter=4)
h2 = s(fontName="Sans-Bold", fontSize=12.5, leading=17, textColor=NAVY, spaceBefore=10, spaceAfter=4)
kicker = s(fontName="Sans-Bold", fontSize=8.5, textColor=ORANGE, spaceAfter=2)
bullet = s(leftIndent=12, bulletIndent=2, spaceAfter=2)
cell = s(fontSize=9, leading=12)
cellb = s(fontName="Sans-Bold", fontSize=9, leading=12, textColor=colors.white)


def P(t, st=body):
    return Paragraph(t, st)


def bullets(items):
    return [Paragraph(i, bullet, bulletText="•") for i in items]


def table(rows, widths, header=True, zebra=True):
    data = [[P(c, cellb if (header and r == 0) else cell) if isinstance(c, str) else c for c in row]
            for r, row in enumerate(rows)]
    t = Table(data, colWidths=widths, hAlign="LEFT")
    st = [("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("GRID", (0, 0), (-1, -1), 0.5, LINE),
          ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]
    if header:
        st.append(("BACKGROUND", (0, 0), (-1, 0), NAVY))
    if zebra:
        for r in range(1 if header else 0, len(rows)):
            if r % 2 == 0:
                st.append(("BACKGROUND", (0, r), (-1, r), LIGHT))
    t.setStyle(TableStyle(st))
    return t


def callout(text, color=ORANGE):
    t = Table([[P(text, s(fontSize=9.5, leading=13.5))]], colWidths=[W - 2 * M])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF7E6")),
                           ("LINEBEFORE", (0, 0), (0, -1), 3, color),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    return t


def cover(c, doc):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY2); c.circle(W - 30 * mm, H - 40 * mm, 70 * mm, stroke=0, fill=1)
    c.setFillColor(ORANGE); c.rect(M, H - 62 * mm, 28 * mm, 2.2 * mm, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Sans-Bold", 13); c.drawString(M, H - 30 * mm, "SupremEnergies")
    c.setFont("Sans-Bold", 34); c.drawString(M, H - 85 * mm, "Guide des aides")
    c.drawString(M, H - 100 * mm, "rénovation 2026")
    c.setFont("Sans", 13); c.setFillColor(colors.HexColor("#C9D6E8"))
    for i, line in enumerate(["MaPrimeRénov', primes CEE, éco-PTZ, TVA à 5,5 % :",
                              "ce qui est vraiment aidé depuis le 1er septembre 2026,",
                              "combien, et dans quel ordre faire les démarches."]):
        c.drawString(M, H - 118 * mm - i * 7 * mm, line)
    c.setFillColor(ORANGE); c.roundRect(M, 62 * mm, 92 * mm, 12 * mm, 3 * mm, stroke=0, fill=1)
    c.setFillColor(NAVY); c.setFont("Sans-Bold", 11); c.drawString(M + 6 * mm, 66.2 * mm, "Règles à jour au 4 novembre 2026")
    c.setFillColor(colors.white); c.setFont("Sans", 10)
    c.drawString(M, 40 * mm, "01 86 04 68 89  ·  supremenergies.com")
    c.setFillColor(colors.HexColor("#9FB2CC")); c.setFont("Sans", 8)
    c.drawString(M, 22 * mm, "Document gratuit et indicatif. Les montants dépendent de vos revenus et de votre logement.")
    c.restoreState()


def page(c, doc):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, H - 11 * mm, W, 11 * mm, stroke=0, fill=1)
    c.setFillColor(colors.white); c.setFont("Sans-Bold", 9); c.drawString(M, H - 7 * mm, "SupremEnergies")
    c.setFont("Sans", 8.5); c.drawRightString(W - M, H - 7 * mm, "Guide des aides rénovation 2026")
    c.setStrokeColor(LINE); c.line(M, 15 * mm, W - M, 15 * mm)
    c.setFillColor(GREY); c.setFont("Sans", 7.5)
    c.drawString(M, 10 * mm, "France Rénov' : le service public pour vous informer gratuitement — france-renov.gouv.fr · 0 808 800 700")
    c.drawRightString(W - M, 10 * mm, str(doc.page))
    c.restoreState()


doc = BaseDocTemplate(str(OUT), pagesize=A4, title="Guide des aides rénovation 2026", author="SupremEnergies",
                      subject="MaPrimeRénov', CEE, éco-PTZ, TVA 5,5 % — règles à jour")
frame = Frame(M, 20 * mm, W - 2 * M, H - 38 * mm, id="f")
doc.addPageTemplates([PageTemplate("cover", frames=[frame], onPage=cover),
                      PageTemplate("page", frames=[frame], onPage=page)])

from reportlab.platypus import NextPageTemplate
st = [NextPageTemplate("page"), PageBreak()]

# Page 2 — l'essentiel
st += [P("L'ESSENTIEL EN 1 PAGE", kicker), P("Ce qui a changé en 2026", h1),
       P("Le 1er septembre 2026, MaPrimeRénov' a été recentrée sur le chauffage décarboné. "
         "Beaucoup de guides en ligne sont donc dépassés : voici les règles qui s'appliquent aujourd'hui.")]
st += bullets([
    "<b>MaPrimeRénov' par geste</b> ne finance plus que : pompe à chaleur air/eau, pompe à chaleur géothermique "
    "ou solarothermique, dépose de cuve à fioul, raccordement à un réseau de chaleur et audit énergétique.",
    "<b>Ne sont plus aidés en geste seul</b> : isolation (combles, murs, planchers), fenêtres, VMC, poêles et "
    "chaudières bois, chauffe-eau thermodynamique ou solaire. Ils restent possibles via les primes CEE ou "
    "dans une rénovation d'ampleur.",
    "<b>Pompe à chaleur air/air et PAC hybride</b> : aucun forfait MaPrimeRénov'. La PAC air/air reste "
    "éligible à certaines primes CEE et, sous conditions, à la TVA à 5,5 %.",
    "<b>Rénovation d'ampleur</b> : réservée aux logements classés E, F ou G ; en maison, plus aucun "
    "chauffage au gaz ou au fioul ne doit rester après les travaux.",
    "<b>Profil Rose</b> (revenus supérieurs) : pas de forfait par geste, seulement la rénovation d'ampleur et les CEE.",
    "<b>Plafond</b> : 20 000 € de forfaits MaPrimeRénov' par geste par logement sur 5 ans.",
])
st += [Spacer(1, 8), callout("<b>À surveiller :</b> le budget 2027 en discussion prévoit que les pompes à chaleur "
                             "soient financées uniquement par les primes CEE. Rien n'est encore officiel : si votre projet "
                             "est prêt, déposer votre dossier en 2026 permet de sécuriser les règles actuelles.")]

# Profils
st += [P("1. Quel est votre profil ?", h2),
       P("Votre couleur dépend du revenu fiscal de référence (RFR) de votre foyer, indiqué sur votre avis d'imposition, "
         "et du nombre de personnes qui y vivent. Plafonds 2026 :", body), Spacer(1, 4)]
rfr = [["Personnes", "Bleu<br/>(très modestes)", "Jaune<br/>(modestes)", "Violet<br/>(intermédiaires)", "Rose"],
       ["1", "≤ 17 363 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 23 768 €</font>", "≤ 22 259 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 28 933 €</font>", "≤ 31 185 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 40 404 €</font>", "au-delà"],
       ["2", "≤ 25 393 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 34 884 €</font>", "≤ 32 553 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 42 463 €</font>", "≤ 45 842 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 59 394 €</font>", "au-delà"],
       ["3", "≤ 30 547 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 41 893 €</font>", "≤ 39 192 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 51 000 €</font>", "≤ 55 129 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 71 060 €</font>", "au-delà"],
       ["4", "≤ 35 676 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 48 914 €</font>", "≤ 45 735 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 59 549 €</font>", "≤ 64 550 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 83 637 €</font>", "au-delà"],
       ["5", "≤ 40 821 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 55 961 €</font>", "≤ 52 321 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 68 123 €</font>", "≤ 73 923 €<br/><font size=7.5 color='#5B6573'>IDF ≤ 95 758 €</font>", "au-delà"]]
t = table(rfr, [22 * mm, 38 * mm, 38 * mm, 40 * mm, W - 2 * M - 138 * mm])
t.setStyle(TableStyle([("BACKGROUND", (i + 1, 0), (i + 1, 0), colors.HexColor(v)) for i, v in enumerate(PROFILE.values())]))
st += [t, P("Par personne en plus : Bleu +5 145 € (IDF +7 038 €), Jaune +6 587 € (IDF +8 568 €), Violet +9 165 € (IDF +12 122 €).", small)]

# PAC
st += [PageBreak(), P("LE GESTE LE PLUS AIDÉ", kicker), P("2. Pompe à chaleur : combien d'aides ?", h1),
       P("Pour une pompe à chaleur installée dans une résidence principale de plus de 15 ans, en remplacement d'une "
         "chaudière fioul, gaz ou électrique. Montants maximum par logement :"), Spacer(1, 6)]
st += [table([["Équipement", "Bleu", "Jaune", "Violet", "Rose"],
              ["PAC air/eau — MaPrimeRénov'<br/><font size=7.5 color='#5B6573'>dépense retenue max. 12 000 €</font>", "5 000 €", "4 000 €", "3 000 €", "—"],
              ["PAC géothermique — MaPrimeRénov'<br/><font size=7.5 color='#5B6573'>dépense retenue max. 18 000 €</font>", "11 000 €", "9 000 €", "6 000 €", "—"],
              ["Prime CEE « Coup de pouce » PAC<br/><font size=7.5 color='#5B6573'>indicatif, varie selon le fournisseur</font>", "≈ 5 000 €", "≈ 4 000 €", "≈ 2 500 €", "≈ 2 500 €"],
              ["Dépose de cuve à fioul — MaPrimeRénov'", "1 200 €", "800 €", "400 €", "—"],
              ["PAC air/air", "CEE seulement", "CEE seulement", "CEE seulement", "CEE seulement"]],
             [70 * mm] + [(W - 2 * M - 70 * mm) / 4] * 4)]
st += [Spacer(1, 10), P("Exemple : remplacement d'une chaudière fioul par une PAC air/eau", h2)]
st += [table([["Profil Jaune, maison, devis PAC air/eau 13 000 € TTC", ""],
              ["MaPrimeRénov' (forfait PAC air/eau)", "– 4 000 €"],
              ["Prime CEE Coup de pouce (indicatif)", "– 4 000 €"],
              ["MaPrimeRénov' dépose de cuve fioul", "– 800 €"],
              ["<b>Reste à charge estimé</b> (finançable par éco-PTZ)", "<b>≈ 4 200 €</b>"]],
             [W - 2 * M - 40 * mm, 40 * mm])]
st += [P("Exemple indicatif : les aides cumulées ne peuvent pas dépasser un pourcentage du coût des travaux "
         "(écrêtement) qui dépend de votre profil. Seul l'accord écrit de l'Anah fait foi.", small)]

st += [P("3. La rénovation d'ampleur (parcours accompagné)", h2),
       P("Pour plusieurs travaux à la fois avec un gain d'au moins deux classes énergétiques. Un Accompagnateur Rénov' "
         "est obligatoire (en partie pris en charge). Conditions depuis le 1er septembre 2026 :")]
st += bullets(["Logement classé <b>E, F ou G</b> avant travaux ;",
               "au moins deux gestes d'isolation ;",
               "en maison, <b>chauffage et eau chaude entièrement décarbonés</b> après travaux : ni gaz, ni fioul, ni PAC hybride ;",
               "taux de prise en charge selon le profil : jusqu'à 80 % (Bleu), 60 % (Jaune), 45 % (Violet), 10 % (Rose)."])

# Autres aides + démarches
st += [PageBreak(), P("LES AUTRES COUPS DE POUCE", kicker), P("4. Aides cumulables", h1)]
st += [table([["Aide", "Pour qui / pour quoi", "Montant"],
              ["Primes CEE", "Tous les ménages, y compris Rose. Isolation, PAC, chauffe-eau, etc.", "Variable selon le fournisseur"],
              ["Éco-PTZ", "Prêt sans intérêts, sans condition de revenus, pour financer le reste à charge.", "Jusqu'à 50 000 € (rénovation d'ampleur), 15 000 € pour une action seule"],
              ["TVA à 5,5 %", "Travaux d'amélioration énergétique dans un logement de plus de 2 ans.", "Au lieu de 20 %, appliquée sur la facture"],
              ["Aides locales", "Région, département, commune : selon votre adresse.", "Se renseigner auprès de France Rénov'"]],
             [32 * mm, 85 * mm, W - 2 * M - 117 * mm])]
st += [P("5. Dans quel ordre faire les démarches ?", h2)]
steps = [("1", "Faites établir un devis par une entreprise qualifiée pour les travaux concernés."),
         ("2", "Inscrivez la prime CEE <b>avant de signer le devis</b> : sinon elle est perdue."),
         ("3", "Déposez votre demande MaPrimeRénov' sur maprimerenov.gouv.fr et <b>attendez l'accord</b> avant le début des travaux."),
         ("4", "Signez le devis, faites réaliser les travaux, puis envoyez la facture pour le versement des aides.")]
for n, txt in steps:
    tt = Table([[P(f"<b>{n}</b>", s(fontName="Sans-Bold", fontSize=13, textColor=colors.white, alignment=1)), P(txt)]],
               colWidths=[10 * mm, W - 2 * M - 10 * mm])
    tt.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, 0), ORANGE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                            ("LEFTPADDING", (1, 0), (1, 0), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 6)]))
    st += [tt, Spacer(1, 4)]
st += [P("6. Les pièges à éviter", h2)]
st += bullets(["Signer un devis avant d'avoir inscrit la prime CEE.",
               "Commencer les travaux avant l'accord MaPrimeRénov'.",
               "Répondre à un démarchage téléphonique « gratuit » : l'administration ne démarche jamais.",
               "Se fier à un guide daté d'avant septembre 2026 : les règles ont changé."])
st += [Spacer(1, 10), KeepTogether([callout(
    "<b>Besoin d'un chiffrage précis ?</b> SupremEnergies installe des pompes à chaleur partout en France avec ses propres "
    "équipes et calcule vos aides avec vous. Étude et devis gratuits : <b>01 86 04 68 89</b> ou "
    "<b>supremenergies.com/devis-gratuit</b>. Réponse sous 24 h.", NAVY)])]
st += [Spacer(1, 8), P("Sources : service-public.gouv.fr (fiche MaPrimeRénov', vérifiée le 1er septembre 2026), Anah, "
                       "panorama des aides CAPEB octobre 2026. Montants indicatifs, sous réserve d'évolution réglementaire "
                       "et d'éligibilité ; seul l'accord des organismes financeurs fait foi.", small)]

doc.build(st)
print("PDF généré :", OUT)
