// keeps track of the names and number of people
let people = ["Person A", "Person B", "Person C"];

// updates information on a time interval
let refreshIntervalID = setInterval(updateAll, 500);

// gives warning before reloading or leaving site
window.onbeforeunload = function() { return "Data will be lost if you leave the page, are you sure?"; }; 

function addItem(){ // button function
    let table = document.getElementById("costTable"); // get the table

    let new_row = table.insertRow(-1); // append row
    
    // First column is Item Name
    let newItem = new_row.insertCell(-1); // append cell
    newItem.innerText = Math.floor(Math.random() * 10); // give random data
    newItem.contentEditable = "true"; // make this editable

    // Second Column is Item Cost
    let newCost = new_row.insertCell(-1); // append cell
    newCost.innerText = Math.floor(Math.random() * 10); // give random data
    newCost.contentEditable = "true"; // make this editable
    newCost.className = "cost"; // give class name of cost
    newCost.addEventListener("focusout", updateCost); // give function to update total price

    // Third column is the spacer for split
    let newSpacer = new_row.insertCell(-1); // append cell
    newSpacer.className = "spacer";

    for (let i = 0; i < people.length; ++i){
        let newPerson = new_row.insertCell(-1); // create <td/>
        let input = document.createElement("input");// create <input/> 
        input.setAttribute('type', 'checkbox');// make checkbox
        newPerson.appendChild(input);// put <input/> inside <td/>
    }
}

function addPerson(){
    people.push("New"); // keep track of new person

    let costTable = document.getElementById("costTable");
    let paymentTable = document.getElementById("paymentTable");

    let costPerson = document.createElement("th"); // create header
    costPerson.innerText = "New Person"; // give name of "New"
    costPerson.contentEditable = "true"; // editable 
    costPerson.addEventListener("focusout", updatePeople);
    costTable.rows[0].appendChild(costPerson);

    for (let i = 1; i < costTable.rows.length; ++i){ // go through the non header rows
        let newPerson = costTable.rows[i].insertCell(-1); // add new cell
        let newInput = document.createElement("input"); // new input
        newInput.setAttribute('type', 'checkbox'); // checkbox
        newPerson.appendChild(newInput);
    }

    let payment_person = document.createElement("th"); // create header
    paymentTable.rows[0].appendChild(payment_person);

    paymentTable.rows[1].insertCell(-1).innerText = 0;
}

function getSubtotal() {
    
}

// this function sums up all of the item costs
// this can be used as a way to check if every item/price has been entered
function updateTotalCost(){
    let sum = 0; // sum of 
    let numbers = document.getElementsByClassName("cost");

    for (let i = numbers.length - 1; i != -1; --i){ // reverse is faster because .length only used once ...
        let f = parseFloat(numbers[i].innerText) // convert to float
        if (!isNaN(f)){ // ignore if NaN
            sum += f;
        }
    }

    document.getElementById("subtotalDisplay").innerText = sum.toFixed(2);


    const adder_val = parseFloat(document.getElementById("globalAdder").innerText);
    if (!isNaN(adder_val)) {
        sum += adder_val;
    }
    
    const multiplier_val = parseFloat(document.getElementById("globalMultiplier").innerText);
    if (!isNaN(multiplier_val)) {
        sum *= multiplier_val;
    }

    document.getElementById("totalDisplay").innerText = sum.toFixed(2); // display with precision 2

    // console.log(document.getElementById("0,0").checked);
}

function updatePeople(){
    let costHeader = document.getElementById("costTable").rows[0]; // get input header
    let paymentHeader = document.getElementById("paymentTable").rows[0]; // get output header

    for (let i = 3; i < costHeader.cells.length; ++i){ // first three items are not people
        let text = costHeader.cells[i].innerText; // get the text
        people[i-3] = text; // update people array
        paymentHeader.cells[i-3].innerText = text; // update output header
    }
}

function updatePayment(){
    let costs = Array(people.length).fill(0);

    let costTable = document.getElementById("costTable");
    
    for (let row = 1; row < costTable.rows.length; ++row){
        let checks = [];
        for (let col = 0; col < people.length; ++col){
            if (costTable.rows[row].cells[col + 3].children[0].checked){
                checks.push(col);
            }
        }
        let cost = parseFloat(costTable.rows[row].cells[1].innerText);
        if (!isNaN(cost)){
            if (checks.length == 0){ // no checks means even split
                cost /= people.length;

                for (let i = 0; i < costs.length; ++i){
                    costs[i] += cost;
                }
            } else {
                cost /= checks.length;

                for (let i = 0; i < checks.length; ++i){
                    costs[checks[i]] += cost;
                }
            }
        }
    }

    let adder_val = parseFloat(document.getElementById("globalAdder").innerText);
    if (isNaN(adder_val)) {
        adder_val = 0;
    }
    
    let multiplier_val = parseFloat(document.getElementById("globalMultiplier").innerText);
    if (isNaN(multiplier_val)) {
        multiplier_val = 1;
    }

    const subtotal = parseFloat(document.getElementById("subtotalDisplay").innerText); // shouldn't be NaN

    let paymentTable = document.getElementById("paymentTable");
    for (let i = 0; i < people.length; ++i){
        const proportion_of_adder = costs[i]/subtotal * adder_val;
        const cost = multiplier_val * (costs[i] + proportion_of_adder);
        paymentTable.rows[1].cells[i].innerText = cost.toFixed(2);
    }
}

// this function updates all of them costs by updating the total cost and each person's payment
function updateCost(){
    updateTotalCost();
    updatePayment();
}

function updateAll(){
    updateCost();
    updatePeople();
}

updateAll();