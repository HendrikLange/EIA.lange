var NiceIce;
(function (NiceIce) {
    let orderIdStorage = [];
    document.addEventListener("DOMContentLoaded", function () {
        getOrdersFromServer();
        document.getElementById("close-all").addEventListener("click", deleteAllOrders);
    });
    function orderView(response) {
        document.getElementById("orders-wrapper").innerHTML = "";
        let tempJSON = JSON.parse(response);
        console.log(tempJSON);
        let datastring;
        let orderJSON;
        let id;
        orderIdStorage = [];
        for (let key in tempJSON) {
            id = (decodeURI(tempJSON[key]._id));
            orderIdStorage.push(id);
            datastring = (decodeURI(tempJSON[key].datastring));
            console.log("datastring for key: " + key);
            console.log(datastring);
            orderJSON = JSON.parse(datastring);
            console.log(orderJSON);
            newSingleOrder(orderJSON, key);
        }
    }
    function newSingleOrder(singleOrderJSON, key) {
        var ordersWrapper = document.getElementById("orders-wrapper");
        var divSingleOrder = NiceIce.newHTMLElement("div", "single-order col-12 mb-5", ordersWrapper);
        var divBorder = NiceIce.newHTMLElement("div", "m-2 px-4 py-5", divSingleOrder);
        var divHeaderRow = NiceIce.newHTMLElement("div", "pb-4 mb-4 px-5", divBorder);
        var divHeadline = NiceIce.newHTMLElement("div", "col-6", divHeaderRow);
        var orderHeadline = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText = "Bestellung ";
        orderHeadline.innerHTML = headlineText;
        var divButton = NiceIce.newHTMLElement("div", "col-12 d-flex justify-content-end", divHeaderRow);
        var closeButton = NiceIce.newHTMLElement("button", "btn btn-success my-4 mr-4", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "Bestellung schließen";
        closeButton.addEventListener("click", function () {
            NiceIce.toggleModal("order", headlineText, divSingleOrder, false);
            console.log(orderIdStorage[parseInt(key)]);
        });
        var itemsWrapper = NiceIce.newHTMLElement("div", "items-wrapper", divBorder);
        var divDescriptionRow = NiceIce.newHTMLElement("div", "row pb-3 mx-4", itemsWrapper);
        var numberDescription = NiceIce.newHTMLElement("div", "col-2", divDescriptionRow);
        numberDescription.innerHTML = "#";
        var articleDescription = NiceIce.newHTMLElement("div", "col-6", divDescriptionRow);
        articleDescription.innerHTML = "Produkt";
        var priceDescription = NiceIce.newHTMLElement("div", "col-3 text-right", divDescriptionRow);
        priceDescription.innerHTML = "Preis";
        let grandTotal = 0;
        for (let i in singleOrderJSON) {
            var divOrderRow = NiceIce.newHTMLElement("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);
            var numberCol = NiceIce.newHTMLElement("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();
            var articleCol = NiceIce.newHTMLElement("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;
            var priceCol = NiceIce.newHTMLElement("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;
            var euroSymbol = NiceIce.newHTMLElement("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";
            grandTotal += parseFloat(singleOrderJSON[i].price);
        }
        var divTotal = NiceIce.newHTMLElement("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);
        var total = NiceIce.newHTMLElement("div", "col-10 text-right", divTotal);
        total.innerHTML = grandTotal.toFixed(2);
        var euro = NiceIce.newHTMLElement("div", "col-1", divTotal);
        euro.innerHTML = "€";
        return ordersWrapper;
    }
    function deleteAllOrders() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", NiceIce.address + "?delOrder", true);
        xhr.send();
    }
    function deleteOrder(elementToRemove) {
        var allOrders = document.getElementsByClassName("single-order");
        let index;
        for (let i = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }
        var orderId = orderIdStorage[index];
        let xhr = new XMLHttpRequest();
        xhr.open("GET", (NiceIce.address + "?delSinOr" + orderId), true);
        xhr.send();
    }
    NiceIce.deleteOrder = deleteOrder;
    function getOrdersFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", NiceIce.address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetOrders);
        xhr.send();
    }
    function handleStateChangeGetOrders(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            orderView(xhr.response);
        }
    }
})(NiceIce || (NiceIce = {}));
//# sourceMappingURL=orders.js.map