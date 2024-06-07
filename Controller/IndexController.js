var navBar=document.getElementById('navbar');
var homepage=document.getElementById('home');
var customers=document.getElementById('customers');
var item=document.getElementById('item');
var order=document.getElementById('orders');

$('#homeBtn').click(function (event) {
    let customersAll = getAllCustomers();
    let ItemAll = getAllItems();
    let OrdersAll = getAllODs();
    
    document.getElementById('lblCountCust').innerHTML = customersAll.length;;
    document.getElementById('lblCountItem').innerHTML = ItemAll.length;
    document.getElementById('lblCountOrd').innerHTML = OrdersAll.length;
});




customers.style.display='none'
item.style.display='none'
order.style.display='none'

var btnHome=document.getElementById("homeBtn");
btnHome.addEventListener('click',function (){
    homepage.style.display='block';
    navBar.style.display='block';
    customers.style.display='none'
    item.style.display='none'
    order.style.display='none'
});

var btnCustomers=document.getElementById("custBtn");
btnCustomers.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='block'
    item.style.display='none'
    order.style.display='none'
});

var btnItem=document.getElementById("itemBtn");
btnItem.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='none'
    item.style.display='block'
    order.style.display='none'
});

var btnOrder=document.getElementById("orderBtn");
btnOrder.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='none'
    item.style.display='none'
    order.style.display='block'

});
