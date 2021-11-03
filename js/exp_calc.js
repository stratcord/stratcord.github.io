let exp_val = [0];
let cur_max = 0;
let inc_per_level = 0;
let level_exp_inc_per_1 = 0;
let level_exp_inc_per_20 = 510;
let accumulated_exp = 0;

function addRow(rowNum){
	const table = document.getElementById("expTable");
	const row = table.insertRow(rowNum);
	row.id = "lvl" + rowNum;
	row.insertCell(0).innerHTML = rowNum;
	row.insertCell(1).innerHTML = exp_val[rowNum].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	row.insertCell(2).innerHTML = accumulated_exp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	accumulated_exp += exp_val[rowNum];
	row.insertCell(3).innerHTML = ((rowNum + 9) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	row.insertCell(4).innerHTML = ((rowNum + 9) * 600).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return 1;
}

function calc_exp(){
	let new_max = document.getElementById("maxLvl").value;
	if (new_max <= cur_max){
		document.getElementById("result").innerHTML = "Level " + new_max;
		document.getElementById("result").href = "#lvl" + (new_max-1);
		return exp_val[new_max];
	}

	for (let i = cur_max + 1; i <= new_max; i++){
		if (i <= 15){
			exp_val.push(20);
			cur_max++;
			addRow(i);
		} else if (i <= 20){
			exp_val.push(exp_val[cur_max] + 100);
			cur_max++;
			addRow(i);
		} else if (i <= 35){
			exp_val.push(exp_val[cur_max] + 120);
			cur_max++;
			addRow(i);
		} else if (i <= 50){
			exp_val.push(exp_val[cur_max] + 140);
			cur_max++;
			addRow(i);
		} else if (i <= 70) {
			exp_val.push(exp_val[cur_max] + Math.floor((i+1)/2)*10);
			cur_max++;
			addRow(i);
		} else {
			if ((i - 71) % 20 == 0){
				level_exp_inc_per_1 += 10;
				level_exp_inc_per_20 += 200;
				inc_per_level += level_exp_inc_per_20;
			}
			inc_per_level += level_exp_inc_per_1;
			exp_val.push(exp_val[cur_max] + inc_per_level);
			cur_max++;
			addRow(i);
		}
	}
	document.getElementById("result").innerHTML = "Level " + new_max;
	document.getElementById("result").href = "#lvl" + (new_max-1);
	return exp_val[new_max];
}