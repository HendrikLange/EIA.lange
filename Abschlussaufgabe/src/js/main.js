var NiceIce;
(function (NiceIce) {
    document.addEventListener("DOMContentLoaded", function () {
        var closeModalButtons = document.getElementsByClassName("close-modal");
        for (let i = 0; i < closeModalButtons.length; i++) {
            closeModalButtons[i].addEventListener("click", closeModal);
        }
    });
    NiceIce.address = "https://abschluss-2019.herokuapp.com/";
    function newHTMLElement(_element, _classes, _appendTo) {
        var classArray = _classes.split(" ");
        if (_element == "div") {
            var div = document.createElement("div");
            for (let i = 0; i < classArray.length; i++) {
                if (_classes !== "")
                    div.classList.add(classArray[i]);
            }
            if (_appendTo !== null)
                _appendTo.append(div);
            return div;
        }
        else if (_element == "input") {
            var input = document.createElement("input");
            for (let i = 0; i < classArray.length; i++) {
                if (_classes !== "")
                    input.classList.add(classArray[i]);
            }
            if (_appendTo !== null)
                _appendTo.append(input);
            return input;
        }
        else if (_element == "option") {
            var option = document.createElement("option");
            for (let i = 0; i < classArray.length; i++) {
                if (_classes !== "")
                    option.classList.add(classArray[i]);
            }
            if (_appendTo !== null)
                _appendTo.append(option);
            return option;
        }
        else if (_element == "button") {
            var button = document.createElement("button");
            for (let i = 0; i < classArray.length; i++) {
                if (_classes !== "")
                    button.classList.add(classArray[i]);
            }
            if (_appendTo !== null)
                _appendTo.append(button);
            return button;
        }
        else {
            var element = document.createElement(_element);
            for (let i = 0; i < classArray.length; i++) {
                if (_classes !== "")
                    element.classList.add(classArray[i]);
            }
            if (_appendTo !== null)
                _appendTo.append(element);
            return element;
        }
    }
    NiceIce.newHTMLElement = newHTMLElement;
    function closeModal() {
        toggleModal("", "", null, true);
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.remove();
        let url = document.URL;
        if (url.includes("index")) {
            confirmButton = newHTMLElement("button", "btn btn-danger", null);
            var divForButton = document.getElementById("modal-footer");
            divForButton.insertBefore(confirmButton, divForButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Löschen";
        }
        else if (url.includes("orders")) {
            confirmButton = newHTMLElement("button", "btn btn-success", null);
            const divForButton = document.getElementById("modal-footer");
            divForButton.insertBefore(confirmButton, divForButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Bestätigen";
        }
    }
    NiceIce.closeModal = closeModal;
    function toggleModal(typeOfElement, placeholderText, elementToRemove, isHidden) {
        var modal = document.getElementById("modal");
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.addEventListener("click", function (event) {
            closeModal();
            if (document.URL.includes("orders"))
                NiceIce.deleteOrder(elementToRemove);
            elementToRemove.remove();
        });
        modal.hidden = isHidden;
    }
    NiceIce.toggleModal = toggleModal;
})(NiceIce || (NiceIce = {}));
//# sourceMappingURL=main.js.map