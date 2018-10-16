function addEvent(){
	const title = document.querySelector("input[name='evtitle']").value;
	const date = document.querySelector("input[name='date']").value;
	const time = document.querySelector("input[name='time']").value + ":00";
	const tag = document.querySelector("select").value;


	if (title == ""){
		alert("Title cannot be empty");
		return;
	}

	// CHECK FOR EMPTINESS OF OTHER REQUIRED ELEMENTS

	let vals = date.split('-');
	let monthy = vals[1] + '-' + vals[0];
	let dateOfMonth = vals[2];



	alert(monthy + " " + dateOfMonth);







	const data = {'title' : title, 'monthy' : monthy, 'date' : dateOfMonth,
		'time' : time, 'tag' : tag, 'token' : document.querySelector("#csrf").value};
	
	fetch('addEvent.php', {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
	.then (response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector("input[name='evtitle']").value = "";
			document.querySelector("input[name='date']").value = "";
			document.querySelector("input[name='time']").value = "";
			document.querySelector('#addevent').style.display = "none";
			document.querySelector("input[name='tag']").value = "";
			
		}
		else{
			alert(resp.message);
		}
		
	}).catch(err => alert("Something went wrong. Please try again."));

}
document.querySelector("#submitevent").addEventListener("click", addEvent,false);
