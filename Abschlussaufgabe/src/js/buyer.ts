namespace NiceIce {

   document.addEventListener("DOMContentLoaded", function (): void {
        document.getElementById("cart-link").addEventListener("click", toggleCart);
        document.getElementById("buy-button").addEventListener("click", confirmOrder)
        getDataFromServer();
    });

   function toggleCart(): void {
        document.getElementById("cart-overlay").classList.toggle("active");
    }

   function getDataFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetData);
        xhr.send();
    } 

   function handleStateChangeGetData(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);

            let response: string = xhr.response;
            
            let responseJSON: JSON = JSON.parse(response);

            let dataJSON: JSON;

            for (let key in responseJSON) {
                let datastring: string = decodeURI(responseJSON[key].datastring);
                dataJSON = JSON.parse(datastring);
            }

            let configData: Categories = [];

            for (let i in dataJSON) {
                configData[parseInt(i)] = {
                    title: dataJSON[i]["title"],
                    type: dataJSON[i]["type"],
                    items: [{ name: null, stock: null, price: null }, { name: null, stock: null, price: null }]
                };

                for (let k: number = 0; k < dataJSON[i]["items"].length; k++) {
                    configData[parseInt(i)]["items"][k] = {
                        name: dataJSON[i]["items"][k]["name"],
                        stock: dataJSON[i]["items"][k]["stock"],
                        price: dataJSON[i]["items"][k]["price"]
                    };
                }
            }

        
            buildStructure(configData);
        }
    }

   function buildStructure(configData: JSON): void {
        var categoriesWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("categories-wrapper");

        for (let categoryIndex in configData) {
            var currentCategory: JSON = configData[categoryIndex];


            if (currentCategory.type == "Radio")
                newRadioCategory(currentCategory);

            else
                newCheckboxCategory(currentCategory);
        }


        function newRadioCategory(_category: JSON): void {
            var categoryWrapper: HTMLElement = newHTMLElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            var headline: HTMLElement = newHTMLElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;

            var divContainer: HTMLElement = newHTMLElement("div", "mx-5", categoryWrapper);

            for (let item in _category["items"]) {
                var itemName: string = _category["items"][item].name;
                var itemStock: string = _category["items"][item].stock;
                var itemPrice: string = _category["items"][item].price;

                var divItemRow: HTMLElement = newHTMLElement("div", "px-3 py-2 mb-2 border item-row", divContainer);
                var divForm: HTMLElement = newHTMLElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);

                var radioInput: HTMLElement = newHTMLElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);

                radioInput.addEventListener("change", getFormData);


                var placeholder: HTMLElement = newHTMLElement("div", "col-1", divForm);

                var nameLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-4", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;

                var stockLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = "Noch "+ itemStock + " Stück im Angebot";

                var priceLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);

                var euroLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }

        }

        function newCheckboxCategory(_category: JSON): void {
            var categoryWrapper: HTMLElement = newHTMLElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            var headline: HTMLElement = newHTMLElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;

            var divContainer: HTMLElement = newHTMLElement("div", "mx-5", categoryWrapper);

            for (let item in _category["items"]) {
                var itemName: string = _category["items"][item].name;
                var itemStock: string = _category["items"][item].stock;
                var itemPrice: string = _category["items"][item].price;

                var divItemRow: HTMLElement = newHTMLElement("div", "px-3 py-2 mb-2 border item-row", divContainer);
                var divForm: HTMLElement = newHTMLElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);

                var checkInput: HTMLElement = newHTMLElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);

                checkInput.addEventListener("change", formChangeHandler);

                var placeholder: HTMLElement = newHTMLElement("div", "col-1", divForm);

                var nameLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-4", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;

                var stockLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = "Noch " + itemStock + " Stück im Angebot";

                var priceLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);

                var euroLabel: HTMLElement = newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";

            }

        }
    }

   function formChangeHandler(): void {
        createCart(getFormData());
    }

   function getFormData(): CartItem[] {

        let allArticles: CartItem[] = [];
        let articleCounter: number = 0;

        var categoriesWrapper: HTMLElement = document.getElementById("categories-wrapper");
        var allCategories: HTMLCollection = categoriesWrapper.children;

        for (let i: number = 0; i < allCategories.length; i++) {
            var currentCategory: HTMLElement = <HTMLElement>allCategories[i];

               
            var allInputs: HTMLCollection = currentCategory.getElementsByTagName("input");
                

            for (let i: number = 0; i < allInputs.length; i++) {
                    var currentInput: HTMLInputElement = <HTMLInputElement>allInputs[i];
                    var itemName: string = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                    var itemPrice: string = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;

                    if (currentInput.checked) {
                        allArticles[articleCounter] = {
                            name: itemName,
                            price: itemPrice
                        };
                        articleCounter++;
                    }
                }
            
        }
        return allArticles;

    }

   function createCart(_articles: Object): void {

        var cartItemWrapper: HTMLElement = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";

        let total: number = 0;

        for (let key in _articles) {
            var itemRow: HTMLElement = newHTMLElement("div", "item-row row py-1 mb-1", cartItemWrapper);

            var itemNumber: HTMLElement = newHTMLElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;

            var itemName: HTMLElement = newHTMLElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;

            var itemPrice: HTMLElement = newHTMLElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();

            total += parseFloat(_articles[key].price);

            var euro: HTMLElement = newHTMLElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }

        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();

        var buyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buy-button");

        if (cartItemWrapper.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;



    }

   function confirmOrder(): void {
        var buyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buy-button");
        buyButton.disabled = true;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
      

        setTimeout(function (): void {
            checkOrderAndSendData(event);
        },         300);
    }

    
   function handleStateChangeOrder(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);

           
        }
    }

   
   function checkOrderAndSendData(_event: Event): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }

   function generateJSONString(): string {
        var allArticles: CartItem[] = getFormData();
        let query: string = JSON.stringify(allArticles);

        return query;
    }


}