let eventList; // object to store all events
let currDate = new Date();
let month = new Month(currDate.getFullYear(), currDate.getMonth());
let navYear = currDate.getFullYear();


const monthsOfYear = {
	0 : "January",
	1 : "February",
	2 : "March",
	3 : "April",
	4 : "May",
	5 : "June", 
	6 : "July",
	7 : "August",
	8 : "September",
	9 : "October",
	10: "November",
	11: "December"
};


function fill(){
	document.querySelector('#curMonth').innerHTML = monthsOfYear[month.month] + ", " + month.year;

	let fir = month.getDateObject(1);


	let weeks = month.getWeeks();
	let days = weeks[0].getDates();
	let rows = document.querySelector('#caltable').querySelectorAll('tr');
	for (let i = 1; i < 7; i++){
		rows[i].innerHTML = "";
	}

	// Load previous month in gray
	for (let i = 0; i < 7; i++){
		if (days[i].valueOf() === fir.valueOf()){
			break;
		}
		let dat = days[i].getDate();
		rows[1].innerHTML += "<td id = 'p" + dat + "'>" + dat 
			+ "<div class = 'list'></div></td>";

		rows[1].lastChild.style.color = "rgb(150,150,150)";
	}


	// Load current month
	let nex = month.nextMonth().getDateObject(0);
	let j = 1;
	for (let i = fir.getDate(); month.getDateObject(i).valueOf() <= nex.valueOf(); i++){
	
		if ((month.getDateObject(i).getDay())% 7 == 0){
			if (i != fir.getDate()){
				j++;
			}
			
		}

		let dat = month.getDateObject(i).getDate();
		rows[j].innerHTML += "<td id ='d" + dat + "'>" + dat 
			+ "<div class = 'list'></div></td>";

	}

	// load next month in gray
	for (let i = nex.getDay() + 1; i < 7; i++){
		let dat = i - nex.getDay();
		rows[j].innerHTML += "<td id = 'n" + dat + "'>" + dat 
			+ "<div class = 'list'></div></td>";

		rows[j].lastChild.style.color = "rgb(150,150,150)";
	}
}

function populate(){

	// THIS NEEDS FIXING. DOESNT TRIGGER ADDCELLLISTENERS WHERE THERE ARE NO EVENTS
	// get the monthy object to match the data in the json object

	if (eventList === undefined || eventList === null){
		return;
	}
	let dates = document.querySelector('#caltable').querySelectorAll('td');

	dates.forEach(cell => {
		let m = new Month(month.year, month.month);
		let type = cell.id[0];
		if (type == 'p'){
			m = m.prevMonth();
		}
		else if (type == 'n'){
			m = m.nextMonth();
		}

		let monthy = (m.month+1) + '-' + m.year;
		if (m.month < 9){
			monthy = '0' + monthy;
		}
		let date = cell.id.substring(1, cell.id.length);
		let cellin = cell.querySelector('div');

		if (eventList[monthy] !== undefined && eventList[monthy][date] !== undefined){
			const entries = Object.entries(eventList[monthy][date]);

			for (const [id, object] of entries){
				if (document.querySelector('input[id="' + object.tag + '"]').checked){
					cellin.innerHTML += " <span";
					if (type == 'd'){
						cellin.innerHTML += " class = '" + object.tag + "'";
					}
					cellin.innerHTML += ">&bull; " + object.startTime.substring(0, object.startTime.length - 3) + ": " + object.title + "</span><br>"; 
				}
			}
		}
	});
	addCellListeners();




	// let monthy = (month.month+1) + "-" + month.year;
	// if (month.month + 1 < 10){
	// 	monthy = '0' + monthy;
	// }

	// let flag = false;
	// let entries = null;
	// try{
	// 	entries = Object.entries(eventList[monthy]);
	// }catch(err){
	// 	flag = true;
	// }
	
	// // Add events of current month
	// if (flag) return;
	// for (const [date, day] of entries){
	// 	let id = "#d" + date;
	// 	let cell = document.querySelector(id).querySelector('div');

	// 	const ent = Object.entries(day);
	// 	for (const [index, object] of ent){
	// 		if (document.querySelector('input[id="' + object.tag + '"]').checked){
	// 			cell.innerHTML += "<span class = '" + object.tag + "'>&bull; " 
	// 				+ object.startTime.substring(0, object.startTime.length - 3) + ": " + object.title + "</span><br>"; 
	// 		}
			
	// 	}
	// }
	// addCellListeners();
	
}

function addCellListeners(){
	document.querySelector('#caltable').querySelectorAll('td').forEach(element =>{
		element.addEventListener("click", function(e){
			populateEventView(e.target);
		}, false);
		element.lastChild.addEventListener("click", function(e){
			populateEventView(e.target.parentNode);
		}, false);
	});
}

function populateEventView(e){
	if (e.nodeName !== "TD"){
		return;
	}
	document.querySelector('#view').style.display = "block";
	let id = e.id;

	let type = id[0];
	let m = new Month(month.year, month.month);
	if (type ==='n'){
		m = m.nextMonth();
	}
	else if(type === 'p'){
		m = m.prevMonth();
	}
	let dat = e.id.substring(1, e.id.length);
	
	let mformat = "" + (m.month + 1);
	if (m.month < 9){
		mformat = '0' + mformat;
	}
	let datformat = m.year +"-" + mformat +"-";
	if (dat<10){
		datformat += '0'+dat;
	}
	else{
		datformat += dat;
	}
	document.querySelector("#addevondate").date = datformat;



	document.querySelector('#view').querySelector('#currdate').innerHTML = dat +" " + monthsOfYear[m.month] + ", " + m.year;
	let monthy = mformat + "-" + m.year;
	if (eventList[monthy] === undefined || eventList[monthy][dat] === undefined){
		document.querySelector('#events').innerHTML = "There are no events on this date";
		return;
	}
	const entr = Object.entries(eventList[monthy][dat]);
	let cell = document.querySelector('#events')
	cell.innerHTML = "";
	for (const [id, object] of entr){
		if (document.querySelector('input[id="' + object.tag + '"]').checked){
			cell.innerHTML += "<div id = 'e" + object.id +
						// "description = '" + object.description + "' endtime = '" + object.endtime +
						// "' enddate = '" + object.enddate +
						"' class='evcontent " + object.tag + "'>&bull; " 
						+ object.startTime.substring(0, object.startTime.length - 3) 
						+ ": " + object.title + "<br>";
			if (object.endDate != "0000-00-00"){
				cell.innerHTML += "End Date: " + object.endDate;
			}
			if (object.endTime != "00:00:00"){
				cell.innerHTML += ", End Time: " + object.endTime.substring(0, object.endTime.length - 3);
			}
			if (object.description != ""){
				cell.innerHTML += "<br>Description: " + object.description;
			}
			cell.innerHTML += "<br><button name='editevent' class = 'button' id = 'eventList."+monthy+"."+dat+"." + id + "'> Edit</button> "
			cell.innerHTML += "<button name = 'deleteevent' class = 'button' id = 'e" + object.id + "'>Delete</button></div><br><br>";

			
		}
		cell.querySelectorAll('button[name="editevent"]').forEach(el => {
			el.addEventListener("click", function(e){
				document.querySelector('#view').style.display = "none";
				document.querySelector('#edit').style.display = "block";
				let vals = e.target.id.split('.');
				let obj = eventList[vals[1]][vals[2]][vals[3]];
				document.querySelector('input[name="editevtitle"').value = obj.title;
				let mo = monthy.split('-');
				let dateformat = mo[1] + '-' + mo[0] + '-';
				if (vals[2] < 10){
					dateformat += '0' + vals[2];
				}
				else{
					dateformat += vals[2];
				}
				document.querySelector('input[name="editdate"').value = dateformat;
				document.querySelector('input[name="edittime"').value = obj.startTime;
				document.querySelector('#editdesc').innerHTML = obj.description;
				document.querySelector('input[name="editenddate"').value = obj.endDate;
				document.querySelector('input[name="editendtime"').value = obj.endTime;
				document.querySelector('select[id="edittagg"]').value = obj.tag;
				document.querSelect('#evid').value = obj.id;

			}, false);
		});
		cell.querySelectorAll('button[name="deleteevent"]').forEach(el =>{
			el.addEventListener("click", function(e){deleteEvent(e);}, false);
		});
	}
	if (cell.innerHTML == ""){
		cell.innerHTML = "There are no events on this date for selected categories"
	}
}

// functions for navigation buttons
function incmonth(){
	month = month.nextMonth();
	fill();
	populate();
}
function decmonth(){
	month = month.prevMonth();
	fill();
	populate();
}
function next(){
	navYear++;
	document.querySelector('#y').innerHTML = navYear;
}
function prev(){
	navYear--;
	document.querySelector('#y').innerHTML = navYear;
}
function gotoMonth(event){
	month = new Month(navYear, parseInt(event.target.id.substring(1,event.target.id.size)));
	fill();
	populate();
}

function addeventprefill(e){
	document.querySelector('#view').style.display = "none";
	document.querySelector('#addevent').style.display = "block";
	document.querySelector('input[name="date"]').value = document.querySelector("#addevondate").date;
}



// event listeners
document.addEventListener("DOMContentLoaded", function(){
	document.querySelector('#y').innerHTML = navYear;
	// Check to see if a user is logged in already. If yes, reload his data
	fetch('checklog.php',{
		method: 'POST',
		headers: { 'content-type': 'application/json' }
	})
	.then(response => response.json())
	.then(res => {
		if (res.session){
			document.querySelector('#username').innerHTML = "Welcome, " + res.user + "<br>";
			document.querySelector('#userlogin').style.display = "none";
			document.querySelector('#userinfo').style.display = "block";
			document.querySelector('#status').style.display = "block"
			document.querySelector('#csrf').value = res.csrf;
			loadEvents();
		}

	}).catch(err => {console.log(err); alert("Something went wrong")});
}, false);
document.addEventListener("DOMContentLoaded", fill, false);
document.querySelector('#prevm').addEventListener("click", decmonth, false);
document.querySelector('#nextm').addEventListener("click", incmonth, false);
document.querySelector('#left').addEventListener('click', prev, false);
document.querySelector('#right').addEventListener('click', next, false);
for (let i = 0; i < 12; i++){
	let id = '#m' + i;
	document.querySelector(id).addEventListener("click", function (e) {gotoMonth(e)}, false);
}
document.querySelector('#addevondate').addEventListener("click", function(e){addeventprefill(e)}, false);

