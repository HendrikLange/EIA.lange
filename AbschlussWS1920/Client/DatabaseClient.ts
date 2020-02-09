import * as Mongo from "mongodb";

namespace DatabaseClient {

    window.addEventListener("load", init);
    let serverAddress: string = "https://hendrik-eia2.herokuapp.com/
    //let serverAddress: string = "https://<your>.herokuapp.com/";    

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("highscores");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
    }

    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let query: string = "command=insert";
        query += "&name=" + inputs[0].value;
        query += "&score=" + document.getElementById("endscore").getAttribute("value");
        sendRequest(query, handleInsertResponse);
        refresh(_event);
    }

    function refresh(_event: Event): void {
        let query: string = "command=refresh";
        sendRequest(query, handleFindResponse);
    }
    function change(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        target.setAttribute("value", target.value)
    }

    function sendRequest(_query: string, _callback: EventListener): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", serverAddress + "?" + _query, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }

    function handleInsertResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    }

    function playerDataSort(_a: playerData, _b: playerData): number {
        let returnNumber: number;
        if (_a.score > _b.score) {
            returnNumber = -1;
        }
        else if (_a.score < _b.score) {
            returnNumber = 1;
        }
        else {
            returnNumber = 0;
        }
        return returnNumber;

    }

    function handleFindResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let output: HTMLElement = document.getElementById("scores");
            let scores: number[] = [];
            let dataArray: playerData[] = JSON.parse(xhr.response);
            dataArray.sort(playerDataSort);
            let helpString: string = "";
            for (let i: number = 0; i < 10; i++) {
                let place: number = 1 + i;
                helpString += "<h3>" + place + ". " + dataArray[i].name + " | Score:" + dataArray[i].score + "<br>"; 
            }
            output.innerHTML = helpString;

        }
    }
}