// Helper para crear animaciones fluidas
let requestAnimFrame = (function () {
    return window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

// Helper para crear animaciones con aceleracion/desaceleración
function mathEaseInOutQuad(t, b, c, d) {
    t /= d / 2; if (t < 1) return c / 2 * t * t + b; t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// Hacer scroll animado hasta la posicion indicada
function liScrollTo(to, duration = 500, callback) {
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }
    function position() {
        return document.documentElement.scrollTop ||
            document.body.parentNode.scrollTop ||
            document.body.scrollTop;
    }
    let start = position();
    let change = to - start;
    let currentTime = 0;
    let increment = 20;

    function animateScroll(){
        currentTime += increment;
        move(mathEaseInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) requestAnimFrame(animateScroll);
        else {
            if (callback && typeof (callback) === 'function') callback();
        }
    }
    animateScroll();
};

//Obtener las cordenadas de un elemento con respecto al Viewport
function liOffset(el) {
    let rect = el.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

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