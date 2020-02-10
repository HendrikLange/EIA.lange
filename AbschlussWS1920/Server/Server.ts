/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
// mongodb+srv://Testuser:<password>@eia2-hendrik-mwozq.mongodb.net/test?retryWrites=true&w=majority
import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Rodelhang {
    interface ScoreList {
        [type: string]: string | string[];
    }


    let highscores: Mongo.Collection;
    
    let databaseUrl: string = "mongodb+srv://Testuser:123456asdf@eia2-hendrik-mwozq.mongodb.net/test?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);

    let port: number = process.env.PORT;
    if (port == undefined)
        port = 8100;





    let server: Http.Server = Http.createServer();
   // server.addListener("listening", handleListen);
    console.log("Server starting");
    server.addListener("request", handleRequest);
    server.listen(port);

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db("Vogelhaus").collection("scores");
        console.log("Database connection ", highscores != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //    _response.write(key + ":" + url.query[key] + "<br/>");
            //}

            if (url.query["command"] == "retrieve") {
                let report: any[] | string = await retrieveOrders();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);

                else
                    _response.write(JSON.stringify(report));
            } 
            else {
                console.log("urlQuery: ", url.query);
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
                storeScore(url.query);
                console.log(jsonString);
            }
        }
        _response.end();
    }

    async function retrieveOrders(): Promise<any[] | string> {
        // console.log("Asking DB about Orders ", orders.find());
        let cursor: Mongo.Cursor = await highscores.find();
        let answer: Promise<any[]> = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }

    function storeScore(_score: ScoreList): void { 
        highscores.insert(_score);
    
    }

}