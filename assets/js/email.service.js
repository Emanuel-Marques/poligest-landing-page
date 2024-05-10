class FormSubmit {
    emails = ['geral@poligest.ao', 'tomas.gomes@poligest.ao', 'wydoaputaro585@gmail.com'];
    constructor(settings) {
        this.settings = settings;
        console.log(document.getElementById(settings.form));
        this.form = document.getElementById(settings.form);
        this.formButton = document.getElementById(settings.button);
        // if(this.form){
        //     this.url = this.form.getAttribute('action');
        // }
    }

    setAlert(classValue, message){
        const alerta = document.getElementById('alerta');
        alerta.className = classValue;
        alerta.innerHTML = message;
        setTimeout(()=>{
            alerta.className = 'd-none';
            alerta.innerHTML = '';
        },3000);
    }

    getFormData(){
      const formObject = {};
      const fields = this.form.querySelectorAll('[name]');
      fields.forEach((field) => {
            formObject[field.getAttribute('name')] = field.value;  
      });
      return formObject;
    }

    async sendForm(e){
        this.onSubmmited(e);
        try{
            this.emails.forEach(async (email) => 
              await fetch(
                `https://formsubmit.co/ajax/${email}`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.getFormData())
              })
            );
            this.displaySucess();
            this.resetButton(e);
            this.resetForm();
        } catch(error){
            this.displayError();
        }
        
    }

    onSubmmited(e){
        e.preventDefault();
        e.target.disabled = true;
        e.target.innerText = '';
        const loading = `<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        <span role="status">Enviando...</span>`; 
        e.target.innerHTML = loading;
    }

    resetButton(event){       
        event.target.disabled = false;
        event.target.innerText = 'ENVIE SUA MENSAGEM';
    }

    resetForm(){
        const fields = this.form.querySelectorAll('[name]');
        fields.forEach((field) => {
            field.value = '';
        });
    }

    displaySucess(){
        this.setAlert(this.settings.success, 'Formulário enviado com sucesso');
    }

    displayError(){
        this.setAlert(this.settings.error, 'Erro ao enviar formulário');
    }

     init(){
        if(this.form){
            this.formButton.addEventListener('click', async (e) => await this.sendForm(e, email));
        }
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: ['formulario'],
    button: ['buttonEnviar'],
    success: "alert alert-success",
    error: "alert alert-danger"
});

formSubmit.init();