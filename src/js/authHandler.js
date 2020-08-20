const jwtToken = localStorage.getItem('jwtToken')
// document.getElementsByTagName("BODY")[0].style.display = "none"; 

//Pede permissão para carregar a pagina
const loadHomePage = jwtToken => {
    fetch('http://localhost:8080/index/loadHome', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + jwtToken
          }
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
        let alunoLogado
          if(data) {
            alunoLogado = data.aluno;
          }
          pageConstruct(alunoLogado);
        })
        .catch(err => {
          console.log(err)
        })
  }

  const pageConstruct = (alunoLogado) => {
    const aluno = alunoLogado;

    localStorage.setItem('aluno', JSON.stringify(aluno))

    if(!aluno) {
        window.location.replace('../index.html');
    }else{
        // document.getElementsByTagName("BODY")[0].style.display = "initial"; 
    document.getElementById('alunoNome').innerHTML = aluno.username
    document.getElementById('alunoNome1').innerHTML = aluno.username
    document.getElementById('semestre').innerHTML = aluno.semestre
    if(aluno.image){
        document.getElementById('profile').src = 'http://localhost:8080/' + aluno.image
        document.getElementById('profile1').src = 'http://localhost:8080/' + aluno.image
    }
        
    }
}

loadHomePage(jwtToken);