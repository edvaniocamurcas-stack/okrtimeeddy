function calcularHealthScore(dados){

  const resumo = dados.resumo || {};

  const renovacao = numero(resumo.Percentual_Renovacao);
  const gap = numero(resumo.Gap_Real);
  const acvBase = numero(resumo.ACV_Base);
  const fundoFunil = numero(resumo.Fundo_Funil_ACV);
  const altoRisco = numero(resumo.Alto_Risco_ACV || 0);
  const forecast = numero(resumo.Forecast_ACV);

  const renovacaoScore = Math.min(renovacao * 5, 100);

  const gapScore = acvBase > 0
    ? Math.max(0, 100 - ((gap / acvBase) * 100))
    : 0;

  const riscoScore = acvBase > 0
    ? Math.max(0, 100 - ((altoRisco / acvBase) * 100))
    : 0;

  const fundoScore = acvBase > 0
    ? Math.min((fundoFunil / acvBase) * 100, 100)
    : 0;

  const forecastScore = acvBase > 0
    ? Math.min((forecast / acvBase) * 100, 100)
    : 0;

  const score = Math.round(
    renovacaoScore * 0.30 +
    gapScore * 0.20 +
    riscoScore * 0.20 +
    fundoScore * 0.15 +
    forecastScore * 0.15
  );

  let status = "🔴 Crítico";

  if(score >= 85) status = "🟢 Excelente";
  else if(score >= 70) status = "🟢 Saudável";
  else if(score >= 55) status = "🟡 Atenção";
  else if(score >= 40) status = "🟠 Pressão";

  return {
    score,
    status,
    renovacaoScore,
    gapScore,
    riscoScore,
    fundoScore,
    forecastScore
  };
}
