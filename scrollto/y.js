//Transformar scroll vertical en horizontal
function transformScroll(event) {
    if (!event.deltaY) return;
    event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    event.preventDefault();
}

//Implementar ejemplos con el efecto scrollto
document.addEventListener('DOMContentLoaded', function(){

    //Algoritmo Ir abajo
    document.querySelector("#btnbajar").addEventListener("click", function (e) {
        let height = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        liScrollTo(height, 2000, false);
        e.preventDefault();
    });

    //Algoritmo Ir Arriba
    document.querySelector("#btnsubir").addEventListener("click", function (e) {
        liScrollTo(0, 2000, false);
        e.preventDefault();
    });

    //Algoritmo para ir la #seccion definida en enlace
    const scrolltoelements = document.querySelectorAll('a.btnscrollto');
    for (let i = 0; i < scrolltoelements.length; i++) {
        scrolltoelements[i].addEventListener('click', function (e) {
            e.preventDefault();
            let destino = document.querySelector(this.getAttribute('href'));
            let posicion = liOffset(destino);
            liScrollTo(posicion.top, 2000, false);
        });
    }

    let verticalcont = document.querySelector('.scy');
    
    verticalcont.addEventListener('wheel', transformScroll);

    let verticalitems = verticalcont.querySelectorAll('li');
    for( let i = 0; i < verticalitems.length; i++){
        verticalitems[i].setAttribute('data-px', verticalitems[i].getBoundingClientRect().x);
        verticalitems[i].addEventListener('click', function (){
            let posicionx = this.getBoundingClientRect().x;
            let ancho = this.offsetWidth;
            let ancho_cont = verticalcont.offsetWidth;
            let espacio = (ancho_cont - ancho)/2;

            let distancia = (verticalcont.scrollLeft + posicionx)-espacio;
            verticalcont.scroll({
                left: distancia,
                behavior: 'smooth'
            });
        }, true);
    }
    
});