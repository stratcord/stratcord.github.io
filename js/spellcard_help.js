const listClass = ["fire", "water", "wood", "metal", "earth", "sun", "moon", "star", "non", "blank"];
let specialProperty = [[], [], [], [], [], []];
const gp_target = {"self": "Self", "party": "Team", "target": "Target",
	"all": "All", "party's": "Team", "target's": "Target", "own": "Self"};
let characterScale_pre = ""; //Boost / Awk
let boost_scale_pre = [[], [], [], []];
let awk_scale_pre = [[], [], [], [], []];
let characterScale_post = ""; //Boost / Awk
let boost_scale_post = [[], [], [], []];
let awk_scale_post = [[], [], [], [], []];
let preList = [];
let postList = [];

function download(){
	toJson();
	let data = document.getElementById("jsondata").value;
	let filename = "untitled.json";
	let type = "text/json";
	let file = new Blob([data], {type: type});
	//IE Bullshit
	if (window.navigator.msSaveOrOpenBlob)
		window.navigator.msSaveOrOpenBlob(file, filename);
	else {
		//Anything else, somehow doesn't work for fucking Safari
		var downloadObj = document.createElement("a"),
			url = URL.createObjectURL(file);
		downloadObj.href = url;
		downloadObj.download = filename;
		document.body.appendChild(downloadObj);
		downloadObj.click();
		setTimeout(function() {
			document.body.removeChild(downloadObj);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

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
		document.getElementById("parse_output").innerHTML = "parseTable(): " + err;
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
		document.getElementById("parse_output").innerHTML = "specialParse(): " + err;
	}
}

let baseObj = {"id":"","name":"","target":"","awk_multiplier":[],"bullet_layout":[],"bullets":[{"id":"line1","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line2","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line3","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line4","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line5","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]},{"id":"line6","name":"","atktype":"","bullettype":"","element":"","pow":0,"crit":0,"acc":0,"amount":0,"properties":[]}]};

function toJson(){
	let newObj = JSON.parse(JSON.stringify(baseObj));
	newObj.name = document.getElementById("spellName").value.trim();
	awk_scale_pre = {"scaling":"Awakening","effects":[{"awakening": 1,"effect":[]},{"awakening": 2,"effect":[]},{"awakening": 3,"effect":[]},{"awakening": 4,"effect":[]},{"awakening": 5,"effect":[]}]};
	awk_scale_post = {"scaling":"Awakening","effects":[{"awakening": 1,"effect":[]},{"awakening": 2,"effect":[]},{"awakening": 3,"effect":[]},{"awakening": 4,"effect":[]},{"awakening": 5,"effect":[]}]};
	for (let i in preList){
		let data = toData(preList[i]);
		for (let j in data)
			awk_scale_pre.effects[j].effect.push(data[j]); 
	}
	for (let i in postList){
		let data = toData(postList[i]);
		for (let j in data)
			awk_scale_post.effects[j].effect.push(data[j]); 
	}
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
	newObj.pre = awk_scale_pre;
	newObj.post = awk_scale_post;
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
		document.getElementById("parse_output").innerHTML = "toJson(): " + err;
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
		document.getElementById("parse_output").innerHTML = "jsonParse(): " + err;
	}
}

const formatHTML = "<table class=\"displayTable seperator\" id=\"{0}{1}\"><thead></thead><tbody><tr class=\"columnLabel\"><td>Awakening</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr class=\"table_inputLine\"><td>Value</td><td><input type=\"number\" name=\"{0}{1}_value1\" id=\"{0}{1}_value1\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_value2\" id=\"{0}{1}_value2\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_value3\" id=\"{0}{1}_value3\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_value4\" id=\"{0}{1}_value4\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_value5\" id=\"{0}{1}_value5\" class=\"shortInput\"></td></tr><tr class=\"table_inputLine\"><td>Rate</td><td><input type=\"number\" name=\"{0}{1}_rate1\" id=\"{0}{1}_rate1\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_rate2\" id=\"{0}{1}_rate2\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_rate3\" id=\"{0}{1}_rate3\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_rate4\" id=\"{0}{1}_rate4\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_rate5\" id=\"{0}{1}_rate5\" class=\"shortInput\"></td></tr><tr class=\"table_inputLine\"><td>Add</td><td><input type=\"number\" name=\"{0}{1}_add1\" id=\"{0}{1}_add1\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_add2\" id=\"{0}{1}_add2\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_add3\" id=\"{0}{1}_add3\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_add4\" id=\"{0}{1}_add4\" class=\"shortInput\"></td><td><input type=\"number\" name=\"{0}{1}_add5\" id=\"{0}{1}_add5\" class=\"shortInput\"></td></tr></tbody><tfoot><tr class=\"table_inputLine\"><td colspan=\"6\" id=\"{0}{1}_effect\"></td></tr><tr class=\"table_inputLine\"><td>Duration:</td><td colspan=\"4\"><input type=\"number\" name=\"{0}{1}_duration\" id=\"{0}{1}_duration\" placeholder=\"Duration\"></td><td>turn(s)</td></tr></tfoot></table>";

function removeAllPre(){
	document.getElementById("preContainer").classList.add("hidden");
	for (let i = 0; i <= 9; i++){
		try {
			document.getElementById("pre"+i).remove();
			document.getElementById("preContainer").children[0].children[i-1].classList.add("hidden");
		} catch (err) {
			//console.log("pre", i, err);
		}
	}
}

function removeAllPost(){
	document.getElementById("postContainer").classList.add("hidden");
	for (let i = 0; i <= 9; i++){
		try {
			document.getElementById("post"+i).remove();
			document.getElementById("postContainer").children[0].children[i-1].classList.add("hidden");
		} catch (err) {
			//console.log("post", i, err);
		}
	}
}

if (!String.prototype.format) {
	String.prototype.format = function() {
		let args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

function setPre(amount){
	removeAllPre();
	preList = [];
	if (amount > 0) document.getElementById("preContainer").classList.remove("hidden");
	for (let i = 1; i <= amount; i++){
		document.getElementById("userForm").insertAdjacentHTML("beforeend", formatHTML.format("pre", i));
		document.getElementById("pre"+i+"_effect").innerHTML = "Pre"+i;
		document.getElementById("preContainer").children[0].children[i-1].classList.remove("hidden");
		document.getElementById("preContainer").children[0].children[i-1].children[0].innerHTML = "Pre"+i;
		preList.push("pre"+i);
	}
	for (let i = 0; i <= 3; i++){
		boost_scale_pre[i] = [];
		for (let j = 0; j < amount; j++){
			boost_scale_pre[i].push({});
		}
	}
	for (let i = 0; i <= 4; i++){
		awk_scale_pre[i] = [];
		for (let j = 0; j < amount; j++){
			awk_scale_pre[i].push({});
		}
	}
	characterScale_pre = "";
}

function setPost(amount){
	removeAllPost();
	postList = [];
	if (amount > 0) document.getElementById("postContainer").classList.remove("hidden");
	for (let i = 1; i <= amount; i++){
		document.getElementById("userForm").insertAdjacentHTML("beforeend", formatHTML.format("post", i));
		document.getElementById("post"+i+"_effect").innerHTML = "Post"+i;
		document.getElementById("postContainer").children[0].children[i-1].classList.remove("hidden");
		document.getElementById("postContainer").children[0].children[i-1].children[0].innerHTML = "Post"+i;
		postList.push("post"+i);
	}
	for (let i = 0; i <= 3; i++){
		boost_scale_post[i] = [];
		for (let j = 0; j < amount; j++){
			boost_scale_post[i].push({});
		}
	}
	for (let i = 0; i <= 4; i++){
		awk_scale_post[i] = [];
		for (let j = 0; j < amount; j++){
			awk_scale_post[i].push({});
		}
	}
	characterScale_post = "";
}

function parseDescription(){
	try {
		setPre(0);
		setPost(0);
		let desc = document.getElementById("parsing_field").value;
		let lines = desc.split("\n");
		if (!lines[0].startsWith("[")){
			document.getElementById("spellName").value = lines[0];
		}
		let hasPre = false, hasPost = false;
		for (line of lines){
			if (line.startsWith("[Pre-Attack]")){
				hasPre = true;
				let parseEffect = line.slice("[Pre-Attack]".length).trim().slice(0, -1);
				let effects = parseEffect.replaceAll("&", "/").split("/");
				setPre(effects.length);
				let last_target = "";
				let stats_list = [];
				let up_down = "";
				let startList = -1;
				for (let i in effects){
					effects[i] = effects[i].trim();
					if (effects[i].toLowerCase().startsWith("inflicts")){
						let target = gp_target[effects[i].split("to")[1].trim().split(" ")[0]];
						let anomaly_type = effects[i].split(":")[1].trim().split(" ")[0];
						document.getElementById("pre" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " " + anomaly_type;
						document.getElementById("preContainer").children[0].children[i].children[0].innerHTML += ": " + target + " " + anomaly_type;
					} else if (effects[i].toLowerCase().startsWith("restores")){
						let target = gp_target[effects[i].split(" ")[1]];
						document.getElementById("pre" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " barrier";
						document.getElementById("preContainer").children[0].children[i].children[0].innerHTML += ": " + target + " barrier";
					} else if (effects[i].toLowerCase().startsWith("recovers")){
						let target = gp_target[effects[i].split(" ")[1]];
						document.getElementById("pre" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " hp";
						document.getElementById("preContainer").children[0].children[i].children[0].innerHTML += ": " + target + " hp";
					} else if (effects[i].toLowerCase().startsWith("heals")){
						//Kokoro when...
					} else {
						//Do the target thing
						let tokens = effects[i].split(" ");
						let target = "";
						for (let ind in tokens) tokens[ind] = tokens[ind].trim();
						if (typeof(gp_target[tokens[0].toLowerCase()]) === "undefined"){
							target = last_target;
							stats_list.push("");
							for (let token of tokens){
								if (token != "UP" && token != "DOWN")
									stats_list[stats_list.length-1] += token + " ";
							}
							stats_list[stats_list.length-1] = stats_list[stats_list.length-1].trim();
						} else {
							startList = Number(i)+1;
							stats_list = [];
							target = gp_target[tokens[0].toLowerCase()];
							last_target = target;
							stats_list.push("");
							for (let ind in tokens){
								if (ind == 0) continue;
								if (tokens[ind] != "UP" && tokens[ind] != "DOWN")
									stats_list[stats_list.length-1] += tokens[ind] + " ";
							}
							stats_list[stats_list.length-1] = stats_list[stats_list.length-1].trim();
						}
						if (tokens[tokens.length-1] == "UP" || tokens[tokens.length-1] == "DOWN"){
							up_down = tokens[tokens.length-1];
							for (let ind = startList; ind < startList + stats_list.length; ind++){
								document.getElementById("pre" + (Number(ind)) + "_effect").innerHTML += ": " + target + " " + stats_list[ind-startList];
								document.getElementById("preContainer").children[0].children[Number(ind)-1].children[0].innerHTML += ": " + target + " " + stats_list[ind-startList];
							}
						}
						last_target = target;
					}
				}
			}
			if (line.startsWith("[Post-Attack]")){
				hasPost = true;
				let parseEffect = line.slice("[Post-Attack]".length).trim().slice(0, -1);
				let effects = parseEffect.replaceAll("&", "/").split("/");
				setPost(effects.length);
				let last_target = "";
				let stats_list = [];
				let up_down = "";
				let startList = -1;
				for (let i in effects){
					effects[i] = effects[i].trim();
					if (effects[i].toLowerCase().startsWith("inflicts")){
						let target = gp_target[effects[i].split("to")[1].trim().split(" ")[0]];
						let anomaly_type = effects[i].split(":")[1].trim().split(" ")[0];
						document.getElementById("post" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " " + anomaly_type;
						document.getElementById("postContainer").children[0].children[i].children[0].innerHTML += ": " + target + " " + anomaly_type;
					} else if (effects[i].toLowerCase().startsWith("restores")){
						let target = gp_target[effects[i].split(" ")[1]];
						document.getElementById("post" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " barrier";
						document.getElementById("postContainer").children[0].children[i].children[0].innerHTML += ": " + target + " barrier";
					} else if (effects[i].toLowerCase().startsWith("recovers")){
						let target = gp_target[effects[i].split(" ")[1]];
						document.getElementById("post" + (Number(i)+1) + "_effect").innerHTML += ": " + target + " hp";
						document.getElementById("postContainer").children[0].children[i].children[0].innerHTML += ": " + target + " hp";
					} else if (effects[i].toLowerCase().startsWith("heals")){
						//Kokoro when...
					} else {
						//Do the target thing
						let tokens = effects[i].split(" ");
						let target = "";
						for (let ind in tokens) tokens[ind] = tokens[ind].trim();
						if (typeof(gp_target[tokens[0].toLowerCase()]) === "undefined"){
							target = last_target;
							stats_list.push("");
							for (let token of tokens){
								if (token != "UP" && token != "DOWN")
									stats_list[stats_list.length-1] += token + " ";
							}
							stats_list[stats_list.length-1] = stats_list[stats_list.length-1].trim();
						} else {
							startList = Number(i)+1;
							stats_list = [];
							target = gp_target[tokens[0].toLowerCase()];
							last_target = target;
							stats_list.push("");
							for (let ind in tokens){
								if (ind == 0) continue;
								if (tokens[ind] != "UP" && tokens[ind] != "DOWN")
									stats_list[stats_list.length-1] += tokens[ind] + " ";
							}
							stats_list[stats_list.length-1] = stats_list[stats_list.length-1].trim();
						}
						if (tokens[tokens.length-1] == "UP" || tokens[tokens.length-1] == "DOWN"){
							up_down = tokens[tokens.length-1];
							for (let ind = startList; ind < startList + stats_list.length; ind++){
								document.getElementById("post" + (Number(ind)) + "_effect").innerHTML += ": " + target + " " + stats_list[ind-startList];
								document.getElementById("postContainer").children[0].children[Number(ind)-1].children[0].innerHTML += ": " + target + " " + stats_list[ind-startList];
							}
						}
						last_target = target;
					}
				}
			}
		}
		document.getElementById("parse_output").innerHTML = "Success!";
	} catch (err) {
		document.getElementById("parse_output").innerHTML = "parseDescription(): " + err;
	}
}

const stat_change_schema={"Yin ATK":{"type":"Normal","value":"Yin ATK"},"Yang ATK":{"type":"Normal","value":"Yang ATK"},"Yin DEF":{"type":"Normal","value":"Yin DEF"},"Yang ATK":{"type":"Normal","value":"Yang DEF"},"Agility":{"type":"Normal","value":"Agility"},"Accuracy":{"type":"Combat","value":"Accuracy"},"Evasion":{"type":"Combat","value":"Evasion"},"CRIT ATK":{"type":"Combat","value":"CRIT ATK"},"CRIT DEF":{"type":"Combat","value":"CRIT DEF"},"CRIT Accuracy":{"type":"Combat","value":"CRIT Accuracy"},"CRIT Evasion":{"type":"Combat","value":"CRIT Evasion"},"Focus":{"type":"Combat","value":"Focus"}};
const stat_change_json={"stat":{},"target":"","value":[],"duration":0};
const inflict_anomaly_schema={"Burn":"Burn","Poison":"Poison","Freeze":"Freeze","Blind":"Blind","Paralyze":"Paralyze"};
const inflict_anomaly_json = {"anomaly":"","target":"","value":[],"duration":0};
const resource_gain_schema={"Spirit Power":"Spirit Points","hp":"HP","barrier":"Barrier"};
const resource_gain_json={"resource":"","target":"","value":0};
//heal anomaly missing lol

function parseEffect(idPrefix){
	try {
		let data = document.getElementById("parsing_field").value;
		data = data.split("\n");
		for (let row of data){
			let tokens = row.split("\t");
			if (tokens[0] != "Card Level" && tokens[0] != "1"){
				for (let i = 1; i <= 5; i++) document.getElementById(idPrefix + "_" + tokens[0].toLowerCase() + i).value = tokens[i];
			}
		}
		document.getElementById("parse_output").innerHTML = "Success!";
	} catch (err) {
		document.getElementById("parse_output").innerHTML = "parseEffect(): " + err;
	}
}

function toData(idPrefix){
	let effect_values = [];
	let effect_rates = [];
	let effect_adds = [];

	for (let i = 1; i <= 5; i++){
		effect_values.push(Number(document.getElementById(idPrefix + "_value" + i).value));
		effect_rates.push(Number(document.getElementById(idPrefix + "_rate" + i).value));
		effect_adds.push(Number(document.getElementById(idPrefix + "_add" + i).value));
	}

	let effect = document.getElementById(idPrefix + "_effect").innerHTML;
	effect = effect.split(": ")[1];

	let target = effect.split(" ")[0];
	effect = effect.substr(effect.indexOf(" ")+1);

	let duration = Number(document.getElementById(idPrefix + "_duration").value);

	if (effect_values[0] == 0 && effect_rates[0] == 0 && effect_adds[0] == 0){
		return ["Scaled with boost", "Scaled with boost", "Scaled with boost",
			"Scaled with boost", "Scaled with boost"];
	}

	// Modifying 
	if (stat_change_schema[effect]){
		let returned_effect = JSON.parse(JSON.stringify(stat_change_json));
		returned_effect.stat = stat_change_schema[effect];
		returned_effect.target = target;
		returned_effect.duration = duration;
		let allValue = [];
		for (let i = 0; i < 5; i++){
			allValue.push(JSON.parse(JSON.stringify(returned_effect)));
			if (effect_rates[i] == 0){
				allValue[i].value.push({"value": effect_values[i], "chance": 1});
			} else {
				allValue[i].value.push({"value": effect_values[i], "chance": (100 - effect_rates[i])/100});
				allValue[i].value.push({"value": effect_values[i] + effect_adds[i], "chance": effect_rates[i]/100});
			}
		}
		console.log(allValue);
		return allValue;
	} else if (inflict_anomaly_schema[effect]){
		let returned_effect = JSON.parse(JSON.stringify(inflict_anomaly_json));
		returned_effect.anomaly = inflict_anomaly_schema[effect];
		returned_effect.target = target;
		returned_effect.duration = duration;
		let allValue = [];
		for (let i = 0; i < 5; i++){
			allValue.push(JSON.parse(JSON.stringify(returned_effect)));
			if (effect_rates[i] == 0){
				allValue[i].value.push({"value": effect_values[i], "chance": 1});
			} else {
				allValue[i].value.push({"value": effect_values[i], "chance": (100 - effect_rates[i])/100});
				allValue[i].value.push({"value": effect_values[i] + effect_adds[i], "chance": effect_rates[i]/100});
			}
		}
		console.log(allValue);
		return allValue;
	} else if (resource_gain_schema[effect]){
		let returned_effect = JSON.parse(JSON.stringify(resource_gain_json));
		returned_effect.resource = resource_gain_schema[effect];
		returned_effect.target = target;
		let allValue = [];
		for (let i = 0; i < 5; i++){
			allValue.push(JSON.parse(JSON.stringify(returned_effect)));
			if (effect == "hp"){
				effect_values[i] = Number((effect_values[i]/100).toFixed(2));
			} else if (effect == "Spirit Points") {
				if (effect_values[i] > 4) effect_values[i] = Number((effect_values[i]/20).toFixed(2));
			} else if (effect == "barrier") {
			} else {
				document.getElementById("parse_output").innerHTML = "toData(): Unknown Effect.";
			}
			allValue[i].value = effect_values[i];
		}
	} else {
		document.getElementById("parse_output").innerHTML = "toData(): Unknown Effect.";
		return;
	}
}

let test_data = "";
//test_data = "Red Side: Alter Spark\n[Pre-Attack] Own Yin ATK UP.\n[Attack] Star Piercing Laser Bullet.\n[Bullet Layout] Mostly Yin.\n[Boost] Fire Own CRIT Accuracy UP Bullet/Star Own CRIT Accuracy UP Bullet/Fire Scarlet Devil Mansion-Killer Bullet.\n[Post-Attack] Inflicts Barrier Status: Burn to all targets.";

document.getElementById("parsing_field").value = test_data;

cellColorListener();