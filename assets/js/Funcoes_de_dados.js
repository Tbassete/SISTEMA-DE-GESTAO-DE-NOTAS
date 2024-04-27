
export function adicionarLinha(aluno) {
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

export function adicionaDadosAluno() {
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
    return;
}

export function adicionarCelula(valor) {
    let celula = document.createElement('td');
    celula.textContent = valor || '-';
    novaLinha.appendChild(celula);
}

export function editarDados(botaoEditar) {
    let linha = botaoEditar.parentNode.parentNode;

    let nome = linha.cells[0].innerHTML;
    let Email = linha.cells[2].innerHTML;

    let novoNome = prompt("Novo Nome:", nome);
    let novoEmail = prompt("Novo Email:", Email);

        if (novoNome == "" || novoEmail == ""){
        alert("Os campos devem estar preenchidos.");
        return;
        } 
        if (!/^[a-zA-Z]+$/.test(novoNome)) {
            alert("O nome deve conter apenas letras.");
            return;
        }
        // Validar o novoEmail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
            alert("O email inserido não está em um formato válido.");
            return;
        }

        // Se todos os campos passaram na validação, atualizar as células da linha
        linha.cells[0].innerHTML = novoNome;
        linha.cells[2].innerHTML = novoEmail;

        let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
        const index = alunos.findIndex(aluno => aluno.ra === RA);
        if (index !== -1) {
            alunos[index].nome = novoNome;
            alunos[index].email = novoEmail;
            localStorage.setItem('aluno', JSON.stringify(alunos));
    }}


    export function excluirLinha(ra) {
        const tabela = document.getElementById('idTabela');
        let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    
        const index = alunos.findIndex(aluno => aluno.ra === ra);
    
        if (index !== -1) {
            alunos.splice(index, 1);
    
            localStorage.setItem('aluno', JSON.stringify(alunos));
    
            // Remover a linha da tabela
            tabela.deleteRow(index + 1); 
        }}
    

export function alternarBimestre() {
        const switchCheckbox = document.getElementById("switchBimestre");
        const primeiroBimestreLabel = document.getElementById("primeiroBimestre");
        const segundoBimestreLabel = document.getElementById("segundoBimestre");
    
        if (switchCheckbox.checked) {
            primeiroBimestreLabel.classList.remove("selecionado");
            segundoBimestreLabel.classList.add("selecionado");
            document.getElementById("input_prova_2").disabled = false;
            document.getElementById("input_aep_2").disabled = false;
            document.getElementById("input_prova_integrada_2").disabled = false;
            document.getElementById("input_prova_1").disabled = true;
            document.getElementById("input_aep_1").disabled = true;
            document.getElementById("input_prova_integrada_1").disabled = true;
        } else {
            primeiroBimestreLabel.classList.add("selecionado");
            segundoBimestreLabel.classList.remove("selecionado");
            document.getElementById("input_prova_1").disabled = false;
            document.getElementById("input_aep_1").disabled = false;
            document.getElementById("input_prova_integrada_1").disabled = false;
            document.getElementById("input_prova_2").disabled = true;
            document.getElementById("input_aep_2").disabled = true;
            document.getElementById("input_prova_integrada_2").disabled = true;
        } 
    }