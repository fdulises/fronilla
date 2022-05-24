//Implementar ejemplos con el efecto scrollto
window.addEventListener('load', function(){

    let horcont = document.querySelector('.scy');
    // horcont.addEventListener('wheel', transformScroll);

    let verticalitems = horcont.querySelectorAll('li');

    const controls_container = document.createElement('div');
    controls_container.classList.add("licarousel_controls");
    horcont.parentNode.appendChild(controls_container);

    for( let i = 0; i < verticalitems.length; i++){

        if( i == 0 ) verticalitems[0].classList.add('licarousel_active');

        let ccontrol_btn = document.createElement('button');
        ccontrol_btn.addEventListener('click', ()=>verticalitems[i].click());
        controls_container.appendChild(ccontrol_btn);

        verticalitems[i].addEventListener('click', function (){
            this.parentNode.querySelector('.licarousel_active').classList.remove('licarousel_active');
            this.classList.add('licarousel_active');

            let posicionx = this.getBoundingClientRect().x;
            let ancho = this.offsetWidth;
            let ancho_cont = horcont.offsetWidth;
            let espacio = (ancho_cont - ancho)/2;

            let distancia = (horcont.scrollLeft + posicionx)-espacio;
            horcont.scroll({
                left: distancia,
                behavior: 'smooth'
            });

        }, true);
    }

    document.querySelector('.licarousel_prev').addEventListener('click', function(){
        let actual_element = document.querySelector('.licarousel_active');
        let element = actual_element.previousElementSibling;
        if( element ) element.click();
        else verticalitems[verticalitems.length-1].click();
    });
    document.querySelector('.licarousel_next').addEventListener('click', function(){

        let actual_element = document.querySelector('.licarousel_active');
        let element = actual_element.nextElementSibling;
        if( element ) element.click();
        else verticalitems[0].click();

    });
});