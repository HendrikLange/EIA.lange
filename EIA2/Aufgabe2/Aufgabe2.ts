// Aufgabe: Aufgabe 2
//Name: Hendrik Lange
//Matrikel: 259227
//Datum: 21.10.2018
//Hiermit versichere ich, dass ich diesen Code in Zusammenarbeit mit Jannis Backhaus & Eugen Krasnov erarbeitet habe. 
//Er wurde nicht kopiert und auch nicht diktiert.

//Stapel fehlen noch werden nachgereicht!
namespace Uno {
let deck: number[][] = [];
    let hand: number[][] = [];
    let num: number = 0;


    function Deck() {
        // Zahlen (0 - 9); Aussetzen (10); Richtungswechsel (11); 2-Ziehen (12); 4-Ziehen (13); Farbwahl (14);
        // blau (0); gelb (1); grün (2); rot (3); schwarz (4);
        
        
        for (let color: number = 0; color < 5; color++) {
            switch (color) {
                case 0:
                case 1:
                case 2:
                case 3:
                    for (let value: number = 0; value < 13; value++) {
                        switch (value) {
                            case 0:
                                deck[num] = [color, value];
                                num++;
                                break;
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                                for (let i: number = 0; i < 2; i++) {
                                    deck[num] = [color, value];
                                    num++;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 4:
                    for (let value: number = 13; value < 15; value++) {
                        for (let i: number = 0; i < 4; i++) {
                            deck[num] = [color, value];
                            num++;
                        }
                    }
                    break;

                default:
                    break;
            }



        }
        let div_board: HTMLDivElement = document.createElement("div");
        let div_stack: HTMLDivElement = document.createElement("div");
        let div_hand: HTMLDivElement = document.createElement("div");
        let div_ablage: HTMLDivElement = document.createElement("div");

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

        let cards = parseInt(prompt("Wie viele Karten willst du ziehen?"), 10);
        let content: string;
        for (let i: number = 0; i < cards; i++) {
            let div: HTMLDivElement = document.createElement("div");
            div_hand.appendChild(div);
            let a: number = generateRandom(0, deck.length);
            console.log(a);
            let t: number = (deck[a][1]);
            let c: number = (deck[a][0]);
            
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
                    div.classList.add("two")
                    div.innerHTML = "2";
                    break;

                case 3:
                    div.classList.add("three")
                    div.innerHTML = "3";
                    break;

                case 4:
                    div.classList.add("four")
                    div.innerHTML = "4";
                    break;

                case 5:
                    div.classList.add("five")
                    div.innerHTML = "5";
                    break;

                case 6:
                    div.classList.add("six")
                    div.innerHTML = "6";
                    break;

                case 7:
                    div.classList.add("seven")
                    div.innerHTML = "7";
                    break;

                case 8:
                    div.classList.add("eight")
                    div.innerHTML = "8";
                    break;

                case 9:
                    div.classList.add("nine")
                    div.innerHTML = "9";
                    break;

                case 10:
                    div.classList.add("skip")
                    div.innerHTML = "skip";
                    break;

                case 11:
                    div.classList.add("direction")
                    div.innerHTML = "<- ->"; 
                    break; 
 
                case 12:
                    div.classList.add("drawtwo")
                    div.innerHTML = "+2";
                    break;

                case 13:
                    div.classList.add("drawfour")
                    div.innerHTML = "+4";
                    break;

                case 14:
                    div.classList.add("choose"); 
                    div.innerHTML = "choose";
                    break;
            }


        }
    }

    //generateRandom(0,deck.length)
    function generateRandom(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    



    console.log(deck);

    document.addEventListener('DOMContentLoaded', Deck);
}