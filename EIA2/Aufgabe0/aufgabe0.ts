namespace aufgabe0 {
    var i : string ="";
        
    function main() {
        var i = prompt("Wie heisst du?");
        var node : any = document.getElementById("body");
        node.innerHTML += "Yo ";
        node.innerHTML += i;
        node.innerHTML += ", Was geht ab.";
        console.log("Yo ",i,", Was Geht ab.");
        }

    
    document.addEventListener('DOMContentLoaded',main);
    }