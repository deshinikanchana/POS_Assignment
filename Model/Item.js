function ItemDTO(itemCode,name,qty,price) {
    var itemCode=itemCode;
    var name=name;
    var qty=qty;
    var price=price;

    this.getItemCode=function () {
        return itemCode;
    }
    this.getItemName=function () {
        return name;
    }
    this.getItemQty=function () {
        return qty;
    }
    this.getItemPrice=function () {
        return price;
    }


    this.setItemCode=function (newCode) {
        itemCode=newCode;
    }
    this.setItemName=function (newName) {
        name=newName;
    }
    this.setItemQty=function (newQty) {
        qty=newQty;
    }
    this.setItemPrice=function (newPrice) {
        price=newPrice;
    }
}