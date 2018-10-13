
        
    function main() {
        var i = prompt("Wie lautet dein Name?");
        var node : HTMLElement = document.getElementById("body");
        node.innerHTML += "Yo ";
        node.innerHTML += i;
        node.innerHTML += ", was geht ab.";
        console.log("Yo ",i,", as Geht ab.");
        }

    
    document.addEventListener('DOMContentLoaded',main);
    