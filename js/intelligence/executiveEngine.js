function gerarExecutiveEngine(dados) {
  const risk = gerarRiskEngine(dados);
  const opportunity = gerarOpportunityEngine(dados);
  const forecast = gerarForecastEngine(dados);
  const team = gerarTeamEngine(dados);

  return {
    risk,
    opportunity,
    forecast,
    team
  };
}