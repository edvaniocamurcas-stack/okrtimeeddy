function calcularPrioridadeEscola(escola) {
  let score = 0;
  const motivos = [];

  if (escola.vigencia === "2026") {
    score += 40;
    motivos.push("contrato em ciclo de renovação");
  }

  if (escola.distrato === "verbalizado" && escola.vigencia === "2026") {
    score += 80;
    motivos.push("distrato verbalizado com vigência finalizando");
  }

  if (escola.risco === "alto") {
    score += 50;
    motivos.push("risco alto");
  }

  if (escola.acv >= 3000000) {
    score += 60;
    motivos.push("alto ACV");
  }

  if (escola.referencia_regional) {
    score += 40;
    motivos.push("escola referência regional");
  }

  if (escola.engajamento === "baixo") {
    score += 35;
    motivos.push("baixo engajamento");
  }

  if (escola.dias_sem_contato >= 15) {
    score += 25;
    motivos.push("muitos dias sem contato");
  }

  return { score, motivos };
}

function calcularPrioridadeConsultor(consultor) {
  let score = 0;
  const motivos = [];

  if (consultor.risco_meta === "alto") {
    score += 80;
    motivos.push("risco de comprometer a meta");
  }

  if (consultor.autonomia === "baixa") {
    score += 50;
    motivos.push("baixa autonomia");
  }

  if (consultor.resultado === "abaixo") {
    score += 40;
    motivos.push("resultado abaixo do esperado");
  }

  return { score, motivos };
}