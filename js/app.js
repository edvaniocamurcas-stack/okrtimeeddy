document.addEventListener("DOMContentLoaded", iniciarSistema);

async function iniciarSistema() {
  try {
    console.log("🚀 App.js iniciado.");

    const url = new URL("dados.json?v=" + Date.now(), window.location.href);
    const respostaDados = await fetch(url);

    if (!respostaDados.ok) {
      throw new Error("Erro ao buscar dados.json");
    }

    const dados = await respostaDados.json();
    console.log("✅ Dados carregados pelo app.js:", dados);

    const respostaTeste = await fetch("src/sample-data.json");
    const dadosTeste = await respostaTeste.json();

    const missao = gerarMissaoDaSemana(dadosTeste);
    console.log("🎯 MISSÃO DA SEMANA:", missao);
  } catch (erro) {
    console.error("❌ Erro no app.js:", erro);
  }
}