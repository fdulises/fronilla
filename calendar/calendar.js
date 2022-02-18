const licalendar_container = document.querySelector('#licalendar_container');

const liz_days = [
    "domingo", 
    "lunes", 
    "martes", 
    "miércoles", 
    "jueves", 
    "viernes",
    "sábado"
];

function lizeller({d, m, y}){

    let a = Math.floor((14-m) / 12);
    y = y - a;
    m = m + (12 * a) -2;

    return (
        d +
        y +
        Math.floor(y/4) -
        Math.floor(y/100) +
        Math.floor(y/400) +
        Math.floor((31*m)/12)
    ) % 7;
}

let fecha_1 = {
    d: 1,
    m: 2,
    y: 2022
};
let test1 = lizeller(fecha_1);
console.log({
    fecha: `${fecha_1.d}-${fecha_1.m}-${fecha_1.y}`,
    resultado: "Día de la semana cae en "+liz_days[test1]
});