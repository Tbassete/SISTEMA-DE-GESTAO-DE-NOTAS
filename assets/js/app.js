import {excluirLinha, editarDados, adicionarCelula, adicionaDadosAluno,
    adicionarLinha, alternarBimestre} from "./Funcoes_de_dados.js";
import {calcularMediaTotalFinal, calcularMediaTotalIntegrada2,
    calcularMediaTotalAEP2,calcularMediaTotalProva2,
    calcularMedia2Total, calcularMediaTotalIntegrada1,
    calcularMediaTotalProva1, calcularMedia1Total,
    calcularMedia1, calcularMedia2, calcularMediaFinal} from "./Calculos.js"
import { validaRA } from "./Validacao_de-ERRO.js";

document.getElementById("openPopup").addEventListener('click', ()=>{
    configurarPopup();
})

function exibirTabelaAlunos() {
    const tabela = document.getElementById('idTabela');
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    alunos.forEach(aluno => {
        let controll;
        let idLinha = 'linha' + Date.now();
        let novaLinha = document.createElement('tr');
        novaLinha.id = idLinha;
        novaLinha.innerHTML = `
            <td>${aluno.nome || '-'}</td>
            <td>${aluno.ra || '-'}</td>
            <td>${aluno.email || '-'}</td>
            <td>${aluno.prova1 || '-'}</td>
            <td>${aluno.aep1 || '-'}</td>
            <td>${aluno.prova_integrada1 || '-'}</td>
            <td>${aluno.media1 || '-'}</td>
            <td>${aluno.prova2 || '-'}</td>
            <td>${aluno.aep2 || '-'}</td>
            <td>${aluno.prova_integrada2 || '-'}</td>
            <td>${aluno.media2 || '-'}</td>
            <td>${aluno.mediaFinal || '-'}</td>
            <td>${aluno.situacao || '-'}</td>
            <td class="actions">
                <button class="add">Adicionar Notas</button>
                <button class="update" onclick="editarDados(this)">Editar</button>
                <button class="delete" onclick="excluirLinha('${aluno.ra}')">Excluir</button>
            </td>
        `;
        tabela.appendChild(novaLinha);
        controll++;
        if (controll>alunos.length){
            return;
        }
    });
}

export function configurarPopup() {
    limparCampos();

    document.getElementById("popup").classList.add("show");
    setTimeout(function () {
        document.getElementById("popup").style.display = "block";
    }, 10);

    document.getElementById("cancelar").addEventListener("click", function () {
        document.getElementById("popup").classList.remove("show");
        setTimeout(function () {
            document.getElementById("popup").style.display = "none";
        }, 300);
    });

    document.getElementById("salvar").addEventListener("click", function () {
        let ra = document.getElementById("input_ra").value;
        const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
        if(!validaRA(ra, alunos)){
        adicionaDadosAluno()
        exibirTabelaAlunos();}
        else{
            alert("Cadastro existente")
        }
    });
}

export function configurarPopupNotas() {
    limparCampos();

    document.getElementById("popupNotas").classList.add("show");
    setTimeout(function () {
        document.getElementById("popupNotas").style.display = "block";
    }, 10);

    document.getElementById("cancelar").addEventListener("click", function () {
        document.getElementById("popupNotas").classList.remove("show");
        setTimeout(function () {
            document.getElementById("popupNotas").style.display = "none";
        }, 300);
    });
}

function limparCampos() {
    document.getElementById('input_nome').value = "";
    document.getElementById('input_ra').value = "";
    document.getElementById('input_email').value = "";
}

function definirSituacao(aluno) {
    let media = calcularMediaFinal(aluno);
    if (media >= 6.0) {
        return "Aprovado";
    }
    else if (media <= 3.0) {
        return "Reprovado";
    }
    else {
        return "Recuperacao";
    }
}


