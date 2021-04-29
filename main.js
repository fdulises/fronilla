class mblightbox{
    constructor(html){
        //Creamos el contenedor principal del lightbox
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'mlb-container mlb-hide');
        this.container.addEventListener('click', this.hide);
        document.body.appendChild(this.container);

        //Añadimos el html proporcionado por el usuario
        if (html != null) this.setContent(html);
    }

    //Metodo para remover el lightbox y su contenido del html
    remove = ()=> document.body.removeChild(this.container);

    //Metodo para abrir lightbox
    show = ()=> this.container.classList.remove('mlb-hide');

    //Metodo para cerrar lightbox
    hide = ()=>{
        /*setTimeout(function () {
            this.container.classList.add('mlb-hide');
        }, 600);*/
        this.container.classList.add('mlb-hide');
    }

    //Metodo para agregar contenido al lightbox
    setContent = cont =>{
        if (typeof cont == 'string'){
            this.container.innerHTML = cont;
            this.container.firstChild.addEventListener('click', (e)=>e.stopPropagation());
        }else{
            cont.addEventListener('click', e=>e.stopPropagation());
            this.container.appendChild(cont);
        }
    }
}
class mblalert extends mblightbox {
    constructor(body) {
        let cont = `<div class="mlb-card">
            <div class="mlb-body">${body}</div>
            <div class="mlb-footer">
                <button type="button" class="mlb-btn mlb-acept">Aceptar</button>
            </div>
        </div>`;
        super(cont);
        this.container.querySelector('.mlb-acept').addEventListener('click', this.hide);
    }
}
class mblconfirm extends mblightbox{
    constructor(param){
        let cont = `<div class="mlb-card">
            <div class="mlb-header">
                <h4>${param.header}</h4>
                <button type="button" class="mlb-close">×</button>
            </div>
            <div class="mlb-body">${param.body}</div>
            <div class="mlb-footer">
                <button type="button" class="mlb-btn mlb-cancel">Cancelar</button>
                <button type="button" class="mlb-btn mlb-acept">Aceptar</button>
            </div>
        </div>`;
        super(cont);
        this.container.querySelector('.mlb-close').addEventListener('click', this.hide);
        this.container.querySelector('.mlb-cancel').addEventListener('click', () => {
            param.action(false);
            this.hide();
        });
        this.container.querySelector('.mlb-acept').addEventListener('click', () => {
            param.action(true);
            this.hide();
        });
    }
}