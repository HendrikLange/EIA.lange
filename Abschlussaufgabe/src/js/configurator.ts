namespace NiceIce {
    
    document.addEventListener("DOMContentLoaded", function (): void {

        document.getElementById("add-category").addEventListener("click", addCategoryAtClick);
        const removeCategoryButtons: HTMLCollection = document.getElementsByClassName("remove-category");
        const addItemButtons: HTMLCollection = document.getElementsByClassName("add-item");
        const removeItemButtons: HTMLCollection = document.getElementsByClassName("remove-item");

        for (let i: number = 0; i < removeCategoryButtons.length; i++) {
            removeCategoryButtons[i].addEventListener("click", removeCategoryAtClick);
        }
        for (let i: number = 0; i < addItemButtons.length; i++) {
            addItemButtons[i].addEventListener("click", addItemAtClick);
        }
        for (let i: number = 0; i < removeItemButtons.length; i++) {
            removeItemButtons[i].addEventListener("click", removeItemAtClick);
        }
 
        document.getElementById("save-button").addEventListener("click", sendData);

        getDataFromServer();
    });

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

    function addCategoryAtClick(): void {
        addCategory("", "");
    }

    function addCategory(_categoryName: string, _categoryType: string): HTMLElement {
        const categoryOptions: string[] = ["Radio", "Checkbox"];

        const divAllCategories: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("categories-wrapper")[0];
        const divAddButton: HTMLDivElement = <HTMLDivElement>document.getElementById("add-category");

        

        const divCategory: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "category mb-5 border-bottom pb-2", divAllCategories);
        const divCategoryRow: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "category-row row py-2 mb-3", divCategory);


        const divRowCol: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-12 col-lg-9 mb-2 mb-lg-0", divCategoryRow);
        const divInputGroup: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "input-group input-group-lg", divRowCol);

        const inputCategoryName: HTMLInputElement = <HTMLInputElement>newHTMLElement("input", "form-control", divInputGroup);
        inputCategoryName.setAttribute("type", "text");

        inputCategoryName.setAttribute("placeholder", "Kategorie");
        if (_categoryName != "")
            inputCategoryName.value = _categoryName;

        const selectCategoryType: HTMLSelectElement = <HTMLSelectElement>newHTMLElement("select", "custom-select", divInputGroup);

        for (let i: number = 0; i < categoryOptions.length; i++) {

            const option: HTMLOptionElement = <HTMLOptionElement>newHTMLElement("option", "", selectCategoryType);
            option.innerHTML = categoryOptions[i];
        }

        if (_categoryType != "")
            selectCategoryType.value = _categoryType;


        const divButtonRemoveCategory: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-12 col-lg-3 justify-content-end d-flex", divCategoryRow);
        const buttonRemoveCategory: HTMLButtonElement = <HTMLButtonElement>newHTMLElement("button", "btn btn-danger w-100", divButtonRemoveCategory);
        buttonRemoveCategory.setAttribute("type", "button");


        buttonRemoveCategory.innerHTML = "Kategorie löschen";
        buttonRemoveCategory.addEventListener("click", removeCategoryAtClick);


        const divItemWrapper: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "items-wrapper", divCategory);



        const divAddItemRow: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "add-item-row row py-2 justify-content-end", divItemWrapper);
        const divAddItemCol: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-lg-2 justify-content-end d-flex", divAddItemRow);

        const buttonAddItem: HTMLButtonElement = <HTMLButtonElement>newHTMLElement("button", "add-item btn btn-success w-100", divAddItemCol);
        buttonAddItem.setAttribute("type", "button");
        buttonAddItem.innerHTML = "+ Produkt";
        buttonAddItem.addEventListener("click", addItemAtClick);

        return divCategory;

		

    }

    function addItemAtClick(_event: Event): void {
        const target: HTMLElement = <HTMLElement>_event.target;
        const targetItemWrapper: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;

        addItem(targetItemWrapper, "", "", "");
    }

    function addItem(_targetWrapper: HTMLDivElement, _itemName: string, _itemStock: string, _itemPrice: string): void {

        const divItemRow: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "row py-2 justify-content-start", null);

        _targetWrapper.insertBefore(divItemRow, _targetWrapper.children[(_targetWrapper.children.length - 1)]);

        const divItemRowCol1: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-lg-1 mb-2 mb-lg-0", divItemRow);


        const divItemRowCol9: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-lg-9 mb-2 mb-lg-0", divItemRow);
        const divItemInputGroup: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "input-group", divItemRowCol9);





        const inputItemName: HTMLInputElement = <HTMLInputElement>newHTMLElement("input", "form-control", divItemInputGroup);
        inputItemName.setAttribute("type", "text");

        inputItemName.setAttribute("placeholder", "Produktname");
        if (_itemName != "")
            inputItemName.value = _itemName;

        const inputItemStock: HTMLInputElement = <HTMLInputElement>newHTMLElement("input", "form-control", divItemInputGroup);
        inputItemStock.setAttribute("type", "text");

        inputItemStock.setAttribute("placeholder", "Bestand");
        if (_itemName != "")
            inputItemStock.value = _itemStock;

        const inputItemPrice: HTMLInputElement = <HTMLInputElement>newHTMLElement("input", "form-control", divItemInputGroup);
        inputItemPrice.setAttribute("type", "text")
        ;
        inputItemPrice.setAttribute("placeholder", "Preis");
        if (_itemName != "")
            inputItemPrice.value = _itemPrice;

        const divSpanAppend: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "input-group-append", divItemInputGroup);
        const spanAppend: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");

        spanAppend.classList.add("input-group-text");
        spanAppend.innerHTML = "€";

        divSpanAppend.append(spanAppend);


       

      
        const divButtonRemoveItem: HTMLDivElement = <HTMLDivElement>newHTMLElement("div", "col-lg-2 justify-content-end d-flex", divItemRow);
        const buttonRemoveItem: HTMLButtonElement = <HTMLButtonElement>newHTMLElement("button", "btn btn-danger w-100", divButtonRemoveItem);
        buttonRemoveItem.setAttribute("type", "button");


        buttonRemoveItem.innerHTML = "Produkt löschen";
        buttonRemoveItem.addEventListener("click", removeItemAtClick);

    }

    function removeItemAtClick(_event: Event): void {

        const target: HTMLElement = <HTMLElement>_event.target;
        const targetItemWrapper: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;

        let allItems: HTMLCollection = targetItemWrapper.children;
        let index: number;

        for (let i: number = 0; i < allItems.length; i++) {
            if (target.parentNode.parentNode == allItems[i])	
                index = i;
        }

        let elementToRemove: HTMLElement = <HTMLElement>allItems[index];

        let nameInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[0];
        let stockInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[1];

        let priceInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[3];

        let itemName: string = nameInput.value;

        let itemStock: string = stockInput.value;
        let itemPrice: string = priceInput.value;

        if (itemName === "" && itemStock === "" && itemPrice === undefined)
            elementToRemove.remove();
        else {
            if (itemName === "")

                itemName = "Unlabeled Item";

            toggleModal("item", itemName, elementToRemove, false);
        }

    }

    function removeCategoryAtClick(_event: Event): void {
        const target: HTMLElement = <HTMLElement>_event.target;

        const elementToRemove: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;
        let nameInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[0].children[0].children[0].children[0];
        let categoryName: string = nameInput.value;

        if (categoryName === "")



    
            categoryName = "Unlabeled Category";

        toggleModal("category", categoryName, elementToRemove, false);

    }



    function getForm(): Object {
        let categoriesWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("categories-wrapper");
        let configData: Categories = [];


        for (let i: number = 0; i < categoriesWrapper.children.length; i++) {


            let currentCategory: HTMLDivElement = <HTMLDivElement>categoriesWrapper.children[i];
            let titleInput: HTMLInputElement = <HTMLInputElement>currentCategory.children[0].children[0].children[0].children[0];
            let typeInput: HTMLInputElement = <HTMLInputElement>currentCategory.children[0].children[0].children[0].children[1];
            let categoryTitle: string = titleInput.value;
            let categoryType: string = typeInput.value;

            configData[i] = {
                title: categoryTitle,

                type: categoryType,
                items: [
                    {
                        name: null,
                        stock: null,
                        price: null
                    }
                ]
            };


            let itemWrapper: HTMLDivElement = <HTMLDivElement>currentCategory.children[1];

            for (let k: number = 0; k < itemWrapper.children.length - 1; k++) {

                let currentItem: HTMLDivElement = <HTMLDivElement>itemWrapper.children[k];

                let nameInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[0];

                let stockInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[1];

                let priceInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[2];
                let itemName: string = nameInput.value;

                let itemStock: string = stockInput.value;

                let itemPrice: string = priceInput.value;

                configData[i].items[k] = {
                    name: itemName,
                    stock: parseFloat(itemStock),
                    price: parseFloat(itemPrice)
                };

            }

        }
        return configData;
    }

    function sendData(): void {
        const configData: Object = getForm();
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let query: string = convertDataToQuery(configData);

        xhr.open("GET", address + "?saveData" + query, true);
        xhr.addEventListener("readystatechange", handleStateChangeSaveData);
        xhr.send();
    }

    function handleStateChangeSaveData(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {

            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
           

            let temp: string = xhr.response.replace(/%22/g, '"');
            temp = temp.replace(/%20/g, " ");
            temp = temp.slice(10);

           
        }
    }

    function convertDataToQuery(_data: Object): string {
        let query: string = JSON.stringify(_data);
        return query;
    }

    function buildStructure(_configData: Object): void {
        for (let i in _configData) {
            let category: HTMLElement = addCategory(_configData[i].title, _configData[i].type);
            let itemWrapperDiv: HTMLDivElement = <HTMLDivElement>category.getElementsByClassName("items-wrapper")[0];

            for (let k in _configData[i].items) {
                addItem(itemWrapperDiv, _configData[i].items[k].name, _configData[i].items[k].stock, _configData[i].items[k].price);
            }
        }
    }
}