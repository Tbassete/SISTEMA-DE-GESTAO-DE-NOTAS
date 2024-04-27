export function validaRA(ra, alunos){

    //let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].ra === ra) {
          return true;
      }
  }
  return false;}

