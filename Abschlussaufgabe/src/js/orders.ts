namespace NiceIce {

    let orderIdStorage: string[] = [];

    document.addEventListener("DOMContentLoaded", function (): void {
        getOrdersFromServer();
        document.getElementById("close-all").addEventListener("click", deleteAllOrders);

    });

    function orderView(response: string): void {    
        document.getElementById("orders-wrapper").innerHTML = "";

        let tempJSON: JSON = JSON.parse(response);
        console.log(tempJSON);

        let datastring: string;
        let orderJSON: JSON;
        let id: string;
 
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

    function newSingleOrder(singleOrderJSON: JSON, key: string): HTMLDivElement {

        var ordersWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("orders-wrapper");
        var divSingleOrder: HTMLElement = newHTMLElement("div", "single-order col-12 mb-5", ordersWrapper);
        var divBorder: HTMLElement = newHTMLElement("div", "m-2 px-4 py-5", divSingleOrder);

       

        var divHeaderRow: HTMLElement = newHTMLElement("div", "pb-4 mb-4 px-5", divBorder);
        var divHeadline: HTMLElement = newHTMLElement("div", "col-6", divHeaderRow);

        var orderHeadline: HTMLHeadingElement = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText: string = "Bestellung ";
        orderHeadline.innerHTML = headlineText;

        var divButton: HTMLElement = newHTMLElement("div", "col-12 d-flex justify-content-end", divHeaderRow);
        var closeButton: HTMLButtonElement = <HTMLButtonElement>newHTMLElement("button", "btn btn-success my-4 mr-4", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "Bestellung schließen";
        closeButton.addEventListener("click", function (): void {
            toggleModal("order", headlineText, divSingleOrder, false);
            console.log(orderIdStorage[parseInt(key)]);

        });


     

        var itemsWrapper: HTMLElement = newHTMLElement("div", "items-wrapper", divBorder);
        var divDescriptionRow: HTMLElement = newHTMLElement("div", "row pb-3 mx-4", itemsWrapper);

        var numberDescription: HTMLElement = newHTMLElement("div", "col-2", divDescriptionRow);
        numberDescription.innerHTML = "#";

        var articleDescription: HTMLElement = newHTMLElement("div", "col-6", divDescriptionRow);
        articleDescription.innerHTML = "Produkt";

        var priceDescription: HTMLElement = newHTMLElement("div", "col-3 text-right", divDescriptionRow);
        priceDescription.innerHTML = "Preis";

        let grandTotal: number = 0;

        for (let i in singleOrderJSON) {
            var divOrderRow: HTMLElement = newHTMLElement("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);

            var numberCol: HTMLElement = newHTMLElement("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();

            var articleCol: HTMLElement = newHTMLElement("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;

            var priceCol: HTMLElement = newHTMLElement("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;

            var euroSymbol: HTMLElement = newHTMLElement("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";

            grandTotal += parseFloat(singleOrderJSON[i].price);
        }

        var divTotal: HTMLElement = newHTMLElement("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);

        var total: HTMLElement = newHTMLElement("div", "col-10 text-right", divTotal);
        total.innerHTML = grandTotal.toFixed(2);

        var euro: HTMLElement = newHTMLElement("div", "col-1", divTotal);
        euro.innerHTML = "€";

        return ordersWrapper;
    }


    function deleteAllOrders(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?delOrder", true);
        xhr.send();
    }


    export function deleteOrder(elementToRemove: HTMLElement): void {
        var allOrders: HTMLCollection = document.getElementsByClassName("single-order");
        let index: number;

        for (let i: number = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }

        var orderId: string = orderIdStorage[index];

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", (address + "?delSinOr" + orderId) , true);
        xhr.send();
    }

    function getOrdersFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetOrders);
        xhr.send();
    }

    function handleStateChangeGetOrders(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            orderView(xhr.response);
        }
    }
}