// Criação/manipulação de linha

exibirTabelaAlunos();
atualizarMediasNaTabela();

let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno() {
    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;
    // const prova1 = document.getElementById("input_prova_1").value;
    // const aep1 = document.getElementById("input_aep_1").value;
    // const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
    // const prova2 = document.getElementById("input_prova_2").value;
    // const aep2 = document.getElementById("input_aep_2").value;
    // const prova_integrada2 = document.getElementById("input_prova_integrada_2").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nome || !ra || !email) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("O e-mail inserido não está em um formato válido!");
        return;
    }
    // const aluno = new Aluno(nome, ra, email);
    const aluno = {
        nome: nome,
        ra: ra,
        email: email,
        // prova1 : prova1,
        // aep1 : aep1,
        // prova_integrada1 : prova_integrada1,
        // prova2 : prova2,
        // aep2 : aep2,
        // prova_integrada2 : prova_integrada2
    };

    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    alunos.push(aluno);
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
    alunos.push(aluno);
    adicionarLinha(aluno);
    // calcularMediaTotalProva1();
    // calcularMediaTotalAEP1();
    // calcularMediaTotalIntegrada1();
    // calcularMedia1Total();
}

function adicionarCelula(valor) {
    let celula = document.createElement('td');
    celula.textContent = valor || '-';
    novaLinha.appendChild(celula);
}

function adicionarLinha(aluno) {
    let idLinha = 'linha' + Date.now();
    let novaLinha = document.createElement('tr');
    novaLinha.id = idLinha;

    adicionarCelula(aluno.nome);
    adicionarCelula(aluno.ra);
    adicionarCelula(aluno.email);
    adicionarCelula(aluno.prova1);
    adicionarCelula(aluno.aep1);
    adicionarCelula(aluno.prova_integrada1);
    adicionarCelula(aluno.media1);
    adicionarCelula(aluno.prova2);
    adicionarCelula(aluno.aep2);
    adicionarCelula(aluno.prova_integrada2);
    adicionarCelula(aluno.media2);
    adicionarCelula(aluno.mediaFinal);
    adicionarCelula(aluno.situacao);

    let celulaAcoes = document.createElement('td');
    celulaAcoes.classList.add('actions');
    celulaAcoes.innerHTML = `
        <button class="add">Adicionar Notas</button>
        <button class="update" onclick="editarDados(this)">Editar</button>
        <button class="delete" onclick="excluirLinha('${aluno.ra}')">Excluir</button>
    `;
    novaLinha.appendChild(celulaAcoes);

    document.getElementById('idTabela').appendChild(novaLinha);
}

//essa variavel esta atrelada a função "exibirTabelaAlunos()"
// let tabelaExibida = false;

function exibirTabelaAlunos() {
    const tabela = document.getElementById('idTabela');
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    alunos.forEach(aluno => {
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
    });

    // tabelaExibida = true;
}

function editarDados(botaoEditar) {
    let linha = botaoEditar.parentNode.parentNode;

    let nome = linha.cells[0].innerHTML;
    let RA = linha.cells[1].innerHTML;
    let Email = linha.cells[2].innerHTML;

    let novoNome = prompt("Novo Nome:", nome);
    let novoRA = prompt("Novo RA:", RA);
    let novoEmail = prompt("Novo Email:", Email);

        if (novoNome == "" || novoRA == "" || novoEmail == ""){
        alert("Os campos devem estar preenchidos.");
        return;
        } 
        if (!/^[a-zA-Z]+$/.test(novoNome)) {
            alert("O nome deve conter apenas letras.");
            return;
        }
        // Validar o novoRA
        if (!/^\d+$/.test(novoRA)) {
            alert("O RA deve conter apenas números.");
            return;
        }

        // Validar o novoEmail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
            alert("O email inserido não está em um formato válido.");
            return;
        }

        // Se todos os campos passaram na validação, atualizar as células da linha
        linha.cells[0].innerHTML = novoNome;
        linha.cells[1].innerHTML = novoRA;
        linha.cells[2].innerHTML = novoEmail;
    }




function excluirLinha(ra) {
    let tabela = document.getElementById('idTabela');
    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    let index = alunos.findIndex(aluno => aluno.ra === ra);

    if (index !== -1) {
        alunos.splice(index, 1);

        localStorage.setItem('aluno', JSON.stringify(alunos));

        tabela.deleteRow(index + 1);
    }
}

function configurarPopup() {
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
        let nome = document.getElementById("input_nome").value;
        let ra = document.getElementById("input_ra").value;
        let email = document.getElementById("input_email").value;

        const aluno = validarCadastro(nome, ra, email);
        if (aluno) {
            adicionaDadosAluno();
            document.getElementById("popup").classList.remove("show");
            setTimeout(function () {
                document.getElementById("popup").style.display = "none";
            }, 300);
        }
    });
}

function limparCampos() {
    document.getElementById('input_nome').value = "";
    document.getElementById('input_ra').value = "";
    document.getElementById('input_email').value = "";
}


// Cálculos de média

function calcularMedia1(aluno) {
    let prova = aluno.prova1 * 0.8;
    let aep = aluno.aep1 * 0.1;
    let integrada = aluno.prova_integrada1 * 0.1;

    let media = prova + aep + integrada;

    return media;
}

function calcularMedia2(aluno) {
    let prova = aluno.prova2 * 0.8;
    let aep = aluno.aep2 * 0.1;
    let integrada = aluno.prova_integrada2 * 0.1;

    let media = prova + aep + integrada;

    return media;
}

function calcularMediaFinal(aluno) {
    let final = (calcularMedia1(aluno) + calcularMedia2(aluno)) / 2;
    return final;
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

function calcularMedia1Total() {
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

function calcularMediaTotalProva1() {
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

function calcularMediaTotalAEP1() {
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

function calcularMediaTotalIntegrada1() {
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

function calcularMedia2Total() {
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

function calcularMediaTotalProva2() {
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

function calcularMediaTotalAEP2() {
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

function calcularMediaTotalIntegrada2() {
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

function calcularMediaTotalFinal() {
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
