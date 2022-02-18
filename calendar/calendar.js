const li_is_leap = y => ( y % 400 == 0 || ( y % 4 == 0 && y % 100 != 0 ) ) ? true : false;

const li_month_d_amount = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

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

const li_days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

let fecha_1 = {
    d: 29,
    m: 2,
    y: 2024
};
let test1 = li_zeller(fecha_1);
console.log({
    fecha: `${fecha_1.d}-${fecha_1.m}-${fecha_1.y}`,
    resultado: "Día de la semana cae en "+li_days[test1]
});

const licalendar_container = document.querySelector('.licalendar_container');

licalendar_container.innerHTML = li_days[test1];
licalendar_container.innerHTML = false;

licalendar_container.innerHTML = licalendar_container.innerHTML || 'Error';