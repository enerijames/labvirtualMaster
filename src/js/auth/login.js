const form = document.getElementsByClassName('formulario-login')[0];


let alunoLogado;

const isValidElement = element => {
    return element.name && element.value;
  };

const isValidValue = element => {
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

const getSelectValues = options => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
  }, []);

const isCheckbox = element => element.type === 'checkbox';

const isMultiSelect = element => element.options && element.multiple;

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    if(isValidElement(element) && isValidValue(element)){
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
          } else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element);
          } else {
            data[element.name] = element.value;
          }
    }
    return data;
  }, {});

  

const handleFormSubmit = event => {
    event.preventDefault();

    const data = formToJSON(event.target);

    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(data => {
      let jwtToken;
      jwtToken = data.token;
      localStorage.setItem('jwtToken', jwtToken)
      window.location.replace('pages/home.html');
    }).catch(function(error) {
        console.log(error);
    })
}


form.addEventListener('submit', handleFormSubmit);



