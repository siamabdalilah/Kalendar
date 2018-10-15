require('./calendar.min.js');

let month = 9;
let year = 2018;

let m = new Month(year, day);

console.log(m.getDateObject(0).getDay());