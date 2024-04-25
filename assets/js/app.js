//let alunos = [];


let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno() {
    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;

    if (!nome || !ra || !email) {
        alert("Todos os campos são obrigatórios!");
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
    limparCampos();
}


//essa variavel esta atrelada a função "exibirTabelaAlunos()"
let tabelaExibida = false;

function exibirTabelaAlunos() {
    if(!tabelaExibida){
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];


    const tabela = document.getElementById('idTabela');


    alunos.forEach(aluno => {

        const novaLinha = document.createElement('tr');

        novaLinha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1}</td>
            <td>${aluno.prova_integrada1}</td>
            <td>${aluno.media1Bimestre || '-'}</td>
            <td>${aluno.prova2 || '-'}</td>
            <td>${aluno.aep2 || '-'}</td>
            <td>${aluno.prova_integrada2 || '-'}</td>
            <td>${aluno.media2Bimestre || '-'}</td>
            <td>${aluno.mediaFinal || '-'}</td>
            <td>${aluno.situacao || '-'}</td> `; // <td><button onclick="excluirAluno('${aluno.ra}', this)">Excluir</button></td>

        tabela.appendChild(novaLinha);
    });

    tabelaExibida = true;
}
}

function adicionarLinha(aluno) {
    let novaLinha = document.createElement('tr');

    let nome = document.createElement('td');
    nome.innerHTML = aluno.nome;
    novaLinha.appendChild(nome);

    let RA = document.createElement('td');
    RA.innerHTML = aluno.ra;
    novaLinha.appendChild(RA);

    let Email = document.createElement('td');
    Email.innerHTML = aluno.email;
    novaLinha.appendChild(Email);

    document.getElementById('idTabela').appendChild(novaLinha);
}

function editarDados() {
    let prova1 = document.createElement('td');
    prova1.innerHTML = "<input type=number id=input_prova_1 name=prova1 min=0 max=8 step=0.01>";
   
//"<input type=number id=input_prova_1 name=prova1 min=0 max=8 step=0.01>"
}

function adicionarLinha(aluno) {
    let novaLinha = document.createElement('tr');

    let nome = document.createElement('td');
    nome.innerHTML = aluno.nome;
    novaLinha.appendChild(nome);

    let RA = document.createElement('td');
    RA.innerHTML = aluno.ra;
    novaLinha.appendChild(RA);

    let Email = document.createElement('td');
    Email.innerHTML = aluno.email;
    novaLinha.appendChild(Email);

    let prova1 = document.createElement('td');
    prova1.innerHTML = " ";
    novaLinha.appendChild(prova1);

    let aep1 = document.createElement('td');
    aep1.innerHTML = "aep1";
    novaLinha.appendChild(aep1);

    let provaIntegrada1 = document.createElement('td');
    provaIntegrada1.innerHTML = "integrada1";
    novaLinha.appendChild(provaIntegrada1);

    let media1 = document.createElement('td');
    media1.innerHTML = "media1";
    novaLinha.appendChild(media1);

    let prova2 = document.createElement('td');
    prova2.innerHTML = "prova2";
    novaLinha.appendChild(prova2);

    let aep2 = document.createElement('td');
    aep2.innerHTML = "aep2";
    novaLinha.appendChild(aep2);

    let provaIntegrada2 = document.createElement('td');
    provaIntegrada2.innerHTML = "integrada2";
    novaLinha.appendChild(provaIntegrada2);

    let media2 = document.createElement('td');
    media2.innerHTML = "media2";
    novaLinha.appendChild(media2);

    let mediaFinal = document.createElement('td');
    mediaFinal.innerHTML = "final";
    novaLinha.appendChild(mediaFinal);

    let situacao = document.createElement('td');
    situacao.innerHTML = "situacao";
    novaLinha.appendChild(situacao);

    let acoes = document.createElement('td');
    acoes.innerHTML = `
      <button>Nota</button>
      <button onclick="editarDados()">Editar</button>
      <button onclick="excluirlinha()">Remover</button>`;
    novaLinha.appendChild(acoes);

    document.getElementById('idTabela').appendChild(novaLinha);
}

// function adicionarLinha(aluno) {
//     let novaLinha = document.createElement('tr');

//     let nome = document.createElement('td');
//     nome.innerHTML = aluno.nome;
//     novaLinha.appendChild(nome);

//     let RA = document.createElement('td');
//     RA.innerHTML = aluno.ra;
//     novaLinha.appendChild(RA);

//     let Email = document.createElement('td');
//     Email.innerHTML = aluno.email;
//     novaLinha.appendChild(Email);

//     let botaoExcluir = document.createElement('button');
//     botaoExcluir.textContent = 'Excluir';
//     botaoExcluir.onclick = function() {
//         excluirAluno(aluno.ra, this); 
//         novaLinha.remove(); 
//     };
//     let colunaBotao = document.createElement('td');
//     colunaBotao.appendChild(botaoExcluir);
//     novaLinha.appendChild(colunaBotao);

//     document.getElementById('idTabela').appendChild(novaLinha);
// }

// function excluirAluno(ra, botao) {
//     let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
//     alunos = alunos.filter(aluno => aluno.ra !== ra);
//     localStorage.setItem('aluno', JSON.stringify(alunos));
    
//     let linha = botao.parentNode.parentNode;
//     linha.remove();
// }





function limparCampos() {
    document.getElementById('input_nome').value = "";
    document.getElementById('input_ra').value = "";
    document.getElementById('input_email').value = "";
}


// function adicionaNota1B() {

//     const prova1 = document.getElementById("input_prova_1").value;
//     const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
//     const input_aep_1 = document.getElementById("input_aep_1").value;

// }
