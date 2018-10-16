let currmonth=9; let curryear=2018;
let month = new Month(curryear, currmonth);

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
	let rows = document.querySelectorAll('tr');
	for (let i = 1; i < 7; i++){
		rows[i].innerHTML = "";
	}

	// Load previous month in gray
	for (let i = 0; i < 7; i++){
		if (days[i].valueOf() === fir.valueOf()){
			break;
		}
		let dat = days[i].getDate();
		rows[1].innerHTML += "<td id = 'p" + dat + "'>" + dat + "<br>";

		// ADD EVENTS HERE. OKAY MAYBE NOT SUCH A GOOD IDEA
		rows[1].innerHTML += "</td>";
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
		rows[j].innerHTML += "<td id ='d" + dat + "'>" + dat + "<br>";

		// ADD EVENT HERE


		rows[j].innerHTML += "</td>";
	}

	// load next month in gray
	for (let i = nex.getDay() + 1; i < 7; i++){
		let dat = i - nex.getDay();
		rows[j].innerHTML += "<td id = 'n" + dat + "'>" + dat + "<br>";

		// ADD EVENTS HERE
		rows[j].innerHTML += "</td>";
		rows[j].lastChild.style.color = "rgb(150,150,150)";
	}

	populate();
}

function incmonth(){
	month = month.nextMonth();
	fill();
}
function decmonth(){
	month = month.prevMonth();
	fill();
}

function getEventsCurrentMonth() {


	const mon = month.month;
	let s = "/\d{4}-(10|11|12|\d)-(0\d|1\d|2\d|30)";
	let match = s.group(1)+s.group(2);

}

function populate(){

	const monthy = (month.month+1) + "-" + month.year;
	const data = {'monthy' : monthy};
	
	fetch('loadEvents.php', {
		method: 'POST',
		body: JSON.stringify(data);
		headers: { 'content-type': 'application/json' }
	})
	.then(res => res.json());
	.then(response => {
		if (response.success){
			response.events.forEach((day, date) => {
				let id = "#d" + date;
				let cell = $(id);

				day.forEach(event => {
					cell.innerHTML += "&bull; " + event.startTime + ": " + event.title; 
				});
 			});
		}
	})
	.catch(err =>{alert("There was an error"); console.log(err)});
}








document.addEventListener("DOMContentLoaded", function(){
	fetch('checklog.php',{
		method: 'POST',
		headers: { 'content-type': 'application/json' }
	})
	.then(response => response.json())
	.then(res => {
		if (res.session){
			// alert("ok");
			document.querySelector('#username').innerHTML = "Welcome, " + res.user + "<br>";
			document.querySelector('#userlogin').style.display = "none";
			document.querySelector('#userinfo').style.display = "block";
			document.querySelector('#csrf').value = res.csrf;
		}

	}).catch(err => {console.log(err); alert("Something went wrong")});
}, false);
document.addEventListener("DOMContentLoaded", fill, false);
document.querySelector('#prevm').addEventListener("click", decmonth, false);
document.querySelector('#nextm').addEventListener("click", incmonth, false);





