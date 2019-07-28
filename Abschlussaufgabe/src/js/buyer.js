var NiceIce;
(function (NiceIce) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("cart-link").addEventListener("click", toggleCart);
        document.getElementById("buy-button").addEventListener("click", confirmOrder);
        getDataFromServer();
    });
    function toggleCart() {
        document.getElementById("cart-overlay").classList.toggle("active");
    }
    function getDataFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", NiceIce.address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetData);
        xhr.send();
    }
    function handleStateChangeGetData(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            let response = xhr.response;
            let responseJSON = JSON.parse(response);
            let dataJSON;
            for (let key in responseJSON) {
                let datastring = decodeURI(responseJSON[key].datastring);
                dataJSON = JSON.parse(datastring);
            }
            let configData = [];
            for (let i in dataJSON) {
                configData[parseInt(i)] = {
                    title: dataJSON[i]["title"],
                    type: dataJSON[i]["type"],
                    items: [{ name: null, stock: null, price: null }, { name: null, stock: null, price: null }]
                };
                for (let k = 0; k < dataJSON[i]["items"].length; k++) {
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
    function buildStructure(configData) {
        var categoriesWrapper = document.getElementById("categories-wrapper");
        for (let categoryIndex in configData) {
            var currentCategory = configData[categoryIndex];
            if (currentCategory.type == "Radio")
                newRadioCategory(currentCategory);
            else
                newCheckboxCategory(currentCategory);
        }
        function newRadioCategory(_category) {
            var categoryWrapper = NiceIce.newHTMLElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            var headline = NiceIce.newHTMLElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            var divContainer = NiceIce.newHTMLElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                var itemName = _category["items"][item].name;
                var itemStock = _category["items"][item].stock;
                var itemPrice = _category["items"][item].price;
                var divItemRow = NiceIce.newHTMLElement("div", "px-3 py-2 mb-2 border item-row", divContainer);
                var divForm = NiceIce.newHTMLElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                var radioInput = NiceIce.newHTMLElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);
                radioInput.addEventListener("change", getFormData);
                var placeholder = NiceIce.newHTMLElement("div", "col-1", divForm);
                var nameLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-4", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                var stockLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = "Noch " + itemStock + " Stück im Angebot";
                var priceLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                var euroLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
        function newCheckboxCategory(_category) {
            var categoryWrapper = NiceIce.newHTMLElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            var headline = NiceIce.newHTMLElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            var divContainer = NiceIce.newHTMLElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                var itemName = _category["items"][item].name;
                var itemStock = _category["items"][item].stock;
                var itemPrice = _category["items"][item].price;
                var divItemRow = NiceIce.newHTMLElement("div", "px-3 py-2 mb-2 border item-row", divContainer);
                var divForm = NiceIce.newHTMLElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                var checkInput = NiceIce.newHTMLElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);
                checkInput.addEventListener("change", formChangeHandler);
                var placeholder = NiceIce.newHTMLElement("div", "col-1", divForm);
                var nameLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-4", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                var stockLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = "Noch " + itemStock + " Stück im Angebot";
                var priceLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                var euroLabel = NiceIce.newHTMLElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
    }
    function formChangeHandler() {
        createCart(getFormData());
    }
    function getFormData() {
        let allArticles = [];
        let articleCounter = 0;
        var categoriesWrapper = document.getElementById("categories-wrapper");
        var allCategories = categoriesWrapper.children;
        for (let i = 0; i < allCategories.length; i++) {
            var currentCategory = allCategories[i];
            var allInputs = currentCategory.getElementsByTagName("input");
            for (let i = 0; i < allInputs.length; i++) {
                var currentInput = allInputs[i];
                var itemName = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                var itemPrice = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
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
    function createCart(_articles) {
        var cartItemWrapper = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";
        let total = 0;
        for (let key in _articles) {
            var itemRow = NiceIce.newHTMLElement("div", "item-row row py-1 mb-1", cartItemWrapper);
            var itemNumber = NiceIce.newHTMLElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;
            var itemName = NiceIce.newHTMLElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;
            var itemPrice = NiceIce.newHTMLElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();
            total += parseFloat(_articles[key].price);
            var euro = NiceIce.newHTMLElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }
        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();
        var buyButton = document.getElementById("buy-button");
        if (cartItemWrapper.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;
    }
    function confirmOrder() {
        var buyButton = document.getElementById("buy-button");
        buyButton.disabled = true;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        setTimeout(function () {
            checkOrderAndSendData(event);
        }, 300);
    }
    function handleStateChangeOrder(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
        }
    }
    function checkOrderAndSendData(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", NiceIce.address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }
    function generateJSONString() {
        var allArticles = getFormData();
        let query = JSON.stringify(allArticles);
        return query;
    }
})(NiceIce || (NiceIce = {}));
//# sourceMappingURL=buyer.js.map