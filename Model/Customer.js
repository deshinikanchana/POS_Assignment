function CustomerDTO(id,name,address,salary) {
    var id=id;
    var name=name;
    var address=address;
    var salary=salary;

    this.getCustomerId=function () {
        return id;
    }
    this.getCustomerName=function () {
        return name;
    }
    this.getCustomerAddress=function () {
        return address;
    }
    this.getCustomerSalary=function () {
        return salary;
    }

    this.setCustomerId=function (newID) {
        id=newID;
    }
    this.setCustomerName=function (newName) {
        name=newName;
    }
    this.setCustomerAddress=function (newAddress) {
        address=newAddress;
    }
    this.setCustomerSalary=function (newSalary) {
        salary=newSalary;
    }
}