let isvalidate = false;
let codeVal = false;
let descVal = false;
let priceVal = false;
let qtyVal = false
let Itemcount = $('#tblItems').find('tr').length;


$('#itemBtn').click(function (event) {
    $('#txtItemCode').focus();
    loadAllItemsToTheTable();
    clearAllItems();
});


// ---------------------------------------------------------------------Save Item---------------------------------------------------------------------
$('#btnAddItem').click(function (event) {

    let code=$('#txtItemCode').val();
    let name = $('#txtItemName').val();
    let qty = $('#txtItemQty').val();
    let price = $('#txtItemPrice').val();
    
    let already = isAvailable(code);
    if(!already){
    if((code.length > 1) & (name.length > 1) & (qty.length > 1) & (price.length > 1)){

        if((codeVal) & (descVal) & (priceVal) & (qtyVal)){
            isvalidate =true;
        }
        
        if(isvalidate){
            let row=saveItem(code,name,qty,price);
            if(row){
            clearAllItems();
            loadAllItemsToTheTable();
            Itemcount = Itemcount+1;
            }
        }

    }else{
    alert('Fill Fields First !')
    event.preventDefault()
}
    }else{
        alert("This Item Id Already Added !")
    }
});
// ---------------------------------------------------------------------clear Fields ---------------------------------------------------------------------

$('#btnClearItem').click(function(){
    clearAllItems();
    var itemText = document.getElementById('txtItemCode');
    itemText.disabled = false;
});

// ---------------------------------------------------------------------Get Item Details---------------------------------------------------------------------

$('#btnGetAllItem').click(function(){
    if($('#txtItemCode').val().length > 1){
    let want=searchItem($('#txtItemCode').val());

    if (want != null){
        $("#txtItemCode").val(want.getItemCode());
        $("#txtItemName").val(want.getItemName());
        $("#txtItemQty").val(want.getItemQty());
        $("#txtItemPrice").val(want.getItemPrice());
      
        var itemText = document.getElementById('txtItemCode');
        itemText.disabled = true;

    }else {
       alert("Item Not Found !");
       clearAllItems();
    }
} else{
    alert('Enter An Item Code !')
}
});

// ---------------------------------------------------------------------Update Item---------------------------------------------------------------------

$("#btnUpdateItem").click(function () {
    let code=$('#txtItemCode').val();
    let name = $('#txtItemName').val();
    let qty = $('#txtItemQty').val();
    let price = $('#txtItemPrice').val();

    let option=confirm(`Do you want to Update Item Code:${code}`);
    if (option){
        let res= updateItem(code, name, qty, price);
        if (res){
            alert("Item Updated");
            var itemText = document.getElementById('txtItemCode');
            itemText.disabled = false;
        }else{
            alert("Update Failed");
        }
    }
    loadAllItemsToTheTable();
    clearAllItems();

});

// ---------------------------------------------------------------------Delete Item---------------------------------------------------------------------

$("#btnDeleteItem").click(function () {
    let code = $("#txtItemCode").val();
    let option=confirm(`Do you want to delete Item Code:${code}`);

    if (option){
        let res=deleteItem(code);
        if (res){
            alert("Item Deleted");
            Itemcount = Itemcount -1;
            var itemText = document.getElementById('txtItemCode');
            itemText.disabled = false;
        } else{
            alert("Delete Failed")
        }
    }
    loadAllItemsToTheTable();
    clearAllItems();
});


// ---------------------------------------------------------------------Functions---------------------------------------------------------------------


function saveItem(code,name,qty,price) {
    let item = new ItemDTO(code,name,qty,price);

    itemTable.push(item);// item added
    loadAllItemsToTheTable();

    $('#tblItems').on('click', 'tr', function(e){
        let code = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let qty = $(this).children('td:eq(2)').text();
        let price = $(this).children('td:eq(3)').text();

        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemQty").val(qty);
        $("#txtItemPrice").val(price);

        var itemText = document.getElementById('txtItemCode');
            itemText.disabled = false;
      });

    return true;
}


function loadAllItemsToTheTable() {
    let allItems = getAllItems();
    $('#tblItems').empty();
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qty = allItems[i].getItemQty();
        let price = allItems[i].getItemPrice();


        var row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblItems').append(row);
    }
}


 function getAllItems() {
     return itemTable;
 }

function searchItem(code) {
    for (var i in itemTable){
        if (itemTable[i].getItemCode()==code) 
        return itemTable[i];
    }
    return null;
}


function isAvailable(code){
    for (var i in itemTable){
        if (itemTable[i].getItemCode()==code) return true;
    }
    return false;
}


function updateItem(code,name,qty,price) {
    let item = searchItem(code);
    if (item != null) {
        item.setItemName(name)
        item.setItemQty(qty)
        item.setItemPrice(price);
        
        return true;
    } else {
        return false;
    }
}


function deleteItem(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function normal(){
    $('#txtItemCode').focus();
    $("#ICode").text("");
    $("#IName").text('');
    $("#IQty").text('');
    $("#IPrice").text('');
    $("#txtItemPrice").css('border','2px solid grey');
    $("#txtItemName").css('border','2px solid grey');
    $("#txtItemQty").css('border','2px solid grey');
    $("#txtItemCode").css('border','2px solid grey');
}

function clearAllItems() {
    $('#txtItemCode').val('');
    $('#txtItemName').val('');
    $('#txtItemQty').val('');
    $('#txtItemPrice').val('');
    $("#txtItemCode").focus();
    normal();
}

// ---------------------------------------------------------------------Validations---------------------------------------------------------------------

let itemCodeReg=/^((I00-)[0-9]{2,100})/;
let itemReg =/^-?\d+\.?\d*$/;
let itemNameReg =/^[A-Z][a-z]{3,}/;

 $("#txtItemCode").on('keyup',function (event){
      if (event.key=="Enter"){
          $('#txtItemName').focus();
      }


    if (itemCodeReg.test($("#txtItemCode").val())){
        $("#txtItemCode").css('border','2px solid green');
        $("#ICode").text("");
        let avail = isAvailable($("#txtItemCode").val());
        if(!avail){
        codeVal = true;
       
        }else{
            $("#ICode").text("This Id Already Added");
          
            codeVal=false;
        }
    }else{
        $("#txtItemCode").css('border','2px solid red');
        $("#ICode").text('Your Input Data Format is Invalid (I00-001)');
        codeVal=false;
    }
 });


 $("#txtItemName").on('keyup',function (event){
     if (event.key=="Enter"){
         $('#txtItemQty').focus();
     }

    if (itemNameReg.test($("#txtItemName").val())){
        $("#txtItemName").css('border','2px solid green');
        $("#IName").text('');
        descVal= true;
    }else{
        $("#txtItemName").css('border','2px solid red');
        $("#IName").text('Your Input Data Format is Invalid (Abcde)');
        descVal=false;
    }
 });

 $("#txtItemQty").on('keyup',function (event){
     if (event.key=="Enter"){
         $('#txtItemPrice').focus();
     }

    if (itemReg.test($("#txtItemQty").val())){
        $("#txtItemQty").css('border','2px solid green');
        $("#IQty").text(' ');
        qtyVal= true;
    }else{
        $("#txtItemQty").css('border','2px solid red');
        $("#IQty").text('Your Input Data Format is invalid (numbers only)');
        qtyVal=false;
    }
});

$("#txtItemPrice").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#btnAddItem').focus();
    }

   if (itemReg.test($("#txtItemPrice").val())){
       $("#txtItemPrice").css('border','2px solid green');
       $("#IPrice").text(' ');
       priceVal= true;
   }else{
       $("#txtItemPrice").css('border','2px solid red');
       $("#IPrice").text('Your Input Data Format is invalid (numbers only)');
       priceVal=false;
   }
});

$("#btnAddItem").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#btnClearItem').focus();
    }
});

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});
