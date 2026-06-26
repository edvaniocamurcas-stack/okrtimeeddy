function carregarDashboard(resumo) {

    preencher("acv-base", moeda(resumo.ACV_Base));
    preencher("acv-renovado", moeda(resumo.ACV_Renovado));
    preencher("percentual-renovacao", percentual(resumo.Percentual_Renovacao));
    preencher("escolas", resumo.Escolas);
    
const radar = gerarRadarExecutivo(dados);

const radarDiv = document.getElementById("radar-executivo");

if(radarDiv){

    radarDiv.innerHTML = radar.map(item=>`

        <div class="alerta">

            <h3>${item.nivel} ${item.titulo}</h3>

            <p>${item.descricao}</p>

        </div>

    `).join("");

}

}
