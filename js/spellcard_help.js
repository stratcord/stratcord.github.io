const listClass = ["fire", "water", "wood", "metal", "earth", "sun", "moon", "star", "non", "blank"];
let specialProperty = [[], [], [], [], [], []];

function applyClass(ele, className){
	for (let name of listClass){
		if (name == className){
			ele.classList.add("ele_" + name);
		} else {
			ele.classList.remove("ele_" + name);
		}
	}
	return;
}

function cellColorListener(){
	for (let i = 1; i <= 6; i++){
		//Element
		const ele_value = document.getElementById("ele_line" + i);
		ele_value.addEventListener("change", function (){
			switch (ele_value.value) {
				case "blank":
					applyClass(document.getElementById("line" + i), "blank");
					break;
				case "noEle":
					applyClass(document.getElementById("line" + i), "non");
					break;
				case "fire":
					applyClass(document.getElementById("line" + i), "fire");
					break;
				case "water":
					applyClass(document.getElementById("line" + i), "water");
					break;
				case "wood":
					applyClass(document.getElementById("line" + i), "wood");
					break;
				case "metal":
					applyClass(document.getElementById("line" + i), "metal");
					break;
				case "earth":
					applyClass(document.getElementById("line" + i), "earth");
					break;
				case "sun":
					applyClass(document.getElementById("line" + i), "sun");
					break;
				case "moon":
					applyClass(document.getElementById("line" + i), "moon");
					break;
				case "star":
					applyClass(document.getElementById("line" + i), "star");
					break;
				default:
					break;
			}
		});
		const sp_value = document.getElementById("sp_line" + i);
		const sp_color = ["gray", "yellow", "orange", "red"];
		sp_value.addEventListener("beforeinput", function (){
			for (let j = 0; j <= 3; j++){
				if (sp_value.value == j){
					sp_value.style = "color: black; background-color: " + sp_color[j];
					sp_value.parentNode.style = "color: black; background-color: " + sp_color[j];
				}
			}
		});
	}
}

function parseTable(colBegin, colNum, ignoreRow = 0, ignoreCol = 0) {
	try {
		colBegin = Number(colBegin);
		colNum = Number(colNum);
		let textValue = document.getElementById("parsing_field").value;
		let lines = textValue.split("\n");
		lines = lines.slice(ignoreRow);
		for (let i = 1; i <= 6; i++){
			let cells = lines[i-1].split("\t");
			cells = cells.slice(ignoreCol);
			for (let val in cells) {
				if (cells[val][0] == "x" && cells[val].length < 4) cells[val] = cells[val].substr(1);
				if (cells[val].endsWith("%")){
					cells[val] = (Number(cells[val].slice(0, -1))/100).toFixed(2);
					if (cells[val].endsWith(0)) cells[val] = cells[val].slice(0, -1);
				}
			}
			for (let val in cells){
				val = Number(val);
				document.getElementById("line" + i).children[colBegin + val - 1].children[0].value = cells[val];
				if (colBegin + val - 1 == 5){
					if (cells[val] == 0) {
						document.getElementById("sp_line" + i).style = "color: black; background-color: gray";
						document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: gray";
						document.getElementById("sp_line" + i).value = 0;
					} else if (cells[val] == 1) {
						document.getElementById("sp_line" + i).style = "color: black; background-color: yellow";
						document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: yellow";
					} else if (cells[val] == 2) {
						document.getElementById("sp_line" + i).style = "color: black; background-color: orange";
						document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: orange";
					} else if (cells[val] == 3) {
						document.getElementById("sp_line" + i).style = "color: black; background-color: red";
						document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: red";
					} else {
						document.getElementById("sp_line" + i).style = "";
						document.getElementById("sp_line" + i).parentNode.style = "";
					}
				}
				if (colBegin + val - 1 == 0){
					switch (cells[val]){
						case "blank":
							applyClass(document.getElementById("line" + i), "blank");
							break;
						case "noEle":
							applyClass(document.getElementById("line" + i), "non");
							break;
						case "fire":
							applyClass(document.getElementById("line" + i), "fire");
							break;
						case "water":
							applyClass(document.getElementById("line" + i), "water");
							break;
						case "wood":
							applyClass(document.getElementById("line" + i), "wood");
							break;
						case "metal":
							applyClass(document.getElementById("line" + i), "metal");
							break;
						case "earth":
							applyClass(document.getElementById("line" + i), "earth");
							break;
						case "sun":
							applyClass(document.getElementById("line" + i), "sun");
							break;
						case "moon":
							applyClass(document.getElementById("line" + i), "moon");
							break;
						case "star":
							applyClass(document.getElementById("line" + i), "star");
							break;
						default:
							applyClass(document.getElementById("line" + i), "blank");
							break;
					}
				}
			}
		}
		document.getElementById("parse_output").innerHTML = "Success!";
	}
	catch (err) {
		document.getElementById("parse_output").innerHTML = err;
	}
}

function parseAuto(){
	let colBegin = document.getElementById("colStart").value;
	let colNum = document.getElementById("colCount").value;
	let ignoreRow = document.getElementById("rowIgnore").value;
	let ignoreCol = document.getElementById("colIgnore").value;
	if (colBegin == "") colBegin = 1;
	if (colNum == "") colNum = 1;
	if (ignoreRow == "") ignoreRow = 0;
	if (ignoreCol == "") ignoreCol = 0;
	parseTable(colBegin, colNum, ignoreRow, ignoreCol);
}

function specialParse(){
	try {
		let textValue = document.getElementById("parsing_field").value;
		let lines = textValue.split("\n");
		for (let line of lines) {
			let cells = line.split("\t");
			if (cells[0] == "Bullet") continue;
			let changedline = document.getElementById("line" + cells[0]);
			let veryImportant = cells[1].split(".");
			specialProperty[Number(cells[0]) - 1] = [];
			for (let k in veryImportant) {
				if (k > 0 && veryImportant[k].length > 0) specialProperty[Number(cells[0]) - 1].push(veryImportant[k].trim());
			}
			let importantBit = veryImportant[0];
			let a = importantBit.split(" ");
			changedline.children[9].children[0].value = a[1];
			a = a[0].split("/");
			let ele = (a[1] == "No-Element" ? "noEle" : a[1].toLowerCase());
			let yinyang = a[0];
			changedline.children[0].children[0].value = ele;
			changedline.children[4].children[0].value = yinyang;
			switch (ele){
				case "blank":
					applyClass(changedline, "blank");
					break;
				case "noEle":
					applyClass(changedline, "non");
					break;
				case "fire":
					applyClass(changedline, "fire");
					break;
				case "water":
					applyClass(changedline, "water");
					break;
				case "wood":
					applyClass(changedline, "wood");
					break;
				case "metal":
					applyClass(changedline, "metal");
					break;
				case "earth":
					applyClass(changedline, "earth");
					break;
				case "sun":
					applyClass(changedline, "sun");
					break;
				case "moon":
					applyClass(changedline, "moon");
					break;
				case "star":
					applyClass(changedline, "star");
					break;
				default:
					applyClass(changedline, "blank");
					break;
			}
		}
		document.getElementById("parse_output").innerHTML = "Success!";
	} catch (err) {
		document.getElementById("parse_output").innerHTML = err;
	}
}

let baseObj = {"id":"","name":"","target":"","awk_multiplier":[],"bullet_layout":[],"bullets":[{"id":"line1","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line2","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line3","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line4","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line5","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line6","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]}]};

function toJson(){
	let newObj = JSON.parse(JSON.stringify(baseObj));
	newObj.name = document.getElementById("spellName").value.trim();
	let lastValueSP = "0";
	let lineCount = 1;
	for (let i = 1; i <= 6; i++){
		const line = document.getElementById("line"+i);
		const ele_input = line.children[0].children[0];
		newObj.bullets[i-1].element = ele_input.options[ele_input.selectedIndex].text;
		let target = line.children[1].children[0].value.trim();
		if (target == "All") target = "AoE";
		if (target == "Solo") target = "ST";
		newObj.target = target;
		newObj.bullets[i-1].name = line.children[2].children[0].value.trim();
		newObj.bullets[i-1].amount = Number(line.children[3].children[0].value);
		newObj.bullets[i-1].atktype = line.children[4].children[0].value.trim();
		let sp = Number(line.children[5].children[0].value);
		if (sp != 0){
			if (sp == lastValueSP) {
				lineCount += 1;
			} else {
				if (sp > 1) newObj.bullet_layout.push(lineCount);
				lineCount = 1;
				lastValueSP = sp;
			}
		}
		if (i == 6 && lastValueSP != "0") newObj.bullet_layout.push(lineCount);
		newObj.bullets[i-1].pow = Number(line.children[6].children[0].value);
		newObj.bullets[i-1].acc = Number(line.children[7].children[0].value);
		newObj.bullets[i-1].crit = Number(line.children[8].children[0].value);
		newObj.bullets[i-1].bullettype = line.children[9].children[0].value.trim();
		newObj.bullets[i-1].properties = specialProperty[i-1];
	}
	document.getElementById("jsondata").value = JSON.stringify(newObj, null, 2);
	return newObj;
}

function computeLine(layoutObj, lineNum = undefined){
	try {
		if (lineNum == 1) return 0;
		let layout = layoutObj.slice();
		let curLine = 1, cur = 0;
		let fullLayout = [0, 0, 0, 0, 0, 0];
		while (curLine < 6 && layout.length > 0){
			let m = layout.shift();
			cur += 1;
			while (m > 0) {
				fullLayout[curLine] = cur;
				curLine += 1;
				if (curLine >= 6) return (typeof(lineNum) == "undefined") ? fullLayout : fullLayout[lineNum];
				m -= 1;
			}
		}
		return (typeof(lineNum) == "undefined") ? fullLayout : fullLayout[lineNum];
	} catch (err) {
		document.getElementById("parse_output").innerHTML = err;
	}
}

function jsonParse(){
	try {
		let jsonValue = document.getElementById("parsing_field").value;
		let jsonObj = JSON.parse(jsonValue);
		document.getElementById("spellName").value = jsonObj.name ?? "";
		let bul_layout = computeLine(jsonObj.bullet_layout ?? []);
		for (let i = 1; i <= 6; i++){
			let changedline = document.getElementById("line" + i);
			switch (jsonObj.bullets[i-1].element ?? ""){
				case "Traitless":
					changedline.children[0].children[0].value = "noEle";
					applyClass(changedline, "non");
					break;
				case "Fire":
					changedline.children[0].children[0].value = "fire";
					applyClass(changedline, "fire");
					break;
				case "Water":
					changedline.children[0].children[0].value = "water";
					applyClass(changedline, "water");
					break;
				case "Wood":
					changedline.children[0].children[0].value = "wood";
					applyClass(changedline, "wood");
					break;
				case "Metal":
					changedline.children[0].children[0].value = "metal";
					applyClass(changedline, "metal");
					break;
				case "Earth":
					changedline.children[0].children[0].value = "earth";
					applyClass(changedline, "earth");
					break;
				case "Sun":
					changedline.children[0].children[0].value = "sun";
					applyClass(changedline, "sun");
					break;
				case "Moon":
					changedline.children[0].children[0].value = "moon";
					applyClass(changedline, "moon");
					break;
				case "Star":
					changedline.children[0].children[0].value = "star";
					applyClass(changedline, "star");
					break;
				default:
					changedline.children[0].children[0].value = "blank";
					applyClass(changedline, "blank");
					break;
			}
			changedline.children[1].children[0].value = jsonObj.target ?? "";
			changedline.children[2].children[0].value = jsonObj.bullets[i-1].name ?? "";
			changedline.children[3].children[0].value = jsonObj.bullets[i-1].amount ?? "";
			changedline.children[4].children[0].value = jsonObj.bullets[i-1].atktype ?? "";
			changedline.children[5].children[0].value = bul_layout[i-1];
			if (bul_layout[i-1] == 0) {
				document.getElementById("sp_line" + i).style = "color: black; background-color: gray";
				document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: gray";
				document.getElementById("sp_line" + i).value = 0;
			} else if (bul_layout[i-1] == 1) {
				document.getElementById("sp_line" + i).style = "color: black; background-color: yellow";
				document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: yellow";
			} else if (bul_layout[i-1] == 2) {
				document.getElementById("sp_line" + i).style = "color: black; background-color: orange";
				document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: orange";
			} else if (bul_layout[i-1] == 3) {
				document.getElementById("sp_line" + i).style = "color: black; background-color: red";
				document.getElementById("sp_line" + i).parentNode.style = "color: black; background-color: red";
			} else {
				document.getElementById("sp_line" + i).style = "";
				document.getElementById("sp_line" + i).parentNode.style = "";
			}
			changedline.children[6].children[0].value = jsonObj.bullets[i-1].pow ?? "";
			changedline.children[7].children[0].value = jsonObj.bullets[i-1].acc ?? "";
			changedline.children[8].children[0].value = jsonObj.bullets[i-1].crit ?? "";
			changedline.children[9].children[0].value = jsonObj.bullets[i-1].bullettype ?? "";
			specialProperty[i-1] = jsonObj.bullets[i-1].properties;
		}
		document.getElementById("parse_output").innerHTML = "JSON loaded!";
	} catch (err) {
		document.getElementById("parse_output").innerHTML = err;
	}
}

cellColorListener();