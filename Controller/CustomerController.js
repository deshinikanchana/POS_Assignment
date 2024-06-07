let isvalid = false;
let idVal = false;
let nameVal = false;
let salVal = false;
let Custcount = $('#tblCustomers').find('tr').length;

$('#custBtn').click(function (event) {
    $('#txtCustId').focus();
    clearAllCust();
});


// ---------------------------------------------------------------------Save Customer---------------------------------------------------------------------
$('#btnAddCust').click(function (event) {

    let id=$('#txtCustId').val();
    let name = $('#txtName').val();
    let address = $('#txtAddress').val();
    let salary = $('#txtSalary').val();
    
    if((id.length > 1) & (name.length > 1)){
       
        if((idVal) & (salVal) & (nameVal)){
             isvalid =true;
         }

        if(isvalid){
        let row=saveCustomer(id,name,address,salary);
        if(row)clearAllCust();
        Custcount = Custcount+1;
        }

}else{
    alert('Fill Fields First !')
    event.preventDefault()
}
});

// ---------------------------------------------------------------------clear Fields ---------------------------------------------------------------------

$('#btnClearCust').click(function(){
    clearAllCust();
    var custText = document.getElementById('txtCustId');
    custText.disabled = false;
});

// ---------------------------------------------------------------------Get Customer Details---------------------------------------------------------------------

$('#btnGetAllCust').click(function(){
    if($('#txtCustId').val().length > 1){
    let want=searchCustomer($('#txtCustId').val());

    console.log(want);
    if (want != null){
        $("#txtCustId").val(want.getCustomerId());
        $("#txtName").val(want.getCustomerName());
        $("#txtAddress").val(want.getCustomerAddress());
        $("#txtSalary").val(want.getCustomerSalary());

        var custText = document.getElementById('txtCustId');
        custText.disabled = true;

    }else {
       alert("Customer Not Found !");
       clearAllCust();
    }
} else{
    alert('Enter a Customer Id !')
}
});

// ---------------------------------------------------------------------Update Customer---------------------------------------------------------------------

$("#btnUpdateCust").click(function () {
    let id = $("#txtCustId").val();
    let name = $("#txtName").val();
    let address = $("#txtAddress").val();
    let salary = $("#txtSalary").val();

    let option=confirm(`Do you want to Update Customer ID:${id}`);
    if (option){
        let res= updateCustomer(id, name, address, salary);
        if (res){
            alert("Customer Updated");
            var custText = document.getElementById('txtCustId');
            custText.disabled = false;
        }else{
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCust();

});

// ---------------------------------------------------------------------Delete Customer---------------------------------------------------------------------

$("#btnDeleteCust").click(function () {
    let id = $("#txtCustId").val();
    let option=confirm(`Do you want to delete ID:${id}`);

    if (option){
        let res=deleteCustomer(id);
        if (res){
            alert("Customer Deleted");
            Custcount = Custcount-1;
            var custText = document.getElementById('txtCustId');
            custText.disabled = false;
        } else{
            alert("Delete Failed")
        }
    }
    loadAllCustomerToTheTable();
    clearAllCust();
});


// ---------------------------------------------------------------------Functions---------------------------------------------------------------------


function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);

    customerTable.push(customer);// customer aded
    loadAllCustomerToTheTable();

    $('#tblCustomers>tr').click(function () {
        var custText = document.getElementById('txtCustId');
        custText.disabled = true;

        let id = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let address = $(this).children('td:eq(2)').text();
        let salary = $(this).children('td:eq(3)').text();
        
        $("#txtCustId").val(id);
        $("#txtName").val(name);
        $("#txtAddress").val(address);
        $("#txtSalary").val(salary);

    });

    return true;
}

function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomers').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerId();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();


        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomers').append(row);
    }
}

 function getAllCustomers() {
     return customerTable;
 }


function searchCustomer(id) {
    for (var i in customerTable){
        if (customerTable[i].getCustomerId()==id) return customerTable[i];
    }
    return null;
}


function isAvailableCus(id){
    for (var i in customerTable){
        if (customerTable[i].getCustomerId()==id) return true;
    }
    return false;
}


function updateCustomer(id, name, address, salary) {    
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}


function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


function clearAllCust() {
    $('#txtCustId').val('');
    $('#txtName').val('');
    $('#txtAddress').val('');
    $('#txtSalary').val('');
    $('#txtCustId').focus();
    $("#custId").text("");
    $("#custnam").text('');
    $("#custSal").text('');
    normalAll();


}

function normalAll(){
    $("#txtCustId").css('border','2px solid grey');
    $("#txtSalary").css('border','2px solid grey');
    $("#txtAddress").css('border','2px solid grey');
    $("#txtName").css('border','2px solid grey');
}


// ---------------------------------------------------------------------Validations---------------------------------------------------------------------

let cusIdReg=/^((C00-)[0-9]{2,100})/;
let cusSalReg =/^[0-9]{4,10}/;
let cusNameReg =/^[A-Z][a-z]{3,}/;

 $("#txtCustId").on('keyup',function (event){
      if (event.key=="Enter"){
          $('#txtName').focus();
      }


    if (cusIdReg.test($("#txtCustId").val())){
        $("#txtCustId").css('border','2px solid green');
        $("#custId").text("");
        let available = isAvailableCus($("#txtCustId").val());
        if(!available){
        idVal = true;
        
        }else{
            $("#custId").text("This Id Already Added");
            idVal=false;
        }
    }else{
        $("#txtCustId").css('border','2px solid red');
        $("#custId").text('Your Input Data Format is Invalid (C00-001)');
        idVal=false;
    }
 });


 $("#txtName").on('keyup',function (event){
     if (event.key=="Enter"){
         $('#txtAddress').focus();
     }

    if (cusNameReg.test($("#txtName").val())){
        $("#txtName").css('border','2px solid green');
        $("#custnam").text('');
        nameVal= true;
    }else{
        $("#txtName").css('border','2px solid red');
        $("#custnam").text('Your Input Data Format is Invalid (Abcde)');
        nameVal=false;
    }
 });

 $("#txtSalary").on('keyup',function (event){
     if (event.key=="Enter"){
         $('#btnAddCust').focus();
     }

    if (cusSalReg.test($("#txtSalary").val())){
        $("#txtSalary").css('border','2px solid green');
        $("#custSal").text(' ');
        salVal= true;
    }else{
        $("#txtSalary").css('border','2px solid red');
        $("#custSal").text('Your Input Data Format is invalid (salary > 1000)');
        salVal=false;
    }
});

$("#txtAddress").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtSalary').focus();
    }
});

$("#btnAddCust").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#btnClearCust').focus();
    }
});


$('#txtCustId,#txtName,#txtAddress,#txtSalary').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});
