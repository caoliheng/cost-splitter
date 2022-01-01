function main(){ // generic main
    console.log("main()");
}

main();

// window.onbeforeunload = function() { return "Data will be lost if you leave the page, are you sure?"; };// gives warning before reloading or leaving site

function onButton(){ // button function
    console.log("button pressed!");
    
    var table = document.getElementById("table"); // get the table

    var new_row = table.insertRow(-1); // append row
    
    var new_item = new_row.insertCell(-1); // append cell
    var new_cost = new_row.insertCell(-1); // append cell
    var new_split = new_row.insertCell(-1);

    new_item.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_item.contentEditable = true;

    new_cost.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_cost.contentEditable = true;

    new_split.innerHTML = Math.floor(Math.random() * 10); // give random data
    new_split.contentEditable = true;
}