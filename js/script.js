function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });
;
 // At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

let nameValid = (value) => {
    let pattern = /(?=.*?[#?!@$%^&*/"'|])/;
    let isMatch = value.match(pattern);
    let flag = value !== '' && !isMatch;
    fieldsState["firstName"].isValid = flag;
    toggleClass([firstnameField, firstnameField__redLabel], flag);
}

let lastNameValid = (value) => {
    let pattern = /(?=.*?[#?!@$%^&*-=+/"'|])/;
    let isMatch = value.match(pattern);
    let flag = value !== '' && !isMatch;
    fieldsState["lastName"].isValid = flag;
    toggleClass([lastNameField, lastnameField__redLabel], flag);
}

let mailValid = (value) => {
    let pattern = /^[a-zA-Z_0-9]+?\.[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let isMatch = value.match(pattern);
     fieldsState["E-mail"].isValid = !!isMatch;
    toggleClass([emailField, inputEmail__redLabel], !!isMatch);
}

let passValid = (value) => {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let isMatch = value.match(pattern);
        fieldsState["password"].isValid = !!isMatch;
        fieldsState["confPass"].isValid = compirePasswords();
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords());  
        toggleClass([passField, passField__redLabel], !!isMatch);
}

let passConfirm = () => {
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords()); 
        fieldsState["confPass"].isValid = compirePasswords(); 
}

let compirePasswords = () => {
    return fieldsState["confPass"].value === fieldsState["password"].value && fieldsState["password"].value !== "";
};
async function sentRequest(data) {
  const response = await fetch('./js/server-ok.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
      return response.json();
  })
    .catch(() => {
      getError();
    });
}

async function getError() {
  await fetch('./js/server-error.json')
    .then(response => response.json())
    .then(json => console.log(json.Error))
};

let firstnameField = document.querySelector(".firstnameField");
let lastNameField = document.querySelector(".lastNameField");
let fields = document.querySelector(".fields");
let formUpperText__heading = document.querySelector(".formUpperText__heading");
let formUpperText__subHeading = document.querySelector(".formUpperText__subHeading");
let emailField = document.querySelector(".inputEmail");
let passField = document.querySelector(".passField");
let singUpForm__submitBtn = document.querySelector(".singUpForm__submitBtn");
let confirmPassField = document.querySelector(".confirmPassField");
let inputEmail__redLabel = document.querySelector(".inputEmail__redLabel");
let passField__redLabel = document.querySelector(".passField__redLabel");
let confirmPassField__redLabel = document.querySelector(".confirmPassField__redLabel");
let firstnameField__redLabel = document.querySelector(".firstnameField__redLabel");
let lastnameField__redLabel = document.querySelector(".lastnameField__redLabel");
let formUpperText = document.querySelector(".formUpperText");
let successTxt = document.querySelector(".successTxt");

let fieldsState = {
    'E-mail':  {
        value: '',
        isValid: false
    },
    'password': {
        value: '',
        isValid: false
    },
    'confPass': {
        value: '',
        isValid: false
    },
    'firstName': {
        value: '',
        isValid: false
    },
    'lastName': {
        value: '',
        isValid: false
    }
};

fields.addEventListener("input", e => {
    e.preventDefault();
    fieldsState[e.target.name].value = e.target.value;
    fieldReducer(e.target.name);
});

fields.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (!isFieldsValid()) {
       toggleSmbBtnClass();
     } else {
        sentRequest(formProps);
        hideNode(singUpForm__submitBtn);
        hideNode(fields);
        hideNode(formUpperText__subHeading);
        hideNode(formUpperText__heading);
        showNode(successTxt);
       }
});

let fieldReducer = (fieldName) => {
    switch (fieldName) {
        case "lastName": lastNameValid(fieldsState["lastName"].value);break;
        case "E-mail": mailValid(fieldsState["E-mail"].value); break;
        case "password": passValid(fieldsState["password"].value);break;
        case "confPass": passConfirm(fieldsState["confPass"].value);break;
        case "firstName": nameValid(fieldsState["firstName"].value);break;
    }
}

let isFieldsValid = () => {
    for (key in fieldsState) {
          if (!fieldsState[key].isValid) {
    return false;
          } 
    }
    return true;
}

let hideNode = (node) => {
    node.classList.add("fields--hide");
}

let showNode = (node) => {
    node.classList.add("singUpForm--showBlock");
}

let toggleSmbBtnClass = () => {
        singUpForm__submitBtn.classList.add("btnAnimation");
        setTimeout(() => {
            singUpForm__submitBtn.classList.remove("btnAnimation");
        }, 500)
}

let toggleClass = (node, flag) => {
    if (flag) {
        node[0].style.background = "url(./img/truefilled.svg) no-repeat right center";
        node[0].classList.remove("singUpForm--invalidInput"); 
        node[1].classList.remove("singUpForm--showBlock");
        return true;
    } else { 
        node[0].style.background = 'none';
        node[0].classList.add("singUpForm--invalidInput");
        node[1].classList.add("singUpForm--showBlock"); 
    }
}

let overflowHeading = () => {
    if (formUpperText__subHeading.innerHTML.length > 64) {
      formUpperText__subHeading.innerHTML = formUpperText__subHeading.innerHTML + '...';
    }
}

overflowHeading();




 