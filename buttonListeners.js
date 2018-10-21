// Listeners for general buttons
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
		if (!resp.success){
			alert("Wrong Username/Password. Please try again.");
			return false;
		}
		else{
			document.querySelector("#user").value = "";
			document.querySelector("#pass").value = "";
			document.querySelector('#username').innerHTML = "Welcome, " + username + "<br>";
			document.querySelector('#userlogin').style.display = "none";
			document.querySelector('#status').style.display = "block"
			document.querySelector('#userinfo').style.display = "block";
			document.querySelector('#csrf').value = resp.token;
			return true;
		}
	})
	.then(flag => {
		if (flag){
			loadEvents();
		}
	})
	.catch(err => {alert("Something went wrong. Please try again."); console.log(err); return;});
}
function logout(){
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
			document.querySelector('#status').style.display = "none"
			document.querySelector('#csrf').value = "";
			eventList = null;
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
			document.querySelector('#status').style.display = "block";
			document.querySelector('#csrf').value = resp.token;
		}
		else{
			alert(resp.message);
		}
	}).catch(err => console.log(err));
}

function loadEvents(){
	fetch('loadEvents.php', {
		method: 'POST',
		headers: { 'content-type': 'application/json', 'Accept' : 'application/json'}
	})
	.then(res => res.json())
	.then(response => {
		if (response.success){
			eventList = response.events;
		}
	})
	.then(() => populate())
	.catch(err =>{alert("There was an error"); console.log(err)});
}



// Listeners for events
document.querySelector('#reg').addEventListener("click", showreg, false);
document.querySelector('#cancelreg').addEventListener("click", cancelreg, false);

document.querySelector('#addev').addEventListener("click", addev, false);
document.querySelector('#cancelev').addEventListener("click", cancelev, false);
document.querySelector('#regbutton').addEventListener("click", register, false);

document.querySelector('#log').addEventListener("click", login, false);
document.querySelector('#logout').addEventListener("click", logout, false);

document.querySelectorAll("input[type='checkbox']").forEach(element =>{
	element.addEventListener("click", function(){
		fill();
		populate();
	}, false);
});

document.querySelector('#back').addEventListener("click", function(){
	document.querySelector('#view').style.display = "none";
}, false);

document.querySelector('#canceledit').addEventListener("click", function(){
	document.querySelector('#edit').style.display = "none";
}, false);



