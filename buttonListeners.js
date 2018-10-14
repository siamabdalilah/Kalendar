function showreg(){
	document.querySelector('.modal').style.display = "block";
}
function cancelreg(){
	document.querySelector('.modal').style.display = "none";
}





















document.querySelector('#reg').addEventListener("click", showreg, false);
document.querySelector('#cancel').addEventListener("click", cancelreg, false);