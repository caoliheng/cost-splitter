// gives warning before reloading or leaving site
// window.onbeforeunload = function() { return "Data will be lost if you leave the page, are you sure?"; }; 

// let personDict = {};

// keeps track of the names and number of people
let people = ["Person A", "Person B", "Person C"];


function addItem(){ // button function
    let table = document.getElementById("table"); // get the table

    let new_row = table.insertRow(-1); // append row
    
    // First column is Item Name
    let new_item = new_row.insertCell(-1); // append cell
    new_item.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_item.contentEditable = true; // make this editable

    // Second Column is Item Cost
    let new_cost = new_row.insertCell(-1); // append cell
    new_cost.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_cost.contentEditable = true; // make this editable
    new_cost.className = "cost"; // give class name of cost
    new_cost.addEventListener("focusout", costUnfocus); // give function to update total price

    // Third column is the spacer for split
    let new_spacer = new_row.insertCell(-1); // append cell
    new_spacer.className = "spacer";

    for (let i = 0; i < people.length; ++i){
        // create <td/>
        let new_person = new_row.insertCell(-1);

        // create <input/> 
        var input = document.createElement("input");
        // make checkbox
        input.setAttribute('type', 'checkbox');

        // put <input/? inside <td/?
        new_person.appendChild(input);
    }


}

function costUnfocus(){
    let sum = 0; // sum of 
    let numbers = document.getElementsByClassName("cost");

    for (let i = numbers.length - 1; i != -1; --i){ // reverse is faster because .length only used once ...
        let f = parseFloat(numbers[i].textContent) // convert to float
        if (!isNaN(f)){ // ignore if NaN
            sum += f;
        }
    }
    document.getElementById("display").textContent = sum.toFixed(2); // display with precision 2

    // console.log(document.getElementById("0,0").checked);
}

function addPerson(){
    let table = document.getElementById("table");
    let header = table.rows[0];
    console.log(table.rows[0]);
}