//let alunos = [];

// função para exibir a tabela de alunos sozinho
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

    // Expressão regular para validar o formato de e-mail
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
        email: email
    };

    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    alunos.push(aluno);
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
    alunos.push(aluno);
    adicionarLinha(aluno);
}


//essa variavel esta atrelada a função "exibirTabelaAlunos()"
let tabelaExibida = false;

function exibirTabelaAlunos() {
    const tabela = document.getElementById('idTabela');
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    alunos.forEach(aluno => {
        const novaLinha = document.createElement('tr');
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
                <button class="update">Atualizar</button>
                <button class="delete">Excluir</button>
            </td>
        `;
        tabela.appendChild(novaLinha);
    });

    tabelaExibida = true;
}

function adicionarLinha(aluno) {
    let novaLinha = document.createElement('tr');

    function adicionarCelula(valor) {
        let celula = document.createElement('td');
        celula.textContent = valor || '-'; 
        novaLinha.appendChild(celula);
    }

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

    //botoes de açao
    let celulaAcoes = document.createElement('td');
    celulaAcoes.classList.add('actions');
    celulaAcoes.innerHTML = `
        <button class="add">Adicionar Notas</button>
        <button class="update" onclick="editarDados()">Editar</button>
        <button class="delete" onclick="excluirlinha()">Remover</button>
    `;
    novaLinha.appendChild(celulaAcoes);


    document.getElementById('idTabela').appendChild(novaLinha);
}

function editarDados(idLinha) {
    let linha = document.getElementById(idLinha);

    let nome = linha.cells[0].innerHTML;
    let RA = linha.cells[1].innerHTML;
    let Email = linha.cells[2].innerHTML;

    let novoNome = prompt("Novo Nome:", nome);
    let novoRA = prompt("Novo RA:", RA);
    let novoEmail = prompt("Novo Email:", Email);

    if (novoNome !== null && novoRA !== null && novoEmail !== null) {
        linha.cells[0].innerHTML = novoNome;
        linha.cells[1].innerHTML = novoRA;
        linha.cells[2].innerHTML = novoEmail;
    }
}

function definirSituacao(aluno){
    let media = calcularMediaFinal(aluno);
    if (media >= 6.0){
        return "Aprovado";
    }
    else if (media <= 3.0){
        return "Reprovado";
    }
    else{
        return "Recuperacao";
    }
}

function calcularMedia1Total() {
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    let totalProva1 = 0;
    let numAlunos = 0;

    alunos.forEach(aluno => {
        const nota = parseFloat(calcularMedia1(aluno)); // Convertendo para float
        if (!isNaN(nota) && nota >= 0 && nota <= 10) { // Verifica se a nota é um número válido entre 0 e 10
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

function calcularMediaTotalProva1(){
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

function calcularMediaTotalAEP1(){
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

function calcularMediaTotalIntegrada1(){
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

function calcularMediaTotalProva2(){
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

function calcularMediaTotalAEP2(){
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

function calcularMediaTotalIntegrada2(){
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

function calcularMediaTotalFinal(){
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

function atualizarMediasNaTabela() {
    document.getElementById('mediaProva1').textContent = calcularMediaTotalProva1();
    document.getElementById('mediaAEP1').textContent = calcularMediaTotalAEP1();
    document.getElementById('mediaProvaIntegrada1').textContent = calcularMediaTotalIntegrada1();
    document.getElementById('media1Bi').textContent = calcularMedia1Total();
    document.getElementById('mediaProva2').textContent = calcularMediaTotalProva2();
    document.getElementById('mediaAEP2').textContent = calcularMediaTotalAEP2();
    document.getElementById('mediaProvaIntegrada2').textContent = calcularMediaTotalIntegrada2();
    document.getElementById('media2Bi').textContent = calcularMedia2Total();
    document.getElementById('mediaGeral').textContent = calcularMediaTotalFinal();
}

function limparCampos() {
    document.getElementById('input_nome').value = "";
    document.getElementById('input_ra').value = "";
    document.getElementById('input_email').value = "";
}

function configurarPopup() {
    limparCampos();
    
    document.getElementById("popup").classList.add("show");
    setTimeout(function() {
        document.getElementById("popup").style.display = "block";
    }, 10);

    document.getElementById("cancelar").addEventListener("click", function() {
        document.getElementById("popup").classList.remove("show");
        setTimeout(function() {
            document.getElementById("popup").style.display = "none";
        }, 300);
    });

    document.getElementById("salvar").addEventListener("click", function() {
        let nome = document.getElementById("input_nome").value;
        let ra = document.getElementById("input_ra").value;
        let email = document.getElementById("input_email").value;
        
        const aluno = validarCadastro(nome, ra, email);
        if (aluno) {
            adicionaDadosAluno();
            document.getElementById("popup").classList.remove("show");
            setTimeout(function() {
                document.getElementById("popup").style.display = "none";
            }, 300);
        }
    });
}
