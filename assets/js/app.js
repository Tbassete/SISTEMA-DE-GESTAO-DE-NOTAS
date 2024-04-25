//let alunos = [];


let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno(){
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

function exibirTabelaAlunos() {
  
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
            <!-- Adicione outras células conforme necessário -->
            <td>${aluno.media1Bimestre || '-'}</td>
            <td>${aluno.prova2 || '-'}</td>
            <td>${aluno.aep2 || '-'}</td>
            <td>${aluno.prova_integrada2 || '-'}</td>
            <td>${aluno.media2Bimestre || '-'}</td>
            <td>${aluno.mediaFinal || '-'}</td>
            <td>${aluno.situacao || '-'}</td>
        `;

        tabela.appendChild(novaLinha);
    });
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
    
    function limparCampos(){
      document.getElementById('input_nome').value = "";
      document.getElementById('input_ra').value = "";
      document.getElementById('input_email').value = "";
    }



function adicionaNota1B(){

    const prova1 = document.getElementById("input_prova_1").value;
    const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
    const input_aep_1 = document.getElementById("input_aep_1").value;

}
