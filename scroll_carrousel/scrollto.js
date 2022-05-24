class licarousel{

    constructor({container, selector, items, controls = false}){

        this.container = ( (typeof container) == 'string' ) ? document.querySelector(container) : container;
        this.selector = this.container.querySelector(selector);
        this.items = this.selector.querySelectorAll(items);
        this.controls = controls;

        if(controls) this.addControlsContainer();
        this.main();
    }

    addControlsContainer(){
        this.controls_container = document.createElement('div');
        this.controls_container.classList.add("licarousel_controls");
        this.container.appendChild(this.controls_container);
    }

    main(){
        for( let i = 0; i < this.items.length; i++){

            if( i == 0 ) this.items[0].classList.add('licarousel_active');

            if( this.controls ){
                let ccontrol_btn = document.createElement('button');
                ccontrol_btn.addEventListener('click', ()=>this.items[i].click());
                this.controls_container.appendChild(ccontrol_btn);
            }

            this.items[i].addEventListener('click', ()=>{
                this.items[i].parentNode.querySelector('.licarousel_active').classList.remove('licarousel_active');
                this.items[i].classList.add('licarousel_active');

                let posicionx = this.items[i].getBoundingClientRect().x;
                let ancho = this.items[i].offsetWidth;
                let ancho_cont = this.selector.offsetWidth;
                let espacio = (ancho_cont - ancho)/2;

                let distancia = (this.selector.scrollLeft + posicionx)-espacio;
                this.selector.scroll({
                    left: distancia,
                    behavior: 'smooth'
                });

            }, true);
        }
    }

    prev = ()=>{
        let actual = this.selector.querySelector('.licarousel_active');
        let element = actual.previousElementSibling;
        if( element ) element.click();
        else this.items[this.items.length-1].click();
    }

    next = ()=>{
        let actual = this.selector.querySelector('.licarousel_active');
        let element = actual.nextElementSibling;
        if( element ) element.click();
        else this.items[0].click();
    }

}

//Implementar ejemplos con el efecto scrollto
window.addEventListener('load', function(){
    const mycarousel = new licarousel({
        container: '.licarousel_container', 
        selector: '.licarousel',  
        items: 'li',
        controls: true
    });
    document.querySelector('.licarousel_prev').addEventListener('click', mycarousel.prev);
    document.querySelector('.licarousel_next').addEventListener('click', mycarousel.next);
});