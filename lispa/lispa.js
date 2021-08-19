/*
* Lispa - Convert any page in a Single Page Aplicatión
* Desarrollado por ULises Rendón
* https://twitter.com/fidelulises
* Licencia de uso: https://creativecommons.org/licenses/by-nc/4.0/deed.es
*/
class lispa{
    constructor({ selector, afterload = ()=>{}, beforeload = ()=>{}, imgpreload = true, replacecont }){

        this.afterload = afterload;
        this.beforeload = beforeload;
        this.imgPreload = imgpreload;
        this.replacecont = replacecont;

        /* Detectamos Ctrl */
        this.ctrlDetect();

        /* Seleccionamos los links */
        let links = document.querySelectorAll(selector);

        /* Recorremos los links para añadirles funcionamiento */
        for( let i=0; i<links.length; i++ ){
            links[i].addEventListener("click", e => {
                
                /* Descartamos si se usa ctrl+click o si la url es la misma que la actual */
                if(
                    links[i].href != window.location && 
                    !this.isCtrl && 
                    links[i].getAttribute("target") != "_blank" 
                ){
                    e.preventDefault();
                    this.aload( links[i].href, 'push', this );
                }
            });
        }

        //Implementamos evento popstate para permitir avanzar y regresar en el historial
        window.addEventListener("popstate", data => {
            this.aload( data.state, 'pop', this );
        });
    }

    /* Detectar cuando se presiona CTRL */
    ctrlDetect = ()=>{
        this.isCtrl = false;
        document.addEventListener("keyup", function(e){if(e.which == 17) this.isCtrl = false;});
        document.addEventListener("keydown", function(e){if(e.which == 17) this.isCtrl = true;});
    }

    /* Método para carga asincrona de páginas  */
    aload(href, type, thiso){
        thiso.beforeload();
        fetch(href, {cache: "force-cache"}).then(function(response){
            if (!response.ok){
                //En caso de error al intentar cargar una página redireccionamos de forma normal
                window.location.href = href;
                throw Error(response.status);
            }
            return response.text();
        }).then(function(doc){
            //Convertimos la respuesta en nodos html para su manejo
            let parser = new DOMParser();
            doc = parser.parseFromString(doc, "text/html");

            //Remplazamos el contenido de los elementos deseados
            if( thiso.replacecont ){
                thiso.replacecont.forEach(item=>{
                    let prevcontent = document.querySelector(item);
                    let newcontent = doc.querySelector(item);
                    if( thiso.imgpreload ){
                        thiso.imgPreload(newcontent.querySelectorAll("img"), ()=>{
                            prevcontent.innerHTML = newcontent.innerHTML;
                        });
                    }else prevcontent.innerHTML = newcontent.innerHTML;
                });
            }

            //Ejecutamos el cambio de la URL
            if( type == "push" ) history.pushState(href, "", href);
            else history.popstate(href, "", href);

            //Ejecutamos callback affterLoad
            thiso.afterload();

        }).catch(function(err){console.log(err);});
    }

    /* Algoritmo para precarga de imagenes */
    imgPreload(imgNodes, callback){
        let imgs = [], counter = 0, limit = imgNodes.length;
        if( limit ){
            let incrFn = () => {
                counter++;
                if(counter >= limit) callback();
            };
            for(let i = 0; i < limit; i++){
                imgs[i] = new Image();
                imgs[i].src = imgNodes[i].getAttribute('src');
                imgs[i].onload = incrFn;
                imgs[i].onerror = incrFn;
            }
        }else callback();
    }
}