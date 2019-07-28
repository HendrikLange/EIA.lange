"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
var Server;
(function (Server) {
    let order = {};
    console.log("Starting server");
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        let url_object = Url.parse(_request.url, true);
        let query = decodeURI(url_object.path);
        let queryAlt = url_object.query;
        console.log("decoded string from URI:");
        console.log(query);
        console.log("query from URI:");
        console.log(queryAlt);
        let document = [];
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _request.url;
        let requestType = query.slice(0, 10);
        console.log("REQUEST-TYPE: " + requestType);
        query = query.slice(10, query.length);
        let json;
        switch (requestType) {
            case "/?saveData":
                json = JSON.parse(query);
                console.log(query);
                console.log(json);
                console.log(encodeURI(query));
                let data = {
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
                    let order = {
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
        function findCallback(json) {
            let query = JSON.parse(json);
            console.log(query);
            let query2 = JSON.stringify(query);
            console.log(query2);
            respond(_response, json);
        }
        function respond(_response, _text) {
            console.log("Preparing response: " + _text);
            _response.write(_text);
            _response.end();
        }
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map