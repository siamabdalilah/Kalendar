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
	
	fetch("login.php", {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
	.then (response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector("#user").value = "";
			document.querySelector("#pass").value = "";
			document.querySelector('#username').innerHTML = "Welcome, " + username + "<br>";
			document.querySelector('#userlogin').style.display = "none";
			document.querySelector('#userinfo').style.display = "block";
			document.querySelector('#csrf').value = resp.token;
			
			populate(); //TO BE REPLACED WITH GET EVENTS
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
		method: 'POST',
		headers: { 'content-type': 'application/json' }
	})
	.then(response => response.json())
	.then(res =>{
		if (res.success){
			document.querySelector('#username').innerHTML = "";
			document.querySelector('#userlogin').style.display = "block";
			document.querySelector('#userinfo').style.display = "none";
			document.querySelector('#csrf').value = "";
			fill();
		}

	}) 
	.catch(err => alert("Something went wrong. Please try again."));
}


function register(){
	const user = document.querySelector('input[name="reguser"]').value;
	const pass = document.querySelector('input[name="regpass"]').value;
	const conf = document.querySelector('input[name="regconf"]').value;

	if (!(pass === conf)){
		alert("Passwords don't match");
		return;
	}

	const data = {'username' : user, 'password' : pass};

	fetch('register.php', {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
	})
	.then(response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector('input[name="reguser"]').value = "";
			document.querySelector('input[name="regpass"]').value = "";
			document.querySelector('input[name="regconf"]').value = "";
			document.querySelector('#registernewuser').style.display = "none";
			document.querySelector('#username').innerHTML = "Welcome, " + user + "<br>";
			document.querySelector('#userlogin').style.display = "none";
			document.querySelector('#userinfo').style.display = "block";
			document.querySelector('#csrf').value = resp.token;
			fill(); //TO BE REPLACED WITH GETEVENTS
			//ADD TOKEN
		}
		else{
			alert(resp.message);
		}
	}).catch(err => console.log(err));

}

function populate(){

	const monthy = (month.month+1) + "-" + month.year;
	const data = {'monthy' : monthy};
	
	fetch('loadEvents.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'content-type': 'application/json' }
	})
	.then(res => res.json())
	.then(response => {
		if (response.success){
			response.events.forEach((day, date) => {
				let id = "#d" + date;
				let cell = $(id);

				day.forEach(event => {
					cell.innerHTML += "&bull; " + event.startTime + ": " + event.title + "<br>"; 
				});
 			});
		}
	})
	.catch(err =>{alert("There was an error"); console.log(err)});
}










document.querySelector('#reg').addEventListener("click", showreg, false);
document.querySelector('#cancelreg').addEventListener("click", cancelreg, false);

document.querySelector('#addev').addEventListener("click", addev, false);
document.querySelector('#cancelev').addEventListener("click", cancelev, false);
document.querySelector('#regbutton').addEventListener("click", register, false);

document.querySelector('#log').addEventListener("click", login, false);
document.querySelector('#logout').addEventListener("click", logout, false);