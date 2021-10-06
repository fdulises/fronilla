//Transformar scroll vertical en horizontal
function transformScroll(event) {
    if (!event.deltaY) return;
    event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    event.preventDefault();
}

//Implementar ejemplos con el efecto scrollto
window.addEventListener('load', () => {

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
        });
    }

    document.querySelector('#baction').addEventListener('click', function(){
        
    });
    
});