// Calcular si el año es bisiesto
function li_is_leap(y){
    return ( y % 400 == 0 || ( y % 4 == 0 && y % 100 != 0 ) ) ? true : false;
}

// Calcular día de la semana para la fecha dada 
function li_zeller({d, m, y}){
    let a = Math.floor((14-m) / 12);
    y -= a;
    m += (12 * a) -2;
    return (
        d + y +
        Math.floor(y/4) -
        Math.floor(y/100) +
        Math.floor(y/400) +
        Math.floor((31*m)/12)
    ) % 7;
}

const li_month_d_amount = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

const li_days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const licalendar_container = document.querySelector('.licalendar_container');


let fecha_1 = {
    d: 29,
    m: 2,
    y: 2024
};
const fecha_1_is_leap = li_is_leap(fecha_1.y) ? 'Bisiesto' : 'No Bisiesto';
const fecha_1_w_day = li_days[li_zeller(fecha_1)] ?? 'Error';

licalendar_container.innerHTML += `
    <div>Fecha "${fecha_1.y}-${fecha_1.m}-${fecha_1.d}" es: ${fecha_1_w_day}</div>
    <div>Año ${fecha_1_is_leap}</div>
    <hr>
`;


let fecha_2 = {
    d: 11,
    m: 7,
    y: 1994
};
const fecha_2_is_leap = li_is_leap(fecha_2.y) ? 'Bisiesto' : 'No Bisiesto';
const fecha_2_w_day = li_days[li_zeller(fecha_2)] ?? 'Error';

licalendar_container.innerHTML += `
    <div>Fecha "${fecha_2.y}-${fecha_2.m}-${fecha_2.d}" es: ${fecha_2_w_day}</div>
    <div>Año ${fecha_2_is_leap}</div>
    <hr>
`;


const today = new Date();
const fecha_3 = {
    d: today.getDate(),
    y: today.getFullYear(),
    m: today.getMonth()+1
};
const fecha_3_is_leap = li_is_leap(fecha_3.y) ? 'Bisiesto' : 'No Bisiesto';
const fecha_3_w_day = li_days[li_zeller(fecha_3)] ?? 'Error';

licalendar_container.innerHTML += `
    <div>Hoy es "${fecha_3.y}-${fecha_3.m}-${fecha_3.d}" ${fecha_3_w_day}</div>
    <div>Año ${fecha_3_is_leap}</div>
    <hr>
`;