const form = document.getElementsByClassName('aluno-formulario')[0];
const form2 = document.getElementsByClassName('professor-formulario')[0];

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

    console.log(JSON.stringify(data))

    fetch('http://localhost:8080/auth/signup', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.text();
    }).then(function (text) {
        console.log(text)
    }).catch(function(error) {
        console.log(error);
    })
}

const handleFormSubmitProfessor = event => {
    event.preventDefault();

    const data = formToJSON(event.target);

    console.log(JSON.stringify(data))

    fetch('http://localhost:8080/auth/signupProf', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.text();
    }).then(function (text) {
        console.log(text)
    }).catch(function(error) {
        console.log(error);
    })
}

form.addEventListener('submit', handleFormSubmit);
form2.addEventListener('submit', handleFormSubmitProfessor);