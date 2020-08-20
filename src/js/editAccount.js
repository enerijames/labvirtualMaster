fetch('http://localhost:8080/index/getAluno', {
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + jwtToken,
      },
})
.then(result => {
    return result.json();
})
.then(object => {
    const aluno = object.aluno;
    //Nome embaixo da foto
    if(!aluno.name){
        document.getElementById('username').innerHTML = aluno.username
    }else{
        document.getElementById('username').innerHTML = aluno.name
    }
    //Semestre/Curso
    document.getElementById('semestre/curso').innerHTML = aluno.semestre + " / " + aluno.curso

    //Nome placeholder
    if(!aluno.name){

        
    }else{
        document.getElementById('namePlaceholder').value = aluno.name
    }
    //Username
    document.getElementById('usernamePlaceholder').value = aluno.username;
    //Email
    document.getElementById('emailPlaceholder').value = aluno.email;
    //Idade
    if(aluno.idade){
        document.getElementById('idadePlaceholder').value = aluno.idade;
    }

    if(aluno.imageUrl) {
        document.getElementById('fotoAluno').src = "http://localhost:8080/" + aluno.imageUrl
    }

    })
.catch(err => {console.log(err)})


const formEdit = document.getElementById('form-dados');


formEdit.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log(this);


    const formData = new FormData(this);

    console.log(formData)

    fetch('http://localhost:8080/index/editConta', {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + jwtToken,
          },
        body: formData,
    }).then(res => {
        location.reload(true);
        return res.text()
    })
    .then(text => console.log(text))
    .catch(err=>console.log(err))
});



