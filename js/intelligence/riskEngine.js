function gerarRiskEngine(dados) {
  const escolas = dados.top_prioritarias || [];
  const painel = dados.painel_executivo || [];

  const altoRisco = escolas.filter((e) =>
    String(e.risco || "").toLowerCase().includes("alto")
  );

  const maiorRiscoCSP = [...painel].sort(
    (a, b) => numero(b.alto_risco_acv) - numero(a.alto_risco_acv)
  )[0];

  return {
    totalAltoRisco: altoRisco.length,
    acvAltoRisco: altoRisco.reduce(
      (total, e) => total + numero(e.acv_base || e.acv || 0),
      0
    ),
    maiorRiscoCSP: maiorRiscoCSP
      ? {
          csp: nomeCSP(maiorRiscoCSP.csp),
          acv: numero(maiorRiscoCSP.alto_risco_acv),
        }
      : null,
    escolasCriticas: altoRisco.slice(0, 5),
  };
}