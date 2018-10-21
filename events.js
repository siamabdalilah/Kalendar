// Functions for updating events

function addEvent(){
	// add slashes
	const title = document.querySelector("input[name='evtitle']").value;
	const date = document.querySelector("input[name='date']").value;
	const time = document.querySelector("input[name='time']").value + ":00";
	const tag = document.querySelector("select[id=tagg]").value;
	const desc = document.querySelector("#desc").innerHTML;
	const endTime = document.querySelector('#endtime').value;
	const endDate = document.querySelector('#enddate').value


	if (title == ""){
		alert("Title cannot be empty");
		return;
	}
	if (date == ""){
		alert("Invalid Date");
		return;
	}

	// CHECK FOR EMPTINESS OF OTHER REQUIRED ELEMENTS

	let vals = date.split('-');
	let monthy = vals[1] + '-' + vals[0];
	let dateOfMonth = vals[2];


	const data = {'title' : title, 'monthy' : monthy, 'date' : dateOfMonth,
		'time' : time, 'tag' : tag, 'description' : desc, 'endDate' : endDate,
		'endTime' : endTime, 'token' : document.querySelector("#csrf").value};
	
	fetch('addEvent.php', {
		method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
	.then(response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector("input[name='evtitle']").value = "";
			document.querySelector("input[name='date']").value = "";
			document.querySelector("input[name='time']").value = "";
			document.querySelector('#addevent').style.display = "none";
			
		}
		else{
			alert(resp.message);
		}
		
	})
	.then(() => {fill(); loadEvents();})
	.catch(err => console.log(err));
}

function editEvent(){
	const title = document.querySelector("input[name='evtitle']").value;
	const date = document.querySelector("input[name='date']").value;
	const time = document.querySelector("input[name='time']").value + ":00";
	const tag = document.querySelector("select").value;

	let vals = date.split('-');
	let monthy = vals[1] + '-' + vals[0];
	let dateOfMonth = vals[2];

	const data = {'title' : title, 'monthy' : monthy, 'date' : dateOfMonth,
		'time' : time, 'tag' : tag, 'token' : document.querySelector("#csrf").value};

	fetch('editEvent.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'content-type': 'application/json'}
	})
	.then(response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector("input[name='evtitle']").value = "";
			document.querySelector("input[name='date']").value = "";
			document.querySelector("input[name='time']").value = "";
			document.querySelector('#editevent').style.display = "none";
		}
		else{
			alert(resp.message);
	}
	}).catch(err => console.log(err));
}

function deleteEvent(){
	const title = document.querySelector("input[name='evtitle']").value;
	const date = document.querySelector("input[name='date']").value;
	const time = document.querySelector("input[name='time']").value + ":00";
	const tag = document.querySelector("select").value;

	let vals = date.split('-');
	let monthy = vals[1] + '-' + vals[0];
	let dateOfMonth = vals[2];

	const data = {'title' : title, 'monthy' : monthy, 'date' : dateOfMonth,
		'time' : time, 'tag' : tag, 'token' : document.querySelector("#csrf").value};

	fetch('deleteEvent.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'content-type': 'application/json'}
	})
	.then(response => response.json())
	.then(resp => {
		if (resp.success){
			document.querySelector("input[name='evtitle']").value = "";
			document.querySelector("input[name='date']").value = "";
			document.querySelector("input[name='time']").value = "";
			document.querySelector('#deleteevent').style.display = "none";
		}
		else{
			alert(resp.message);
	}
	}).catch(err => console.log(err));
}

// function populateEventView(e){
// 	let id = e.target.id;

// 	let type = id[0];
// 	let m = new Month(month.year, month.day);
// 	if (type ==='n'){
// 		m = m.prevMonth();
// 	}
// 	else if(type === 'p'){
// 		m = m.nextMonth();
// 	}

// 	let monthy = m.month + "-" + m.year;
// 	if (eventList[monthy][d] === null){
// 		// DO SOMETHING
// 		return;
// 	}
// 	const entr = Object.entries(eventList[monthy][d]);
// 	let cell = document.querySelector('#events')
// 	for (const [id, object] of entr){
// 		cell.innerHtml += "<div class='evcontent " + object.tag + "'>&bull; " 
// 					+ object.startTime.substring(0, object.startTime.length - 3) 
// 					+ ": " + object.title + "</div>"; 
// 	}
// }

document.querySelector("#submitevent").addEventListener("click", addEvent,false);
document.querySelector('#editevent').addEventListener("click", editEvent, false);
// document.querySelector("#editevent").addEventListener("click", editEvent, false);
// document.querySelector("#deleteevent").addEventListener("click". deleteEvent, false);
