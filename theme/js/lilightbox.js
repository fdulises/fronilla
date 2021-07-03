/* -- Ventana para lightbox y modal dialogs -- */
class liwindow{
    constructor(html){
        //Creamos el contenedor principal del lightbox
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'liwindow-container liwindow-hide');
        this.container.addEventListener('click', this.hide);
        document.body.appendChild(this.container);

        //Añadimos el html proporcionado por el usuario
        if (html != null) this.setContent(html);
    }

    //Metodo para abrir lightbox
    show = ()=> {
        this.container.classList.remove('liwindow-hide');
        document.body.style.overflow = 'hidden';
    }

    //Metodo para cerrar lightbox
    hide = ()=>{
        /*setTimeout(()=>this.container.classList.add('mlb-hide'), 600);*/
        this.container.classList.add('liwindow-hide');
        document.body.style.overflow = 'auto';
    }
    
    //Metodo para remover el lightbox y su contenido del html
    remove = () => document.body.removeChild(this.container);

    //Metodo para agregar contenido al lightbox
    setContent = cont =>{
        if (typeof cont == 'string'){
            this.container.innerHTML = cont;
            this.container.firstChild.addEventListener('click', function (e) { e.stopPropagation() });
        }else{
            cont.addEventListener('click', function (e) { e.stopPropagation()});
            this.container.appendChild(cont);
        }
    }
}
/* -- Alert Modal Window -- */
class lialert extends liwindow {
    constructor(body) {
        const cont = `<div class="liwindow-card">
            <div class="liwindow-body">${body}</div>
            <div class="liwindow-footer">
                <button type="button" class="liwindow-btn liwindow-acept">Aceptar</button>
            </div>
        </div>`;
        super(cont);
        this.container.querySelector('.liwindow-acept').addEventListener('click', this.hide);
    }
}
/* -- Confirm Modal Window -- */
class liconfirm extends liwindow{
    constructor(param){
        const cont = `<div class="liwindow-card">
            <div class="liwindow-header">
                <h4>${param.header}</h4>
                <button type="button" class="liwindow-close">×</button>
            </div>
            <div class="liwindow-body">${param.body}</div>
            <div class="liwindow-footer">
                <button type="button" class="liwindow-btn liwindow-cancel">Cancelar</button>
                <button type="button" class="liwindow-btn liwindow-acept">Aceptar</button>
            </div>
        </div>`;
        super(cont);
        this.container.querySelector('.liwindow-close').addEventListener('click', this.hide);
        this.container.querySelector('.liwindow-cancel').addEventListener('click', () => {
            this.hide();
            param.action(false);
        });
        this.container.querySelector('.liwindow-acept').addEventListener('click', () => {
            this.hide();
            param.action(true);
        });
    }
}
/* -- Image Lightbox -- */
class lilightbox{
    constructor(sel) {
        document.querySelectorAll(sel).forEach(t=>{
            const cont = `
                <div class="lilightbox">
                    <button type="button" class="lilightbox-close">×</button>
                    <img src="${t.rel}">
                </div>
            `;
            const liw = new liwindow(cont);
            liw.container.querySelector('.lilightbox-close').addEventListener('click', liw.hide);
            t.addEventListener("click", e=>{
                e.preventDefault();
                liw.show();
            });
        });
    }
}