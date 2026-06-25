function nomeCSP(email) {
  const nomes = {
    "carlacosta@sas.com.br": "Carla Costa",
    "flaviodasilva@sas.com.br": "Flávio Silva",
    "gabriellabarreto@sas.com.br": "Gabriella Barreto",
    "josedemetrio@sas.com.br": "José Demétrio",
    "julianabarbosa@sas.com.br": "Juliana Barbosa",
    "marceloanjos@sas.com.br": "Marcelo Anjos",
    "sabrinagarcia@sas.com.br": "Sabrina Garcia",
    "yannacavalcante@sas.com.br": "Yanna Cavalcante"
  };
  return nomes[email] || email;
}

function preencher(id, valor) {
  const elemento = document.getElementById(id);
  if (elemento) elemento.innerText = valor;
}

function numero(valor) {
  if (valor === null || valor === undefined || valor === "") return 0;

  let texto = String(valor)
    .trim()
    .replace("R$", "")
    .replace("%", "")
    .replace(/\s/g, "");

  const temVirgula = texto.includes(",");
  const temPonto = texto.includes(".");

  if (temVirgula && temPonto) {
    texto = texto.replace(/\./g, "").replace(",", ".");
  } else if (temVirgula) {
    texto = texto.replace(",", ".");
  } else if (temPonto) {
    const partes = texto.split(".");
    const ultimoGrupo = partes[partes.length - 1];

    if (ultimoGrupo.length === 3) {
      texto = texto.replace(/\./g, "");
    }
  }

  return Number(texto) || 0;
}
  
function moeda(valor) {
  const n = numero(valor);
  if (n >= 1000000) return "R$ " + (n / 1000000).toFixed(1).replace(".", ",") + "M";
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

function percentual(valor) {
  const n = numero(valor);
  return n.toFixed(2).replace(".", ",") + "%";
}

function gerarResumoExecutivo(item, score){

  if(score >= 80)
    return "Operação saudável.";

  if(numero(item.alto_risco_acv) > 3000000)
    return "Maior prioridade da semana.";

  if(Number(String(item.cobertura).replace(",", ".")) < 50)
    return "Cobertura abaixo do esperado.";

  if(Number(String(item.percentual_renovacao).replace(",", ".")) === 0)
    return "Sem renovações registradas.";

  return "Operação estável.";
}

function avaliarCSP(item){

  const acvBase = numero(item.acv_base);
  const acvAltoRisco = numero(item.alto_risco_acv);
  const fundoFunil = numero(item.oportunidades_quentes_acv);

  const cobertura = Number(String(item.cobertura).replace(",", "."));
  const renovacao = Number(String(item.percentual_renovacao).replace(",", "."));

  const riscoPercentual = acvBase > 0 ? (acvAltoRisco / acvBase) * 100 : 0;
  const riscoScore = Math.max(0, 100 - riscoPercentual);

  const oportunidadeScore = acvBase > 0
    ? Math.min((fundoFunil / acvBase) * 100, 100)
    : 0;

  const volumeScore = Math.min((Number(item.alto_risco_qtd || 0) / 5) * 100, 100);

  const score = Math.round(
    riscoScore * 0.35 +
    cobertura * 0.25 +
    oportunidadeScore * 0.15 +
    renovacao * 0.15 +
    (100 - volumeScore) * 0.10
  );

  let saude = "🔴 Crítico";
  if(score >= 75) saude = "🟢 Saudável";
  else if(score >= 55) saude = "🟡 Atenção";

  let tendencia = "➡ Estável";
  if(renovacao > 10 || cobertura >= 75) tendencia = "⬆ Evoluindo";
  else if(cobertura < 50 || riscoPercentual > 25) tendencia = "⬇ Pressão";

  let proximaAcao = "Manter ritmo";
  if(acvAltoRisco > 3000000) proximaAcao = "Comitê de renovação";
  else if(cobertura < 60) proximaAcao = "Aumentar cobertura";
  else if(fundoFunil > 5000000) proximaAcao = "Converter fundo de funil";
  else if(renovacao === 0) proximaAcao = "Gerar primeira renovação";

  let prioridade = "🟢 Baixa";
  if(riscoPercentual >= 40 || acvAltoRisco >= 3000000) prioridade = "🔴 Crítica";
  else if(cobertura < 50) prioridade = "🟠 Alta";
  else if(renovacao < 10) prioridade = "🟡 Média";

  const resumoExecutivo =
    gerarResumoExecutivo(item, score);

  return {
    score,
    saude,
    tendencia,
    proximaAcao,
    prioridade,
    riscoPercentual,
    resumoExecutivo
  };
}
function moedaCompacta(valor){

valor = numero(valor);
if(valor >= 1000000){
return "R$ " + (valor/1000000).toFixed(1).replace(".",",") + "M";
  }

if(valor >= 1000){
return "R$ " + (valor/1000).toFixed(1).replace(".",",") + "K";
  }

return moeda(valor);
}

function gerarVisaoExecutiva(dados){

    const painel = dados.painel_executivo;

    const maiorRisco =
        [...painel].sort((a,b)=>
            numero(b.alto_risco_acv)-numero(a.alto_risco_acv)
        )[0];

    const maiorOportunidade =
        [...painel].sort((a,b)=>
            numero(b.oportunidades_quentes_acv)-numero(a.oportunidades_quentes_acv)
        )[0];

    const menorCobertura =
        [...painel].sort((a,b)=>
            Number(a.cobertura.replace(",","."))-
            Number(b.cobertura.replace(",","."))
        )[0];

    const destaque =
        [...painel].sort((a,b)=>
            Number(b.cobertura.replace(",","."))-
            Number(a.cobertura.replace(",","."))
        )[0];

    return {
        maiorRisco,
        maiorOportunidade,
        menorCobertura,
        destaque
    };

}
