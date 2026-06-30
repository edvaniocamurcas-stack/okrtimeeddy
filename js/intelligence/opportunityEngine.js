function gerarOpportunityEngine(dados) {
  const escolas = dados.top_prioritarias || [];
  const painel = dados.painel_executivo || [];

  const emAssinatura = escolas.filter((e) =>
    String(e.etapa || "").toLowerCase().includes("assinatura")
  );

  const maiorOportunidadeCSP = [...painel].sort(
    (a, b) =>
      numero(b.oportunidades_quentes_acv) -
      numero(a.oportunidades_quentes_acv)
  )[0];

  return {
    totalAssinatura: emAssinatura.length,
    acvAssinatura: emAssinatura.reduce(
      (total, e) => total + numero(e.acv_base || e.acv || 0),
      0
    ),
    maiorOportunidadeCSP: maiorOportunidadeCSP
      ? {
          csp: nomeCSP(maiorOportunidadeCSP.csp),
          acv: numero(maiorOportunidadeCSP.oportunidades_quentes_acv),
        }
      : null,
    escolasProntas: emAssinatura.slice(0, 5),
  };
}