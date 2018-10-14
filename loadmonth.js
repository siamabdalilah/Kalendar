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
	// if 7 rows found, remove last row
	// if (rows.length == 7){
	// 	rows[0].parentNode.removeChild(rows[0].parentNode.lastChild);
	// 	rows = document.querySelectorAll('tr');
	// }
	for (let i = 1; i < 7; i++){
		rows[i].innerHTML = "";
	}

	// Load previous month in gray
	for (let i = 0; i < 7; i++){
		if (days[i].valueOf() === fir.valueOf()){
			break;
		}

		rows[1].innerHTML += "<td>" + days[i].getDate() + "<br>";

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
				// if an extra row needed, add it
				// if (j == 6){
				// 	rows[j-1].parentNode.appendChild(document.createElement("tr"));
				// 	rows = document.querySelectorAll('tr');
				// }
			}
			
		}

		rows[j].innerHTML += "<td>" + month.getDateObject(i).getDate() + "<br>";

		// ADD EVENT HERE


		rows[j].innerHTML += "</td>";
	}

	// load next month in gray
	for (let i = nex.getDay() + 1; i < 7; i++){
		console.log(i);
		rows[j].innerHTML += "<td>" + (i - nex.getDay()) + "<br>";

		// ADD EVENTS HERE
		rows[j].innerHTML += "</td>";
		rows[j].lastChild.style.color = "rgb(150,150,150)";
	}
}

function incmonth(){
	month = month.nextMonth();
	fill();
}
function decmonth(){
	month = month.prevMonth();
	fill();
}




document.addEventListener("DOMContentLoaded", fill, false);
document.querySelector('#prevm').addEventListener("click", decmonth, false);
document.querySelector('#nextm').addEventListener("click", incmonth, false);





