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
    let prova1 = 0;
    let aep1 = 0;
    let prova_integrada1 = 0;
    let prova2 = 0;
    let aep2 = 0;
    let prova_integrada2 = 0;
    let media1 = 0;
    let media2 = 0;
    let final = 0;
    situacao = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nome || !ra || !email) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("O e-mail inserido não está em um formato válido!");
        return;
    }

    const aluno = {
        nome: nome,
        ra: ra,
        email: email,
        prova1 : prova1,
        aep1 : aep1,
        prova_integrada1 : prova_integrada1,
        prova2 : prova2,
        aep2 : aep2,
        prova_integrada2 : prova_integrada2,
        media1 : media1,
        media2 : media2,
        final : final,
        situacao: situacao
    };

    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    alunos.push(aluno);
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
    adicionarLinha(aluno);

    // Abrir o popup de notas
    configurarPopupNotas(aluno);
    calcularMediaTotalProva1();
    calcularMedia1Total();
    calcularMediaTotalAEP1();
    calcularMediaTotalIntegrada1();
    calcularMediaTotalProva2();
    calcularMedia2Total();
    calcularMediaTotalAEP2();
    calcularMediaTotalIntegrada2();
    calcularMediaTotalFinal();
}

function adicionarNotasAluno(aluno) {

    const prova1 = document.getElementById("input_prova_1").value;
    const aep1 = document.getElementById("input_aep_1").value;
    const prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
    const prova2 = document.getElementById("input_prova_2").value;
    const aep2 = document.getElementById("input_aep_2").value;
    const prova_integrada2 = document.getElementById("input_prova_integrada_2").value;


    aluno.prova1 = prova1;
    aluno.aep1 = aep1;
    aluno.prova_integrada1 = prova_integrada1;
    aluno.prova2 = prova2;
    aluno.aep2 = aep2;
    aluno.prova_integrada2 = prova_integrada2;

    aluno.media1 = calcularMedia1(aluno);
    aluno.media2 = calcularMedia2(aluno);
    aluno.final = calcularMediaFinal(aluno);
    aluno.situacao = definirSituacao(aluno);

    // Salvar a lista atualizada de alunos de volta no armazenamento local
    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    const alunoIndex = alunos.findIndex(a => a.ra === aluno.ra);
    if (alunoIndex !== -1) {
        alunos[alunoIndex] = aluno;
        localStorage.setItem('aluno', JSON.stringify(alunos));
        alert("Notas adicionadas com sucesso!");
    } else {
        alert("Aluno não encontrado. Certifique-se de que o RA está correto.");
    }
    calcularMediaTotalProva1();
    calcularMedia1Total();
    calcularMediaTotalAEP1();
    calcularMediaTotalIntegrada1();
    calcularMediaTotalProva2();
    calcularMedia2Total();
    calcularMediaTotalAEP2();
    calcularMediaTotalIntegrada2();
    calcularMediaTotalFinal();

}

function adicionarLinha(aluno) {
    let idLinha = 'linha' + Date.now();
    
    let novaLinha = document.createElement('tr');
    novaLinha.id = idLinha;
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
    adicionarCelula(calcularMedia1(aluno));
    adicionarCelula(aluno.prova2);
    adicionarCelula(aluno.aep2);
    adicionarCelula(aluno.prova_integrada2);
    adicionarCelula(calcularMedia2(aluno));
    adicionarCelula(calcularMediaFinal(aluno));
    adicionarCelula(definirSituacao(aluno));

    let celulaAcoes = document.createElement('td');
    celulaAcoes.classList.add('actions');
    celulaAcoes.innerHTML = `
        <button class="add" onclick="editarNotas(this)">Adicionar Notas</button>
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
        if (aluno.ra == ""){
            excluirLinha(aluno.ra);
        } else{
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
            <td>${aluno.final || '-'}</td>
            <td>${aluno.situacao || '-'}</td>
            <td class="actions">
                <button class="add" onclick="editarNotas(this)">Adicionar Notas</button>
                <button class="update" onclick="editarDados(this)">Editar</button>
                <button class="delete" onclick="excluirLinha('${aluno.ra}')">Excluir</button>
            </td>
        `;
        tabela.appendChild(novaLinha);
    }});

    // tabelaExibida = true;
    calcularMediaTotalProva1();
    calcularMedia1Total();
    calcularMediaTotalAEP1();
    calcularMediaTotalIntegrada1();
    calcularMediaTotalProva2();
    calcularMedia2Total();
    calcularMediaTotalAEP2();
    calcularMediaTotalIntegrada2();
    calcularMediaTotalFinal();
}

    function editarDados(botaoEditar) {
        let linha = botaoEditar.parentNode.parentNode;
    
        let nome = linha.cells[0].innerHTML;
        let RA = linha.cells[1].innerHTML;
        let Email = linha.cells[2].innerHTML;
    
        let novoNome = prompt("Novo Nome:", nome);
        let novoEmail = prompt("Novo Email:", Email);
    
            if (novoNome == "" || novoEmail == ""){
            alert("Os campos devem estar preenchidos.");
            return;
            } 
            if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(novoNome)) {
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
        }
        calcularMediaTotalProva1();
        calcularMedia1Total();
        calcularMediaTotalAEP1();
        calcularMediaTotalIntegrada1();
        calcularMediaTotalProva2();
        calcularMedia2Total();
        calcularMediaTotalAEP2();
        calcularMediaTotalIntegrada2();
        calcularMediaTotalFinal();}

        function editarNotas(botaoAdd) {
            let linha = botaoAdd.parentNode.parentNode;
        
            let prova1 = linha.cells[3].innerHTML;
            let aep1 = linha.cells[4].innerHTML;
            let integrada1 = linha.cells[5].innerHTML;
            let prova2 = linha.cells[6].innerHTML;
            let aep2 = linha.cells[7].innerHTML;
            let integrada2 = linha.cells[8].innerHTML;
        
            let novoProva1 = prompt("Nova nota da Prova 1:", prova1);
            let novoAEP1 = prompt("Nova nota da AEP 1:", aep1);
            let novoIntegrada1 = prompt("Nova nota da Prova Integrada 1:", integrada1);
            let novoProva2 = prompt("Nova nota da Prova 2:", prova2);
            let novoAEP2 = prompt("Nova nota da AEP 2:", aep2);
            let novoIntegrada2 = prompt("Nova nota da Prova Integrada 2:", integrada2);
        
            // Validar as novas notas
        
            // Se todas as notas passaram na validação, atualizar as células da linha
            linha.cells[3].innerHTML = novoProva1 || '-';
            linha.cells[4].innerHTML = novoAEP1 || '-';
            linha.cells[5].innerHTML = novoIntegrada1 || '-';
            linha.cells[6].innerHTML = novoProva2 || '-';
            linha.cells[7].innerHTML = novoAEP2 || '-';
            linha.cells[8].innerHTML = novoIntegrada2 || '-';
        
            // Atualizar as notas no objeto aluno
            const ra = linha.cells[1].innerHTML;
            const alunos = JSON.parse(localStorage.getItem('aluno')) || [];
            const index = alunos.findIndex(aluno => aluno.ra === ra);
            if (index !== -1) {
                alunos[index].prova1 = novoProva1 || '-';
                alunos[index].aep1 = novoAEP1 || '-';
                alunos[index].prova_integrada1 = novoIntegrada1 || '-';
                alunos[index].prova2 = novoProva2 || '-';
                alunos[index].aep2 = novoAEP2 || '-';
                alunos[index].prova_integrada2 = novoIntegrada2 || '-';
                localStorage.setItem('aluno', JSON.stringify(alunos));
            }
        
            calcularMediaTotalProva1();
            calcularMedia1Total();
            calcularMediaTotalAEP1();
            calcularMediaTotalIntegrada1();
            calcularMediaTotalProva2();
            calcularMedia2Total();
            calcularMediaTotalAEP2();
            calcularMediaTotalIntegrada2();
            calcularMediaTotalFinal();
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
        calcularMediaTotalProva1();
        calcularMedia1Total();
        calcularMediaTotalAEP1();
        calcularMediaTotalIntegrada1();
        calcularMediaTotalProva2();
        calcularMedia2Total();
        calcularMediaTotalAEP2();
        calcularMediaTotalIntegrada2();
        calcularMediaTotalFinal();
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
    
            /*const aluno = validarCadastro(nome, ra, email);
            if (aluno) {
                adicionaDadosAluno();
                document.getElementById("popup").classList.remove("show");
                setTimeout(function () {
                    document.getElementById("popup").style.display = "none";
                }, 300);
            } */
        });
    }

    
    function configurarPopupNotas(aluno) {
        limparCampos();
    
        // Fechar o popup de cadastro de aluno se estiver aberto
        document.getElementById("popup").classList.remove("show");
        setTimeout(function () {
            document.getElementById("popup").style.display = "none";
        }, 300);
    
        // Abrir o popup de notas
        document.getElementById("popupNotas").classList.add("show");
        setTimeout(function () {
            document.getElementById("popupNotas").style.display = "block";
        }, 10);
    
        // Configurar evento de fechar para o popup de notas
        document.getElementById("cancelarNotas").addEventListener("click", function () {
            document.getElementById("popupNotas").classList.remove("show");
            setTimeout(function () {
                document.getElementById("popupNotas").style.display = "none";
            }, 300);
        });
    
        // Configurar evento de salvar para o popup de notas
        document.getElementById("salvarNotas").addEventListener("click", function () {
            let prova1 = document.getElementById("input_prova_1").value;
            let aep1 = document.getElementById("input_aep_1").value;
            let prova_integrada1 = document.getElementById("input_prova_integrada_1").value;
            let prova2 = document.getElementById("input_prova_2").value;
            let aep2 = document.getElementById("input_aep_2").value;
            let prova_integrada2 = document.getElementById("input_prova_integrada_2").value;
    
            // Adiciona as notas do aluno
            adicionarNotasAluno(aluno, prova1, aep1, prova_integrada1, prova2, aep2, prova_integrada2);
            document.getElementById("popupNotas").classList.remove("show");
            setTimeout(function () {
                document.getElementById("popupNotas").style.display = "none";
            }, 300);
            limparNotas();
        });
    }



function limparCampos() {
    document.getElementById('input_nome').value = "";
    document.getElementById('input_ra').value = "";
    document.getElementById('input_email').value = "";
}

function limparNotas(){
    document.getElementById('input_prova_1').value = "";
    document.getElementById('input_aep_1').value = "";
    document.getElementById('input_prova_integrada_1').value = "";
    document.getElementById('input_prova_2').value = "";
    document.getElementById('input_aep_2').value = "";
    document.getElementById('input_prova_integrada_2').value = "";
}


// Cálculos de média

function calcularMedia1(aluno) {
    let prova = parseFloat(aluno.prova1) * 0.8;
    let aep = parseFloat(aluno.aep1) * 0.1;
    let integrada = parseFloat(aluno.prova_integrada1) * 0.1;

    let media = prova + aep + integrada;

    if(isNaN(media)){
        return 0;
    }else{
        return media.toFixed(1);
    }
}

function calcularMedia2(aluno) {
    let prova = parseFloat(aluno.prova2) * 0.8;
    let aep = parseFloat(aluno.aep2) * 0.1;
    let integrada = parseFloat(aluno.prova_integrada2) * 0.1;

    let media = prova + aep + integrada;

    if(isNaN(media)){
        return 0;
    }else{
        return media.toFixed(1);
    }
}

function calcularMediaFinal(aluno) {
    let media1 = parseFloat(calcularMedia1(aluno)) || 0; // Define 0 se a média1 não puder ser convertida em um número
    let media2 = parseFloat(calcularMedia2(aluno)) || 0; // Define 0 se a média2 não puder ser convertida em um número
    let final = (media1 + media2) / 2;

    return final.toFixed(1);
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
        document.getElementById("media1Bi").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("media1Bi").textContent = 0.0;
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
        document.getElementById("mediaProva1").textContent = mediaTotal.toFixed(2); // Atualiza o conteúdo do elemento com o valor da média
    } else {
        document.getElementById("mediaProva1").textContent = "0.0"; // Caso não haja notas válidas
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
        document.getElementById("mediaAEP1").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaAEP1").textContent = 0.0;
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
        document.getElementById("mediaProvaIntegrada1").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaProvaIntegrada1").textContent = 0.0;
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
        document.getElementById("media2Bi").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("media2Bi").textContent = 0.0;
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
        document.getElementById("mediaProva2").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaProva2").textContent = 0.0;
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
        document.getElementById("mediaAEP2").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaAEP2").textContent = 0.0;
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
        document.getElementById("mediaProvaIntegrada2").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaProvaIntegrada2").textContent = 0.0;
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
        document.getElementById("mediaGeral").textContent = mediaTotal.toFixed(2);
    } else {
        document.getElementById("mediaGeral").textContent = 0.0;
    }
}

function alternarBimestre() {
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
        document.getElementById("input_prova_1").value = "";
        document.getElementById("input_aep_1").value = "";
        document.getElementById("input_prova_integrada_1").value = "";
    } else {
        primeiroBimestreLabel.classList.add("selecionado");
        segundoBimestreLabel.classList.remove("selecionado");
        document.getElementById("input_prova_1").disabled = false;
        document.getElementById("input_aep_1").disabled = false;
        document.getElementById("input_prova_integrada_1").disabled = false;
        document.getElementById("input_prova_2").disabled = true;
        document.getElementById("input_aep_2").disabled = true;
        document.getElementById("input_prova_integrada_2").disabled = true;
        document.getElementById("input_prova_2").value = "";
        document.getElementById("input_aep_2").value = "";
        document.getElementById("input_prova_integrada_2").value = "";
    } 
}
