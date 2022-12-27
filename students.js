var students = []

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
            students.push(data[d])
            let dataStr = `<tr>
                <td>${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
            //$(`#data-table tr:last`).after(dataStr)
        }

        console.log(students)

    });
});

// This function will pick the value from the <selet>
// and add to the table
function addToList() {
    console.log( "ready!" );
    let studentObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
    }

   

    // Clear existing items in the table
     
    $(`#studentBody`).html("")

    students.push(studentObj)
    loadData()
}


function deleteProduct(index) {
    console.log("DELETE",index)
    delete students[index]  // delete the element from array
    $('#studentBody').html("")
    loadData()
}

function loadData() {
    let allRows = ""
    let gross = 0
    for (let p in students) {
        let cellName = `<td> <img class='icon' src='icon-delete.png' style='width: 1em' onclick='deleteProduct("${p}")'> ` + students[p].name + "</td>"
        let cellEmail = `<td class="text-right">` + students[p].email + "</td>"
        let cellPhone = `<td class="text-right">` + students[p].phone + "</td>"
       
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#studentBody').html(allRows)

   

 

}

