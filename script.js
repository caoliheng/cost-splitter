// gives warning before reloading or leaving site
// window.onbeforeunload = function() { return "Data will be lost if you leave the page, are you sure?"; }; 

function addItem(){ // button function
    let table = document.getElementById("table"); // get the table

    let new_row = table.insertRow(-1); // append row
    
    let new_item = new_row.insertCell(-1); // append cell
    let new_cost = new_row.insertCell(-1); // append cell
    let new_split = new_row.insertCell(-1); // append cell

    new_item.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_item.contentEditable = true; // make this editable

    new_cost.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_cost.contentEditable = true; // make this editable
    new_cost.className = "cost"; // give class name of cost
    new_cost.addEventListener("focusout", costUnfocus); // give function to update total price

    new_split.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_split.contentEditable = true;
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

    console.log(document.getElementById("0,0").checked);
}

function addPerson(){
    let table = document.getElementById("table");
}