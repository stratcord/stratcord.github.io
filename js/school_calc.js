function calc_school(){
	const row = document.getElementById("schoolTable").children[1].children[0];
	let player_lvl = document.getElementById("playerLvl").value;
	let hasFood = document.getElementById("hasFood").checked;
	let foodBuffMul = 1 + (document.getElementById("wagashi").checked ? 0.05 : 0)
		+ (document.getElementById("youkanjelly").checked ? 0.1 : 0)
		+ (document.getElementById("unagilunch").checked ? 0.2 : 0);
	let finalMul = (document.getElementById("noevent").checked ? 1 : 0)
		+ (document.getElementById("x2").checked ? 2 : 0)
		+ (document.getElementById("x3").checked ? 3 : 0);

	const unitCountMul = [1, 0.9, 0.8, 0.7, 0.64];
	let expBase = (240 + player_lvl * 12) * (hasFood ? 1 : 0.2) * foodBuffMul * finalMul;

	console.log(expBase);

	for (let cell = 0; cell < unitCountMul.length; cell++){
		row.children[cell].innerHTML = (expBase * unitCountMul[cell]).toFixed(2);
		row.children[cell + 5].innerHTML = (expBase * unitCountMul[cell] / 240).toFixed(2)
	}
}