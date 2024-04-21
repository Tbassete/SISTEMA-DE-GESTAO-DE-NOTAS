let alunos = [];

function adicionaDadosAluno(){
    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;
    const aluno = new Aluno(nome, ra, email);
    alunos.push(aluno);
}