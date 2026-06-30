document.addEventListener("DOMContentLoaded", iniciarSistema);

async function iniciarSistema() {
  try {
    console.log("🚀 App.js iniciado.");

    const url = new URL(
  "database/current/dados.json?v=" + Date.now(),
  window.location.href
);
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados.json");
    }

    const dados = await resposta.json();
    console.log("✅ Dados carregados pelo app.js:", dados);

    if (typeof gerarExecutiveEngine === "function") {
      const executive = gerarExecutiveEngine(dados);
      console.log("🧠 EXECUTIVE ENGINE:", executive);
    }

    if (typeof carregarDashboard === "function") {
      carregarDashboard(dados.resumo || {});
    }

    if (typeof carregarMorningBriefing === "function") {
      carregarMorningBriefing(dados);
    }

    if (typeof carregarDecisionCenter === "function" && typeof gerarDecisionEngine === "function") {
      const decisoes = gerarDecisionEngine(dados);
      carregarDecisionCenter(decisoes);
    }

    if (typeof carregarCockpit === "function") {
      carregarCockpit(dados);
    }

    if (typeof carregarHealth === "function") {
      carregarHealth(dados);
    }

    if (typeof carregarRadar === "function") {
      carregarRadar(dados);
    }

    if (typeof carregarRanking === "function") {
      carregarRanking(dados);
    }

    if (typeof carregarMissionControl === "function") {
      carregarMissionControl(dados);
    }

    if (typeof carregarAdvisor === "function") {
      carregarAdvisor(dados);
    }

    console.log("✅ CSOS carregado com sucesso.");
  } catch (erro) {
    console.error("❌ Erro no app.js:", erro);
  }
}