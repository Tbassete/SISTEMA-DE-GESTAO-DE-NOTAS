let alunos = [];

function adicionaDadosAluno(){
    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;
    // const aluno = new Aluno(nome, ra, email);
    const aluno = {
      nome: nome,
      ra: ra,
      email: email
  };
    alunos.push(aluno);
    adicionarLinha(aluno);
}

function excluirlinha(botao){
let linha = botao.parentNode.parentNode;     //<button onclick="excluirLinha(this)">Excluir</button>
  linha.parentNode.removeChild(linha); 
}

function adicionarLinha(aluno){
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

function json(){
    return JSON.stringify(alunos);
}
