/* -- Slideshow -- */
class lislideshow {
    constructor({ sel, active = 0 }) {
        this.cont = document.querySelector(sel);
        this.elements = this.cont.querySelectorAll('li');
        this.length = this.elements.length;
        this.active = active;

        //Mostramos elemento activo
        this.elements[this.active].classList.add('active');
        window.addEventListener('load', e => {
            this.cont.style.height = this.cont.querySelector('.active').offsetHeight + "px";
        });
    }
    next = () => {
        this.elements[this.active].classList.remove('active');

        if (this.active < this.length - 1) this.active++;
        else this.active = 0;

        this.elements[this.active].classList.add('active');
        this.cont.style.height = this.cont.querySelector('.active').offsetHeight + "px";
    }
    prev = () => {
        this.elements[this.active].classList.remove('active');

        if (this.active > 0) this.active--;
        else this.active = this.length - 1;

        this.elements[this.active].classList.add('active');
        this.cont.style.height = this.cont.querySelector('.active').offsetHeight + "px";
    }
    //Falta agregar metodo go to
}