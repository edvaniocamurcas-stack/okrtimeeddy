function gerarForecastEngine(dados) {
  const resumo = dados.resumo || {};

  const forecast = numero(resumo.Forecast_ACV || resumo.ACV_Renovado || 0);
  const fundoFunil = numero(resumo.Fundo_Funil_ACV || 0);
  const gap = numero(resumo.Gap_Renovacao || 0);

  const pessimista = forecast * 0.8;
  const realista = forecast;
  const otimista = forecast + fundoFunil * 0.35;

  let status = "🟡 Atenção";
  if (otimista < gap) status = "🔴 Risco";
  if (realista >= gap) status = "🟢 Saudável";

  return {
    pessimista,
    realista,
    otimista,
    gap,
    status
  };
}