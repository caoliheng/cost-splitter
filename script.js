// gives warning before reloading or leaving site
// window.onbeforeunload = function() { return "Data will be lost if you leave the page, are you sure?"; }; 

function onButton(){ // button function
    var table = document.getElementById("table"); // get the table

    var new_row = table.insertRow(-1); // append row
    
    var new_item = new_row.insertCell(-1); // append cell
    var new_cost = new_row.insertCell(-1); // append cell
    var new_split = new_row.insertCell(-1); // append cell

    new_item.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_item.contentEditable = true; // make this editable

    new_cost.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_cost.contentEditable = true; // make this editable
    new_cost.className = "cost"; // give class name of cost
    new_cost.addEventListener("focusout", unfocus); // give function to update total price

    new_split.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_split.contentEditable = true;
}

function unfocus(){
    var sum = 0; // sum of 
    var numbers = document.getElementsByClassName("cost");

    for (var i = numbers.length - 1; i != -1; --i){ // reverse is faster because .length only used once ...
        var f = parseFloat(numbers[i].textContent)
        if (f != NaN){
            sum += f;
        }
    }
    document.getElementById("display").innerHTML = sum.toFixed(2);
}