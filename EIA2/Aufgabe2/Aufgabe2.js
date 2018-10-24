// Aufgabe: Aufgabe 2
//Name: Hendrik Lange
//Matrikel: 259227
//Datum: 21.10.2018
//Hiermit versichere ich, dass ich diesen Code in Zusammenarbeit mit Jannis Backhaus & Eugen Krasnov erarbeitet habe. 
//Er wurde nicht kopiert und auch nicht diktiert.
var Uno;
(function (Uno) {
    var deck = [];
    var hand = [];
    var num = 0;
    function Deck() {
        // Zahlen (0 - 9); Aussetzen (10); Richtungswechsel (11); 2-Ziehen (12); 4-Ziehen (13); Farbwahl (14);
        // blau (0); gelb (1); gr�n (2); rot (3); schwarz (4);
        for (var color = 0; color < 5; color++) {
            switch (color) {
                case 0:
                case 1:
                case 2:
                case 3:
                    for (var value = 0; value < 13; value++) {
                        for (var i = 0; i < 2; i++) {
                            deck[num] = [color, value];
                            num++;
                            if (value == 0)
                                break;
                        }
                    }
                case 4:
                    for (var value = 13; value < 15; value++) {
                        for (var i = 0; i < 4; i++) {
                            deck[num] = [color, value];
                            num++;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        var div_board = document.createElement("div");
        var div_stack = document.createElement("div");
        var div_hand = document.createElement("div");
        var div_ablage = document.createElement("div");
        document.body.appendChild(div_board);
        div_board.appendChild(div_hand);
        div_board.appendChild(div_stack);
        div_board.appendChild(div_ablage);
        div_hand.classList.add("div_hand");
        div_stack.classList.add("div_stack");
        div_ablage.classList.add("div_ablage");
        div_stack.setAttribute("id", "Stack");
        div_ablage.setAttribute("id", "ablage");
        document.getElementById("Stack").innerHTML += "Stapel";
        document.getElementById("ablage").innerHTML += "Ablage";
        var cards = parseInt(prompt("Wie viele Karten willst du ziehen?"), 10);
        var content;
        for (var i = 0; i < cards; i++) {
            var div = document.createElement("div");
            div_hand.appendChild(div);
            var a = generateRandom(0, deck.length);
            var t = (deck[a][1]);
            var c = (deck[a][0]);
            switch (c) {
                case 0:
                    div.classList.add("blue", "card");
                    break;
                case 1:
                    div.classList.add("yellow", "card");
                    break;
                case 2:
                    div.classList.add("green", "card");
                    break;
                case 3:
                    div.classList.add("red", "card");
                    break;
                case 4:
                    div.classList.add("black", "card");
                    break;
            }
            switch (t) {
                case 0:
                    div.classList.add("zero");
                    div.innerHTML = "0";
                    break;
                case 1:
                    div.classList.add("one");
                    div.innerHTML = "1";
                    break;
                case 2:
                    div.classList.add("two");
                    div.innerHTML = "2";
                    break;
                case 3:
                    div.classList.add("three");
                    div.innerHTML = "3";
                    break;
                case 4:
                    div.classList.add("four");
                    div.innerHTML = "4";
                    break;
                case 5:
                    div.classList.add("five");
                    div.innerHTML = "5";
                    break;
                case 6:
                    div.classList.add("six");
                    div.innerHTML = "6";
                    break;
                case 7:
                    div.classList.add("seven");
                    div.innerHTML = "7";
                    break;
                case 8:
                    div.classList.add("eight");
                    div.innerHTML = "8";
                    break;
                case 9:
                    div.classList.add("nine");
                    div.innerHTML = "9";
                    break;
                case 10:
                    div.classList.add("skip");
                    div.innerHTML = "skip";
                    break;
                case 11:
                    div.classList.add("direction");
                    div.innerHTML = "<- ->";
                    break;
                case 12:
                    div.classList.add("drawtwo");
                    div.innerHTML = "+2";
                    break;
                case 13:
                    div.classList.add("drawfour");
                    div.innerHTML = "+4";
                    break;
                case 14:
                    div.classList.add("choose");
                    div.innerHTML = "choose";
                    break;
            }
        }
    }
    function generateRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    console.log(deck);
    document.addEventListener('DOMContentLoaded', Deck);
})(Uno || (Uno = {}));
//# sourceMappingURL=Aufgabe2.js.map