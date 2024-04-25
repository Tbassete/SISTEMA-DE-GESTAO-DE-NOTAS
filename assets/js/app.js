//let alunos = [];


var idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno(){

    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;


    const aluno = {
        nome: nome,
        ra: ra,
        email: email
    }
    
    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];

    alunos.push(aluno);

    
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
}

function adicionanNota1(){

    const prova1 = document.getElementById("input_prova_1").value;
    const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
    const input_aep_1 = document.getElementById("input_aep_1").value;

}