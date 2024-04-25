// função para exibir a tabela de alunos sozinho
exibirTabelaAlunos();



let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

//essa variavel esta atrelada a função "exibirTabelaAlunos()"
let tabelaExibida = false;

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
    document.getElementById("popup").classList.remove("show");
    // limparCampos();  //ja é implementado na função configurarPopup
}



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


function configurarPopup() {
    document.getElementById("openPopup").addEventListener("click", function() {
        document.getElementById("input_nome").value = "";
        document.getElementById("input_ra").value = "";
        document.getElementById("input_email").value = "";

        document.getElementById("popup").classList.add("show");
        setTimeout(function() {
            document.getElementById("popup").style.display = "block";
        }, 10);
    });

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

        // Expressão regular para validar o formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nome.trim() === '' || ra.trim() === '' || email.trim() === '') {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("O e-mail inserido não está em um formato válido!");
            return;
        }
        
        adicionaDadosAluno();
    });
}
