let employeelist = [];
$(document).ready(function () {
    $("#submit").click(function () {
        let newid = $("#employee_id").val();
        const employee = {
            employeename: $("#employeename").val(),
            mobileno: $("#mobileno").val(),
            email: $("#email").val(),
            address: $("#address").val(),
            newid: $("#employee_id").val(),
        }
        if (newid != '') {
            updateEmployeetoapi(employee)
        } else {

            $.ajax({
                url: "https://62ff37cc34344b6431f4aeda.mockapi.io/workers",
                method: "post",
                dataType: "json",
                data: employee,
                success: function (result) {
                    employeelist.push(result);
                    onloadfromAPI();
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    })

})
function addRowtoTable(employee) {
    const row = "<tr><td>" + employee.employeename + "</td><td>" + employee.mobileno + "</td><td>"
        + employee.email + "</td><td>" + employee.address + "</td><td> <button type='button'>Edit</button></td><td> <button type='button'>Delete</button></td></tr>";
    $("#tbody").append(row)
}
function updateTabletoapi(employeelist) {
    $("#tbody").html('');
    for (let i = 0; i < employeelist.length; i++) {
        const row = "<tr><td>" + employeelist[i].employeename + "</td><td>" + employeelist[i].mobileno + "</td><td>"
            + employeelist[i].email + "</td><td>" + employeelist[i].address + "</td><td> <button onclick='getEmployeetoapi(" +
            i + "," + employeelist[i].id + ")' type='button'>Edit</td><td> <button onclick='deleteRow(" +
            i + "," + employeelist[i].id + ")' type='button'>Delete </td></tr>";
        $("#tbody").append(row)

    }
    console.log(employeelist)
}
function onloadfromAPI() {
    $.ajax({
        url: "https://62ff37cc34344b6431f4aeda.mockapi.io/workers",
        method: "get",
        dataType: "json",
        success: function (result) {
            updateTabletoapi(result)
        },
        error: function (error) {
            console.log(error);
        },
    });
}
function deleteRow(index, employee_id) {
    $.ajax({
        url: "https://62ff37cc34344b6431f4aeda.mockapi.io/workers/" + employee_id,
        method: "delete",
        dataType: "json",
        success: function (result) {
            employeelist.splice(index, 1);
            console.log(employeelist);
            onloadfromAPI();
        },
        error: function (error) {
            console.log(error);
        },
    });
}
function getEmployeetoapi(index, newid) {
    $.ajax({
        url: "https://62ff37cc34344b6431f4aeda.mockapi.io/workers/" + newid,
        method: "get",
        dataType: "json",
        success: function (result) {
            $("#employee_id").val(result.id);
            $("#employeename").val(result.employeename);

        },
        error: function (error) {
            console.log(error);
        },
    });
}
function updateEmployeetoapi(employee) {
    $.ajax({
        url: "https://62ff37cc34344b6431f4aeda.mockapi.io/workers/" + employee.id,
        method: "put",
        data: employee,
        dataType: "json",
        success: function (result) {
            employeelist.push(result);
            onloadfromAPI(employeelist);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

onloadfromAPI();