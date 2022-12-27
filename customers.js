var customers = []

$( document ).ready(function() {
    console.log( "ready!" );
    // load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE",data)
        for (let d in data){
            // save the data record into our global variable
            customers.push(data[d])
            let dataStr = `<tr>
                <td>${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
            //$(`#data-table tr:last`).after(dataStr)
        }

        console.log(customers)

    });
});

// This function will pick the value from the <selet>
// and add to the table
function addToList() {
    console.log( "ready!" );
    let customerObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
    }

   

    // Clear existing items in the table
     
    $(`#customerBody`).html("")

    customers.push(customerObj)
    loadData()
}


function deleteProduct(index) {
    console.log("DELETE",index)
    delete customers[index]  // delete the element from array
    $('#customerBody').html("")
    loadData()
}

function loadData() {
    let allRows = ""
    let gross = 0
    for (let p in customers) {
        let cellName = `<td> <img class='icon' src='icon-delete.png' style='width: 1em' onclick='deleteProduct("${p}")'> ` + customers[p].name + "</td>"
        let cellEmail = `<td class="text-right">` + customers[p].email + "</td>"
        let cellPhone = `<td class="text-right">` + customers[p].phone + "</td>"
       
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#customerBody').html(allRows)

   

 

}

