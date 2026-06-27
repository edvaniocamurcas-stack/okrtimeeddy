function calcularMissionScore(item) {
  const acv = numero(item.acv_base || item.acv || 0);
  const risco = String(item.risco || "").toLowerCase();
  const etapa = String(item.etapa || "").toLowerCase();

  let score = 0;
  const motivos = [];
  const acoes = [];

  if (acv >= 1000000) {
    score += 40;
    motivos.push("alto impacto financeiro");
  } else if (acv >= 800000) {
    score += 30;
    motivos.push("impacto financeiro relevante");
  } else if (acv >= 400000) {
    score += 20;
    motivos.push("impacto financeiro moderado");
  } else {
    score += 10;
  }

  if (risco.includes("alto")) {
    score += 35;
    motivos.push("risco alto declarado");
    acoes.push("realizar intervenção direta com a escola");
  } else if (risco.includes("médio") || risco.includes("medio")) {
    score += 20;
    motivos.push("risco médio");
    acoes.push("acompanhar evolução semanalmente");
  }

  if (etapa.includes("assinatura")) {
    score += 35;
    motivos.push("próxima de assinatura");
    acoes.push("remover impedimentos para fechamento");
  } else if (etapa.includes("negociação") || etapa.includes("negociacao")) {
    score += 25;
    motivos.push("em negociação");
    acoes.push("destravar negociação com decisor");
  } else if (etapa.includes("proposta")) {
    score += 15;
    motivos.push("em elaboração ou análise de proposta");
    acoes.push("validar proposta e próximo passo");
  } else if (etapa.includes("diagnóstico") || etapa.includes("diagnostico")) {
    score += 10;
    motivos.push("em diagnóstico");
    acoes.push("aprofundar diagnóstico e plano de ação");
  }

  if (risco.includes("alto") && acv >= 1000000) {
    score += 25;
    motivos.push("alto risco combinado com alto ACV");
    acoes.push("acionar comitê de renovação");
  }

  if (etapa.includes("assinatura") && acv >= 800000) {
    score += 20;
    motivos.push("conversão próxima com impacto relevante");
    acoes.push("priorizar fechamento nesta semana");
  }

  let classificacao = "📋 Monitorar";
  if (score >= 100) classificacao = "🔥 Fazer Hoje";
  else if (score >= 75) classificacao = "⚡ Fazer esta Semana";
  else if (score >= 50) classificacao = "🤝 Delegar";

  return {
    score,
    classificacao,
    motivos,
    acoes,
    acaoPrincipal: acoes[0] || "monitorar evolução",
    impactoFinanceiro: acv
  };
}