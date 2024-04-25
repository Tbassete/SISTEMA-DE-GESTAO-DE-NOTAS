//let alunos = [];


let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno(){

    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;

    if (!nome || !ra || !email ) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const aluno = {
        nome: nome,
        ra: ra,
        email: email
    }
    
    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    alunos.push(aluno);

    
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");

    const tabela = document.getElementById('idTabela');

    alunos.forEach(aluno => {
        // Cria uma nova linha na tabela
        const novaLinha = document.createElement('tr');
    
        // Adiciona as células com os dados do aluno à nova linha
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
            <td>${aluno.situacao || '-'}</td>
        `;
    
        // Adiciona a nova linha à tabela
        tabela.appendChild(novaLinha);
    });
}


function adicionaNota1B(){

    const prova1 = document.getElementById("input_prova_1").value;
    const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
    const input_aep_1 = document.getElementById("input_aep_1").value;

}
