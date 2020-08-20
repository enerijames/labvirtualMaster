const formAnotacao = document.getElementById('formAnotacao');


formAnotacao.addEventListener('submit', function (e) {
  e.preventDefault();

  const form = new FormData(this);

  form.append('type', 'anotacao')

  fetch('http://localhost:8080/index/criarTarefa', {
    method: "POST",
    headers: {
      Authorization: 'Bearer ' + jwtToken
    },
    body: form
  })
  .then(res => {
    if (res.status === 200) {
      window.location.reload();
    }
  })
  .catch(err => console.log(err))
})



