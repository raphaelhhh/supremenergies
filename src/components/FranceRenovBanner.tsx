// Mention obligatoire — art. L.122-26 Code de la consommation, arrêté du 7 juillet 2026 (en vigueur au 1er octobre 2026)
const FranceRenovBanner = () => (
  <aside
    aria-label="Information service public France Rénov'"
    className="border-t-4 border-primary bg-muted"
  >
    <div className="container-custom py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
      <div className="shrink-0 font-bold text-lg text-foreground">
        France Rénov'
        <span className="block text-xs font-normal text-muted-foreground">Service public de la rénovation de l'habitat</span>
      </div>
      <p className="text-base font-semibold text-foreground">
        Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet :{" "}
        <a
          href="https://france-renov.gouv.fr/servicepublic"
          target="_blank"
          rel="noopener"
          className="underline text-primary"
        >
          www.france-renov.gouv.fr
        </a>
      </p>
    </div>
  </aside>
);

export default FranceRenovBanner;
