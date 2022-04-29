class liCalendar{

    constructor({ 
        totalMonths = 12, 
        startingYear = false, 
        startingMonth = false, 
        startingMonday = false,
        showDayNames = true,
        showMonthInfo = true,
        dayNames = ['d','l','m','m','j','v','s'],
        monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    }){
        this.actualDate = new Date;

        this.dayNames = dayNames;
        this.monthNames = monthNames;
        this.totalMonths = totalMonths;
        this.startingYear = startingYear ? startingYear : this.actualDate.getFullYear();
        this.startingMonth = startingMonth ? startingMonth : this.actualDate.getMonth()+1;
        this.startingMonday = startingMonday;
        this.showDayNames = showDayNames;
        this.showMonthInfo = showMonthInfo;

        this.mainCalendar = this.yearConstruction(totalMonths);
        this.dayNumberInsert();

        this.today = `${this.actualDate.getFullYear()}-${this.actualDate.getMonth()+1}-${this.actualDate.getDate()}`;
        const todayEl = this.mainCalendar.querySelector("[data-lidate='" + this.today + "']");
        if(todayEl) todayEl.classList.add("liday-today");
    }

    monthConstruction(){
        const month = document.createElement('table');

        for( let i=0; i<6; i++ ){
            const week = document.createElement('tr');
            for( let j=0; j<7; j++ ){
                const day = document.createElement('td');
                week.appendChild(day);
            }
            month.appendChild(week);
        }

        return month;
    }

    yearConstruction(months){
        const yearTable = document.createElement('div');
        yearTable.classList.add('liyeartable');
        
        for( let i=0; i<months; i++ ){
            const month = document.createElement('div');
            month.classList.add('limonth');
            month.appendChild(this.monthConstruction());
            yearTable.appendChild(month);
        }

        return yearTable;
    }

    dayNumberInsert(){
        const monthList = this.mainCalendar.querySelectorAll('.limonth');

        let actualMonth = this.startingMonth-1;
        let actualYear = this.startingYear;

        for( let i = 0; i < this.totalMonths; i++){

            if( actualMonth == 12 ){
                actualMonth = 0;
                actualYear++;
            }

            const dayList = monthList[i].querySelectorAll('td');

            const lastDayOfMonth = this.lastDayOfMonth(actualYear, actualMonth);
            let dayOfWeek = this.dayOfWeek(actualYear, actualMonth);

            if( this.startingMonday ) dayOfWeek--;
            if( dayOfWeek == -1 ) dayOfWeek = 6;

            for( let j = 0+dayOfWeek; j < lastDayOfMonth+dayOfWeek; j++){
                dayList[j].innerHTML = j+1-dayOfWeek;
                dayList[j].setAttribute('data-liday', j+1-dayOfWeek);
                dayList[j].setAttribute('data-limonth', actualMonth+1);
                dayList[j].setAttribute('data-liyear', actualYear);
                dayList[j].setAttribute('data-lidate', `${actualYear}-${actualMonth+1}-${j+1-dayOfWeek}`);
            }

            monthList[i].setAttribute("data-limonth", actualMonth+1);
            monthList[i].setAttribute("data-liyear", actualYear);

            if( this.showDayNames ){
                const tableMonth = monthList[i].querySelector('table');
                tableMonth.insertBefore(this.weekDays(), tableMonth.firstChild);
            }
            
            if( this.showMonthInfo ){
                const info = document.createElement('div');
                info.setAttribute("data-limonth", actualMonth+1);
                info.setAttribute("data-liyear", actualYear);
                info.classList.add('limonth-info');
                info.innerHTML = `${this.monthNames[actualMonth]} ${actualYear}`;
                monthList[i].insertBefore(info, monthList[i].firstChild);
            }

            actualMonth++;
        }
    }

    lastDayOfMonth(year, month){
        const date = new Date(year, month + 1, 1);
        const d = new Date(date - 1);
        return d.getDate();
    }

    dayOfWeek(year, month){
        const date = new Date(year, month, 1);
        return date.getDay();
    }

    weekDays(){
        const lidays = document.createElement('tr');
        lidays.classList.add('lidays');

        let liDaysList = this.dayNames.slice();

        if( this.startingMonday ) liDaysList.push(liDaysList.splice(0, 1)[0]);

        for( let i = 0; i < liDaysList.length; i++ ){
            const day = document.createElement('td');
            day.innerHTML = liDaysList[i];
            lidays.appendChild(day);
        }

        return lidays;
    }
}

class liDatePicker{
    constructor({calendar, inputStart, inputEnd, allowPastSelection = true, allowTodaySelection = true}){

        this.todayInt = new Date(calendar.today.replace(/-/g, "/")).getTime();
        this.calendar = calendar.mainCalendar;
        this.inputStart = document.querySelector(inputStart);
        this.inputEnd = document.querySelector(inputEnd);
        this.calendardays = this.calendar.querySelectorAll('[data-lidate]');

        for( let i = 0; i < this.calendardays.length; i++){
            let dayTime = new Date(this.calendardays[i].getAttribute('data-lidate').replace(/-/g, "/")).getTime();

            let isPast = dayTime < this.todayInt;
            let isToday = dayTime == this.todayInt;
            let isFuture = dayTime > this.todayInt;

            let shouldSelectToday = allowTodaySelection && isToday;
            let shouldSelectPast = allowPastSelection && isPast;

            if( isFuture || shouldSelectToday || shouldSelectPast ){
                this.calendardays[i].addEventListener("click", ()=>{
                    this.daySelect(this.calendardays[i]);
                    this.inputSetValues(this.inputStart, this.inputEnd);
                    this.highlightSelection();
                });
            }
        }
    }

    daySelect = (item)=>{
        // Resaltar día seleccionado al hacer click
        item.classList.toggle("liday-selected");

        // Limitar la selección a solo dos elementos
        let selected = this.calendar.querySelectorAll('.liday-selected');
        if (selected.length > 2) {
            for (let j = 0; j < selected.length; j++) selected[j].classList.remove("liday-selected");
            item.classList.add("liday-selected");
        }
    }

    inputSetValues = (inputStart, inputEnd)=>{
        const selected = this.calendar.querySelectorAll('.liday-selected');
        // Enviar días seleccionados a inputs
        if (0 == selected.length) {
            inputStart.value = "";
            inputEnd.value = "";
        } else if (1 == selected.length) {
            inputStart.value = selected[0].getAttribute('data-lidate');
            inputEnd.value = selected[0].getAttribute('data-lidate');
        } else if (2 == selected.length) {
            inputStart.value = selected[0].getAttribute('data-lidate');
            inputEnd.value = selected[1].getAttribute('data-lidate');
        }
    }

    highlightSelection = ()=>{
        const selected = this.calendar.querySelectorAll('.liday-selected');
        // Resaltar días entre la selección de dos fechas
        let activeSelection = false;
        for (let j = 0; j < this.calendardays.length; j++) {
            if (this.calendardays[j].getAttribute('data-lidate') == this.inputStart.value) {
                activeSelection = true;
            }

            if (activeSelection && 2 == selected.length) this.calendardays[j].classList.add('liday-between-sel');
            else this.calendardays[j].classList.remove('liday-between-sel');

            if (this.calendardays[j].getAttribute('data-lidate') == this.inputEnd.value) {
                activeSelection = false;
            }
        }
    }
}