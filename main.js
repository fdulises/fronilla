class mblightbox{
    constructor(args){
        this.screen = document.createElement('div');
        this.screen.setAttribute('class', 'mlb-screen mlb-hide');
        if (args != null) addContent(args);
        this.screen.addEventListener('click', () => {
            this.hide();
        });
        document.body.appendChild(this.screen);
    }

    show(){
        this.screen.classList.remove('mlb-hide');
    }

    hide(){
        /*setTimeout(function () {
            this.screen.classList.add('mlb-hide');
        }, 600);*/
        this.screen.classList.add('mlb-hide');
    }
    
    remove() {
        document.body.removeChild(this.screen);
    }

    addContent(cont){
        if (typeof cont == 'string') this.screen.innerHTML += cont;
        else this.screen.appendChild(cont);
    }
};