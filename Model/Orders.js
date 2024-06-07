function OrderDTO(orderId,itemCode,itemName,price,qty,total){
    
    var orderId = orderId;
    var itemCode = itemCode;
    var itemName=itemName;
    var price = price;
    var qty = qty;
    var total =total;

    this.getOrderId=function(){
        return orderId;
    }

    this.getItemCode=function(){
        return itemCode;
    }

    this.getItemName=function(){
        return itemName;
    }

    this.getPrice=function(){
        return price;
    }

    this.getQty=function(){
        return qty;
    }

    this.getTotal=function(){
        return total;
    }

    this.setOrderId = function(newOId){
        orderId=newOId;
    }

    this.setItemCode = function(newItemCode){
        itemCode=   newItemCode;
    }

    this.setItemName = function(newItemName){
        itemName=   newItemName;
    }

    this.setPrice=function(newPrice){
        price= newPrice;
    }

    this.setQty = function(newQty){
        qty=newQty;
    }

    this.setTotal=function(newTotal){
        total=newTotal;
    }
}