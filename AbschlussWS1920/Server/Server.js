"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
// mongodb+srv://Testuser:<password>@eia2-hendrik-mwozq.mongodb.net/test?retryWrites=true&w=majority
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Rodelhang;
(function (Rodelhang) {
    let highscores;
    let databaseUrl = "mongodb+srv://Testuser:123456asdf@eia2-hendrik-mwozq.mongodb.net/test?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    // server.addListener("listening", handleListen);
    console.log("Server starting");
    server.addListener("request", handleRequest);
    server.listen(port);
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            highscores = mongoClient.db("Vogelhaus").collection("scores");
            console.log("Database connection ", highscores != undefined);
        });
    }
    function handleRequest(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("What's up?");
            _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            if (_request.url) {
                let url = Url.parse(_request.url, true);
                // for (let key in url.query) {
                //    _response.write(key + ":" + url.query[key] + "<br/>");
                //}
                if (url.query["command"] == "retrieve") {
                    let report = yield retrieveOrders();
                    if (report == "We encountered tecnical problems. Please try again later")
                        _response.write(report);
                    else
                        _response.write(JSON.stringify(report));
                }
                else {
                    console.log("urlQuery: ", url.query);
                    let jsonString = JSON.stringify(url.query);
                    _response.write(jsonString);
                    storeScore(url.query);
                    console.log(jsonString);
                }
            }
            _response.end();
        });
    }
    function retrieveOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("Asking DB about Orders ", orders.find());
            let cursor = yield highscores.find();
            let answer = yield cursor.toArray();
            console.log("DB CursorToArray", answer);
            if (answer != null) {
                return answer;
            }
            else
                return "We encountered tecnical problems. Please try again later";
        });
    }
    function storeScore(_score) {
        highscores.insert(_score);
        let name = highscores.find({ name: "" });
        let score = highscores.find({ score: "" });
        console.log("name" + name + "score" + score);
    }
})(Rodelhang = exports.Rodelhang || (exports.Rodelhang = {}));
//# sourceMappingURL=Server.js.map