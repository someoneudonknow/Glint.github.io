export default function validate(formSelector) {
    const _this = this;
    const form = document.querySelector(formSelector);

    function getParent(input, parentSelector) {
        if(input){
            while(input.parentElement) {
                if(input.parentElement.matches(parentSelector)){
                    return input.parentElement;
                }
                input = input.parentElement;
            }
        }
    }

    var validatorRules = {
        required: function(value){
            return value.trim() ? undefined : 'THIS FIELD IS REQUIRED.';
        },
        email: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value.trim()) ? undefined : 'PLEASE ENTER A VALID EMAIL ADDRESS.';
        },
        min: function(min) {
            return function(value) {
                return value.length > min ? undefined : `PLEASE ENTER AT LEAST ${min} CHARACTERS.`; 
            }
        },
        max: function(max) {
            return function(value) {
                return value.length < max ? undefined : `PLEASE ENTER LESS THAN ${max} CHARACTERS.`;
            }
        }
    }

    var formRules = {};

    if(form){
        const inputs = form.querySelectorAll('[rules][name]');

        for(let input of inputs){
            let rules = input.getAttribute('rules').split('|');

            for(let rule of rules){
                var ruleFunc;
                if(rule.includes(':')){
                    let ruleInfo = rule.split(':');
                    ruleFunc = validatorRules[ruleInfo[0]](ruleInfo[1]);
                }else {
                    ruleFunc = validatorRules[rule];
                }

                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }else {
                    formRules[input.name] = [ruleFunc];
                }

            }

            input.oninput = handleClearErrors;
            input.onblur = handleValidate;
        }

        function handleValidate(e){
            let rules = formRules[e.target.name];
            let errorMess;

            for(let rule of rules) {
                errorMess = rule(e.target.value);
                if(errorMess) break;
            }

            if(errorMess) {
                let formGroup = getParent(e.target, '.form-g');
                if(formGroup){
                    formGroup.classList.add('invalid');
                    let errorMessage = formGroup.querySelector('.error-message');
                    if(errorMessage){
                        errorMessage.textContent = errorMess;
                    }
                }
            }

            return !errorMess;
        }

        function handleClearErrors(e) {
            let formGroup = getParent(e.target, '.form-g');
            
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                let formMessage = formGroup.querySelector('.error-message');
                if(formMessage){
                    formMessage.textContent = "";
                }
            }
        }

        form.onsubmit = function(e) {
            e.preventDefault();
            let inputs = document.querySelectorAll('[name][rules]');
            let isValid = true;
            for(let input of inputs) {
                if(!handleValidate({target: input})){
                    isValid = false;
                }
            }

            if(isValid) {
                if(typeof _this.onSubmit === "function"){
                    let enablenputs = document.querySelectorAll('[name]:not([disabled])');
                    
                   var formData = Array.from(enablenputs).reduce((value, input) => {
                        switch(input.type){
                            case "checkbox":
                                if(input.checked){
                                    if (!Array.isArray(value[input.name])) {
                                        value[input.name] = [];
                                    }
                                    value[input.name].push(input.value);
                                }
                                break;
                            case 'radio':
                                if(input.matches(':checked')){
                                    value[input.name] = input.value;
                                }
                                break;
                            case 'file':
                                value[input.name] = input.files;
                                break;
                            default:
                                value[input.name] = input.value;
                                break;
                        }
                        return value;
                   },{});

                   return _this.onSubmit(formData);
                }else {
                    this.submit();
                }
            }
        }
    }
}