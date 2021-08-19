window.addEventListener('DOMContentLoaded', ()=>{
    new lispa({
        selector: 'a',
        replacecont: ['main', 'title'],
        afterload: ()=>{
            document.querySelector('main').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
});