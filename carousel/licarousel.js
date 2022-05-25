/*
* https://codepen.io/fdulises/pen/QWQOqmb
*/
class licarousel{

    constructor({container, selector, items, controls = false, textprev = 'Prev', textnext = 'Next'}){

        this.container = ( (typeof container) == 'string' ) ? document.querySelector(container) : container;
        this.selector = this.container.querySelector(selector);
        this.items = this.selector.querySelectorAll(items);
        this.controls = controls;
        this.textprev = textprev;
        this.textnext = textnext;

        if(controls) this.addControlsContainer();
        this.main();
        if(controls) this.addArrowControls();

    }

    addControlsContainer(){
        this.controls_container = document.createElement('div');
        this.controls_container.classList.add("licarousel_controls");
        this.container.appendChild(this.controls_container);
    }

    main(){
        for( let i = 0; i < this.items.length; i++){

            if( this.controls ){
                let ccontrol_btn = document.createElement('button');
                ccontrol_btn.setAttribute("type", "button");
                ccontrol_btn.setAttribute("data-item", i);
                ccontrol_btn.classList.add("licarousel_button");
                if( i == 0 ) ccontrol_btn.classList.add('licarousel_bntactive');
                ccontrol_btn.addEventListener('click', ()=>this.items[i].click());
                this.controls_container.appendChild(ccontrol_btn);
            }

            if( i == 0 ) this.items[0].classList.add('licarousel_active');
            this.items[i].setAttribute("data-item", i);

            this.items[i].addEventListener('click', ()=>{
                this.selector.querySelector('.licarousel_active').classList.remove('licarousel_active');
                this.controls_container.querySelector('.licarousel_bntactive').classList.remove('licarousel_bntactive');
                
                this.items[i].classList.add('licarousel_active');
                this.controls_container.querySelector(`[data-item='${i}']`).classList.add('licarousel_bntactive');

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

    addArrowControls(){
        const prevb = document.createElement('button');
        prevb.setAttribute('type', 'button');
        prevb.setAttribute('class', 'licarousel_direction licarousel_prev');
        prevb.addEventListener('click', this.prev);
        prevb.innerHTML = this.textprev;
        this.controls_container.insertBefore(prevb, this.controls_container.firstChild);

        const nextb = document.createElement('button');
        nextb.setAttribute('type', 'button');
        nextb.setAttribute('class', 'licarousel_direction licarousel_next');
        nextb.addEventListener('click', this.next);
        nextb.innerHTML = this.textnext;
        this.controls_container.appendChild(nextb);

    }

}