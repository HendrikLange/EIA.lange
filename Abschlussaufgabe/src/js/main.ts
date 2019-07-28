namespace NiceIce {
	document.addEventListener("DOMContentLoaded", function (): void {

		var closeModalButtons: HTMLCollection = document.getElementsByClassName("close-modal");
		for (let i: number = 0; i < closeModalButtons.length; i++) {
			closeModalButtons[i].addEventListener("click", closeModal);
		}
	});



	

	export let address: string = "https://abschluss-2019.herokuapp.com/";
	

	export function newHTMLElement(_element: string, _classes: string, _appendTo: HTMLElement): HTMLElement {

		var classArray: string[] = _classes.split(" ");

		if (_element == "div") {
			
 
				var div: HTMLDivElement = document.createElement("div");

				for (let i: number = 0; i < classArray.length; i++) {

					if (_classes !== "")
						div.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(div);

				return div;
			}

		else if (_element == "input") {

				var input: HTMLInputElement = document.createElement("input");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						input.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(input);

				return input;

			}

		else if (_element == "option") {

				var option: HTMLOptionElement = document.createElement("option");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						option.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(option);

				return option;

			}

		else if (_element == "button") {

				var button: HTMLButtonElement = document.createElement("button");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						button.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(button);

				return button;

			}

		else {
		var element: HTMLElement = document.createElement(_element);

		for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						element.classList.add(classArray[i]);
				}

		if (_appendTo !== null)
					_appendTo.append(element);

		return element;
		}

	}

	export function closeModal(): void {
		toggleModal("", "", null, true);

	
		let confirmButton: HTMLElement = document.getElementById("confirm-modal");
		confirmButton.remove();
		let url: string = document.URL;


		if (url.includes("index")) {
			confirmButton = newHTMLElement("button", "btn btn-danger", null);
			var divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Löschen";
		}
		else if (url.includes("orders")) {
			confirmButton = newHTMLElement("button", "btn btn-success", null);
			const divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Bestätigen";
		}
	}

	export function toggleModal(typeOfElement: string, placeholderText: string, elementToRemove: HTMLElement, isHidden: boolean): void {
		var modal: HTMLElement = document.getElementById("modal");
		let confirmButton: HTMLElement = document.getElementById("confirm-modal");

		confirmButton.addEventListener("click", function (event: Event): void {
			closeModal();
			if (document.URL.includes("orders"))
				deleteOrder(elementToRemove);
			elementToRemove.remove();

		});

		modal.hidden = isHidden;
	}
}