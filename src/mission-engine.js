function gerarMissaoDaSemana(dados) {
  const escolasPriorizadas = dados.escolas
    .map((escola) => ({
      ...escola,
      prioridade: calcularPrioridadeEscola(escola)
    }))
    .sort((a, b) => b.prioridade.score - a.prioridade.score);

  const consultoresPriorizados = dados.consultores
    .map((consultor) => ({
      ...consultor,
      prioridade: calcularPrioridadeConsultor(consultor)
    }))
    .sort((a, b) => b.prioridade.score - a.prioridade.score);

  return {
    foco: dados.contexto.foco_semana,
    okr: dados.contexto.okr_prioritario,
    acoes: [
      ...escolasPriorizadas.slice(0, 3).map((escola) => ({
        tipo: "escola",
        titulo: `Atuar em ${escola.nome}`,
        responsavel: escola.csp,
        score: escola.prioridade.score,
        motivos: escola.prioridade.motivos
      })),
      ...consultoresPriorizados.slice(0, 2).map((consultor) => ({
        tipo: "consultor",
        titulo: `Fazer coaching com ${consultor.nome}`,
        responsavel: "Edvânio",
        score: consultor.prioridade.score,
        motivos: consultor.prioridade.motivos
      }))
    ].sort((a, b) => b.score - a.score)
  };
}