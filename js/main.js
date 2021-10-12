let
targ = 0,
owners = {
    John: 30,
    Jack: 20,
    Mo: 10,
    Newbie: 0
},
totUnits = 0,
totPerc = 0,
table = `<table>
 <tr>
   <th>Name</th>
   <th>Units</th>
   <th>Percentage</th>
 </tr>`,
rangeInput = document.querySelector('input[type="range"]');

//update slider - two versions
//let rangeValue = function () {
//or

let rangeValue = () => {
  let newValue = rangeInput.value;
   target = document.querySelector('.value');
    prompt = "New shares for Newbie: "
        target.innerHTML = ""
        target.innerHTML = prompt + " " + newValue;
}
//then either use addEventListner
rangeInput.addEventListener("input", rangeValue);
/*
//or onchange
rangeValue()
rangeInput.onchange = rangeValue;
*/


//set the base table
for (let value of Object.values(owners)) {
    totUnits += value;
}

for (const[key, value]of Object.entries(owners)) {
    perc = value / totUnits;
    totPerc += perc;

    table += `<tr>
           <td>${key}</td>
           <td style="text-align:right">${value}</td>
           <td style="text-align:right">${Math.round(perc * 100)}%</td>
		   </tr>`;
}
table += `<tr>
           <td>Total</td>
           <td style="text-align:right">${totUnits}</td>
           <td style="text-align:right">${Math.round(totPerc * 100)}%</td>
		   </tr>
		   </table>`;

document.getElementById("guys").innerHTML = table;

//manipulate table

let tab = document.querySelector("table"),
	newbieRow = tab.rows[tab.rows.length - 2],
	totRow = tab.rows[tab.rows.length - 1];
	
newbieRow.cells[2].style.backgroundColor="lightgreen";
totRow.style.fontWeight ="bold";

rangeInput.addEventListener("input", function () {    
    targ = parseFloat(rangeInput.value);
    prevUnits = newbieRow.cells[1].innerHTML;
    totUnits = totUnits - prevUnits + targ;
    newbieRow.cells[1].innerHTML = targ;
    totRow.cells[1].innerHTML = totUnits;

    //recalc precentages - note: start w/ i=1 (not i=0) to skip headers row
    for (let i = 1; i < tab.rows.length; i++) {
        newPerc = tab.rows[i].cells[1].innerText / totUnits;
        tab.rows[i].cells[2].innerText = `${(newPerc * 100).toFixed(2)}%`;
    }
});
