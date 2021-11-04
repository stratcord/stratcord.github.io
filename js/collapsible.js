function toggleCollapse(eleID){
	document.getElementById(eleID).classList.toggle("hidden");
	document.getElementById("button_"+eleID).classList.toggle("expanded");
}