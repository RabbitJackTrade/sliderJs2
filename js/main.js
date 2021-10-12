let //start slider related
  rangeInput = document.querySelector(".range-input input"),
  rangeValue = document.querySelector(".range-input .value div"),
  start = parseFloat(rangeInput.min),
  end = parseFloat(rangeInput.max),
  step = parseFloat(rangeInput.step),
  //end slider related, start data related
  targ = 0,
  owners = { John: 30, Jack: 20, Mo: 10, Newbie: 0 },
  totUnits = 0,
  totPerc = 0,
  table = `<table border="1">
 <tr>
   <th>Name</th>
   <th>Units</th>
   <th>Percentage</th>
 </tr>`;

//set slider
for (let i = start; i <= end; i += step) {
  rangeValue.innerHTML += "<div>" + i + "</div>";
}

//set the base table
for (let value of Object.values(owners)) {
  totUnits += value;
}

for (const [key, value] of Object.entries(owners)) {
  perc = value / totUnits;
  totPerc += perc;

  table += `<tr>
           <td>${key}</td>
           <td>${value}</td>
           <td style="text-align:right">${Math.round(perc * 100)}%</td>`;
  table += `</tr>`;
}
table += `<tr>
           <td>Total</td>
           <td>${totUnits}</td>
           <td style="text-align:right">${Math.round(totPerc * 100)}%</td>`;
table += `</tr>`;
table += "</table>";

document.getElementById("guys").innerHTML = table;

//manipulate table

let tab = document.querySelector("table");
let newbieRow = tab.rows[tab.rows.length - 2];
let totRow = tab.rows[tab.rows.length - 1];
//let lastCell = newbieRow.cells[newbieRow.cells.length-1];
//let unitCell = newbieRow.cells[1];

rangeInput.addEventListener("input", function () {
  //update slider
  let top = (parseFloat(rangeInput.value) / step) * -40;
  rangeValue.style.marginTop = top + "px";
  //update table rows for newbie and total
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
