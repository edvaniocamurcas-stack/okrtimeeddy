function calcularMissionScore(item){

  const acv = numero(item.acv_base || item.acv || 0);
  const risco = item.risco || "";
  const etapa = item.etapa || "";

  let score = 0;

  if(acv >= 3000000) score += 40;
  else if(acv >= 2000000) score += 30;
  else if(acv >= 1000000) score += 20;
  else score += 10;

  if(risco === "Alto") score += 30;
  else if(risco === "Médio") score += 15;

  if(etapa.includes("Assinatura")) score += 35;
  else if(etapa.includes("Negociação")) score += 25;
  else if(etapa.includes("Proposta")) score += 15;
  else if(etapa.includes("Diagnóstico")) score += 10;

  let classificacao = "📅 Monitorar";
  if(score >= 85) classificacao = "🔥 Fazer Hoje";
  else if(score >= 65) classificacao = "⚡ Fazer esta Semana";
  else if(score >= 45) classificacao = "🤝 Delegar";

  return {
    score,
    classificacao
  };
}
