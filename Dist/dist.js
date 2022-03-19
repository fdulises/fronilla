function selection_each( sel, func, data ){
	const selection = document.querySelectorAll(sel);
	for( let i = 0; i<selection.length; i++ ) func(selection[i], data);
}

function amount_add( objective, amount ){
    let value = amount + parseInt(objective.value);
    if( value < 0 ) value = 0;
    objective.value = value;
}

function amount_data_add(amount){
	let value = amount + dist_data[dist_type][dist_data_id].adl;
	if( value < 0 ) value = 0;
	dist_data[dist_type][dist_data_id].adl = value;
}

function dist_data_reaction( efect ){
	efect();
	dist_zone_obj.value = JSON.stringify(dist_data);
}

const dist_data = {
	apartamento: [],
	estudio: []
};

const dist_cont = document.querySelector('#dist_cont');
const dist_zone_obj = document.querySelector('#dist_zone_obj');
const addEstudio = document.querySelector('#addEstudio');
const addApartamento = document.querySelector('#addApartamento');

const dist_estudio_total = document.querySelector('.dist_zone.dist_estudio');
const dist_apartamento_total = document.querySelector('.dist_zone.dist_apartamento');


function add_dist_zones(type){
	const dist_type = type;
	
	const dist_data_root = dist_data[dist_type] ?? nul;
	if( !dist_data_root ) return;

	let dist_data_id = dist_data_root.length;

	dist_data[dist_type][dist_data_id] = {
		adl: 0,
		kid: 0
	};
	
	let item = document.createElement('div');
	item.classList.add('dist_zone_comp');
	item.innerHTML = `
		<h3><button type="button" class="dist_close">x</button> ${dist_type}</h3>
		<div class="dist_pax dist_adl">
			<div class="">Adultos</div>
			<div class="dist_control">
				<button class="dist_minus" type="button">-</button>
				<input class="dist_value" type="number" min="0" value="0" readonly>
				<button class="dist_pluss" type="button">+</button>
			</div>
		</div>
		<div class="dist_pax dist_kid">
			<div class="">Niños</div>
			<div class="dist_control">
				<button class="dist_minus" type="button">-</button>
				<input class="dist_value" type="number" min="0" value="0" readonly>
				<button class="dist_pluss" type="button">+</button>
			</div>
		</div>
	`;
	
	const dist_value_adl = item.querySelector('.dist_adl .dist_value');
	const dist_value_kid = item.querySelector('.dist_kid .dist_value');
	const dist_close = item.querySelector('.dist_close');

	item.querySelector('.dist_adl .dist_pluss').addEventListener('click', function(){
		amount_add(dist_value_adl, 1);

		dist_data_reaction(function(){
			let value = 1 + dist_data[dist_type][dist_data_id].adl;
			if( value < 0 ) value = 0;
			dist_data[dist_type][dist_data_id].adl = value;
		});
	});

	item.querySelector('.dist_adl .dist_minus').addEventListener('click', function(){
		amount_add(dist_value_adl, -1);
		
		dist_data_reaction(function(){
			let value = -1 + dist_data[dist_type][dist_data_id].adl;
			if( value < 0 ) value = 0;
			dist_data[dist_type][dist_data_id].adl = value;
		});
	});

	item.querySelector('.dist_kid .dist_pluss').addEventListener('click', function(){
		amount_add(dist_value_kid, 1);

		dist_data_reaction(function(){
			let value = 1 + dist_data[dist_type][dist_data_id].kid;
			if( value < 0 ) value = 0;
			dist_data[dist_type][dist_data_id].kid = value;
		});
	});

	item.querySelector('.dist_kid .dist_minus').addEventListener('click', function(){
		amount_add(dist_value_kid, -1);

		dist_data_reaction(function(){
			let value = -1 + dist_data[dist_type][dist_data_id].kid;
			if( value < 0 ) value = 0;
			dist_data[dist_type][dist_data_id].kid = value;
		});
	});
	
	dist_cont.appendChild(item);

	dist_close.addEventListener('click', function(){
		item.remove();
		dist_data[dist_type][dist_data_id] = [];
		dist_zone_obj.value = JSON.stringify(dist_data);
	});
}

for( let i = 0; i<dist_estudio_total.value; i++ ) add_dist_zones('estudio');
for( let i = 0; i<dist_apartamento_total.value; i++ ) add_dist_zones('apartamento');

addEstudio.addEventListener('click', ()=>add_dist_zones('estudio'));
addApartamento.addEventListener('click', ()=>add_dist_zones('apartamento'));


dist_zone_obj.value = JSON.stringify(dist_data);