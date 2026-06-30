function gerarTeamEngine(dados) {
  const painel = dados.painel_executivo || [];

  const rankingRisco = [...painel]
    .map((csp) => ({
      csp: nomeCSP(csp.csp),
      acvBase: numero(csp.acv_base),
      acvRenovado: numero(csp.acv_renovado),
      altoRiscoACV: numero(csp.alto_risco_acv),
      oportunidadesACV: numero(csp.oportunidades_quentes_acv),
    }))
    .sort((a, b) => b.altoRiscoACV - a.altoRiscoACV);

  return {
    maiorAtencao: rankingRisco[0] || null,
    rankingRisco: rankingRisco.slice(0, 5),
  };
}