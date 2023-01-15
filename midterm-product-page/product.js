var product = []

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
            products.push(data[d])
            let dataStr = `<tr>
                <td>${data[d].item}</td>
                <td>${data[d].price}</td>
                <td>${data[d].quantity}</td>
            </tr>`
            //$(`#data-table tr:last`).after(dataStr)
        }

        console.log(products)

    });
});

// This function will pick the value from the <selet>
// and add to the table
function addToList() {
    console.log( "ready!" );
    let productObj = {
        item: $('#item').val(),
        price: $('#priceperunit').val(),
        quantity: $('#quantity').val()
    }

   

    // Clear existing items in the table
     
    $(`#product`).html("")

    products.push(productObj)
    loadData()
}


function deleteProduct(index) {
    console.log("DELETE",index)
    delete products[index]  // delete the element from array
    $('#product').html("")
    loadData()
}

function loadData() {
    let allRows = ""
    let gross = 0
    for (let p in products) {
        let cellName = `<td> <img class='icon' src='icon-delete.png' style='width: 1em' onclick='deleteProduct("${p}")'> ` + products[p].name + "</td>"
        let cellEmail = `<td class="text-right">` + products[p].email + "</td>"
        let cellPhone = `<td class="text-right">` + products[p].phone + "</td>"
       
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#product').html(allRows)

   

 

}

