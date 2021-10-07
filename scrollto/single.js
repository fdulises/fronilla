//Implementar ejemplos con el efecto scrollto
window.addEventListener('load', () => {
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
    for( let i = 0; i < scrolltoelements.length; i++){
        scrolltoelements[i].addEventListener('click', function (e) {
            e.preventDefault();
            let destino = document.querySelector(this.getAttribute('href'));
            let posicion = liOffset(destino);
            liScrollTo(posicion.top, 2000, false);
        });
    }
});