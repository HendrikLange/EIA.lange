import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";


namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }
    interface Entrypoints {
        amount: string;
        item: string;
        price: string;
    }
    export interface StoredData {
        datatype: string;
        datastring: string;
    }

    export interface Categories {
        [key: number]: Category;
    }
    export interface Category {
        title: string;
        amount_type: string;
        amount: Amount;
        form_type: string;
        items: Item[];
    }
    export interface Item {
        name: string;
        price: number;
    }
    export interface Amount {
        steps: number[];
        display: string[];
    }
    interface OrderData { [key: string]: string; }

    let order: OrderData = {};
    export let block: string;

    console.log("Starting server");
    let port: number = process.env.PORT;
    if (port == undefined)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        let url_object = Url.parse(_request.url, true);
        let query: string = decodeURI(url_object.path);
        let queryAlt = url_object.query;

        console.log("decoded string from URI:");
        console.log(query);
        console.log("query from URI:");
        console.log(queryAlt);

        let document: Categories = [];

       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _request.url;

        let requestType: string = query.slice(0, 10);
        console.log("REQUEST-TYPE: " + requestType);
        query = query.slice(10, query.length);

        
        let json: JSON;

        switch (requestType) {
            case "/?saveData":
                json = JSON.parse(query);

                console.log(query);
                console.log(json);
                console.log(encodeURI(query));

                let data: StoredData = {
                    datatype: "data",
                    datastring: encodeURI(query)
                };
                Database.saveData(data);
                _response.write(query);


            
                _response.end();
                break;
            case "/?getOrder":
                Database.getData(findCallback, "order");
                break;
            case "/?getData0":
                Database.getData(findCallback, "data");
                break;

            case "/?newOrder": // ??
                if (query == "[]")
                    _response.write("Leere Bestellung");

                else {
                    json = JSON.parse(query);

                    console.log(query);
                    console.log(json);

                    let order: StoredData = {
                        datatype: "order",
                        datastring: encodeURI(query)
                    };
                    _response.write(query);

                    Database.insertOrder(order);

                }
                _response.end();
  
                break;
  
            case "/?delOrder":
                Database.deleteAllOrders();
                _response.write("All Orders Deleted");
                _response.end();
                
                break; 

            case "/?delSinOr":
                Database.deleteSingleOrder(query);
                _response.write("Order with id " + query + " deleted.");
                _response.end();
                break;

        }
        function findCallback(json: string): void { 
            let query: AssocStringString = JSON.parse(json);
            console.log(query);
            let query2: string = JSON.stringify(query);

            console.log(query2);
            respond(_response, json);
        }
        function respond(_response: Http.ServerResponse, _text: string): void {
            console.log("Preparing response: " + _text);
            _response.write(_text);
            _response.end();
        }


    }

}  