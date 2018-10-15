function showreg(){
	document.querySelector('#registernewuser').style.display = "block";
}
function cancelreg(){
	document.querySelector('#registernewuser').style.display = "none";
}
function addev(){
	document.querySelector('#addevent').style.display = "block";
}
function cancelev(){
	document.querySelector('#addevent').style.display = "none";
}

function login(){
	const username = document.querySelector("#user").value;
	const password = document.querySelector("#pass").value;
	const data = {'username' : username, 'password': password};
	// document.querySelector('#username').innerHTML = "Welcome, " + username + "<br>";
	// 			document.querySelector('#userlogin').style.display = "none";
	// 			document.querySelector('#userinfo').style.display = "block";
	fetch("login.php", {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
	.then (response => response.json())
	.then(data => {
		if (data.success){
			document.querySelector("#user").value = "";
			document.querySelector("#pass").value = "";
			document.querySelector('#username').innerHTML = "Welcome, " + username + "<br>";
			document.querySelector('#userlogin').style.display = "block";
			document.querySelector('#userinfo').style.display = "none";
			fill(); //TO BE REPLACED WITH GET EVENTS
		}
		else{
			alert("Wrong Username/Password. Please try again.")
		}
	})
	.catch(err => alert("Something went wrong. Please try again."));
}
function logout(){
	// document.querySelector('#username').innerHTML = "";
	// 		document.querySelector('#userlogin').style.display = "block";
	// 		document.querySelector('#userinfo').style.display = "none";
	fetch("logout.php",{
		method: 'POST'
	})
	.then(response => response.json())
	.then(res =>{
		if (res.response){
			document.querySelector('#username').innerHTML = "";
			document.querySelector('#userlogin').style.display = "block";
			document.querySelector('#userinfo').style.display = "none";
			fill();
		}

	}) 
	.catch(err => alert("Something went wrong. Please try again."));
}


function register(){
	const user = addslashes($('input[name="reguser"]').value);
	const pass = addslashes($('input[name="regpass"]').value);
	const conf = addslashes($('input[name="regconf"]').value);

	if (!(pass === conf)){
		alert("Passwords don't match");
		return;
	}

	const data = {'username' : user, 'password' : pass};

	fetch(logout.php, {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
	})
	.then(response => response.json())
	.then(data => {
		if (resp.success){
			$('input[name="reguser"]').value = "";
			$('input[name="regpass"]').value = "";
			$('input[name="regconf"]').value = "";
			document.querySelector('#registernewuser').style.display = "none";
			document.querySelector('#username').innerHTML = "Welcome, " + username + "<br>";
			document.querySelector('#userlogin').style.display = "block";
			document.querySelector('#userinfo').style.display = "none";
			fill(); //TO BE REPLACED WITH GETEVENTS
			//ADD TOKEN
		}
		else{
			alert(resp.message);
		}
	}).catch(err => console.log(err));

}














document.querySelector('#reg').addEventListener("click", showreg, false);
document.querySelector('#cancelreg').addEventListener("click", cancelreg, false);

document.querySelector('#addev').addEventListener("click", addev, false);
document.querySelector('#cancelev').addEventListener("click", cancelev, false);
document.querySelector('#regbutton').addEventListener("click", register, false);

document.querySelector('#log').addEventListener("click", login, false);
document.querySelector('#logout').addEventListener("click", logout, false);