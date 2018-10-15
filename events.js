function addEvent(){
	const title = document.querySelector("input[name='evtitle']").value;
	const time = document.querySelector("input[name='date']").value + " " + document.querySelector("input[name='time']") + ":00";
	const tag = document.querySelector("input[name='tag']").value;

	const data = {'eventTitle' : title, 'eventTime' : time, 'eventTag' : tag}

	fetch("addEvent.php", {
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
			document.querySelector("input[name='tag']").value = "";
			
		}
		else{
			alert(resp.message);
		}
		
	}).catch(err => alert("Something went wrong. Please try again."));

}
document.querySelector("#submitevent").addEventListener("click", addEvent,false);
