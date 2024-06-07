function OrderDetailsDTO(orderId,date,cusId,total,discount,subTotal,cash,balance){

    var orderId=orderId;
    var date=date;
    var cusId=cusId;
    var total =total;
    var discount=discount;
    var subTotal=subTotal;
    var cash= cash;
    var balance=balance;

    this.getOrderId=function () {
        return orderId;
    }
    this.getDate=function(){
        return date;
    }
    this.getCusId=function(){
        return cusId;
    }
    this.getTotal = function(){
        return total;
    }
    this.getDiscount=function(){
        return discount;
    }
    this.getSubTotal=function(){
        return subTotal;
    }
    this.getCash=function(){
        return cash;
    }
    this.getBalance=function(){
        return balance;
    }

    

    this.setOrderId=function(newOId){
        orderId=newOId;
    }
    this.setDate=function(newDate){
        date=newDate;
    }
    this.setCusId=function(newCusId){
        cusId=newCusId;
    }
    this.setTotal=function(newTotal){
        total=newTotal;
    }
    this.setDiscount=function(newDiscount){
        discount=newDiscount;
    }
    this.setSubTotal= function(newSubTotal){
        subTotal=newSubTotal;
    }
    this.setCash = function(newCash){
        cash = newCash;
    }
    this.setBalance=function(newBal){
        balance = newBal;
    }
}
