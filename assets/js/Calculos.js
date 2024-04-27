import {excluirLinha, editarDados, adicionarCelula, adicionaDadosAluno,
    adicionarLinha} from "./Funcoes_de_dados.js";

export function calcularMediaTotalFinal() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalFinal = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(calcularMediaFinal(aluno)); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalFinal += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalFinal / numAlunos;
        console.log(`A média Final da turma é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalIntegrada2() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalIntegrada2 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.prova_integrada2); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalIntegrada2 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalIntegrada2 / numAlunos;
        console.log(`A média total das notas da Prova Integrada 2 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalAEP2() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalAEP2 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.aep2); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalAEP2 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalAEP2 / numAlunos;
        console.log(`A média total das notas da AEP 2 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalProva2() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalProva2 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.prova2); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalProva2 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalProva2 / numAlunos;
        console.log(`A média total das notas da Prova 2 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMedia2Total() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalProva2 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(calcularMedia2(aluno)); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalProva2 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalProva2 / numAlunos;
        console.log(`A média total do 2º Bimestre é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalIntegrada1() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalIntegrada1 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.prova_integrada1); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalIntegrada1 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalIntegrada1 / numAlunos;
        console.log(`A média total das notas da Prova Integrada 1 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalAEP1() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalAEP1 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.aep1); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalAEP1 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalAEP1 / numAlunos;
        console.log(`A média total das notas da AEP 1 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMediaTotalProva1() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalProva1 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(aluno.prova1); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
            totalProva1 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalProva1 / numAlunos;
        console.log(`A média total das notas da Prova 1 é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMedia1Total() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalProva1 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(calcularMedia1(aluno));
        if (!isNaN(nota) && nota >= 0 && nota <= 10) {
            totalProva1 += nota;
            numAlunos++;
        }
    });

    if (numAlunos > 0) {
        const mediaTotal = totalProva1 / numAlunos;
        console.log(`A média total do 1º Bimestre é: ${mediaTotal.toFixed(2)}`);
    } else {
        console.log("Não há notas válidas de alunos registradas.");
    }
}

export function calcularMedia1(aluno) {
    let prova = aluno.prova1 * 0.8;
    let aep = aluno.aep1 * 0.1;
    let integrada = aluno.prova_integrada1 * 0.1;

    let media = prova + aep + integrada;

    return media;
}

export function calcularMedia2(aluno) {
    let prova = aluno.prova2 * 0.8;
    let aep = aluno.aep2 * 0.1;
    let integrada = aluno.prova_integrada2 * 0.1;

    let media = prova + aep + integrada;

    return media;
}

export function calcularMediaFinal(aluno) {
    let final = (calcularMedia1(aluno) + calcularMedia2(aluno)) / 2;
    return final;
}