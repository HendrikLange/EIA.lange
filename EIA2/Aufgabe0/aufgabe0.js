var aufgabe0;
(function (aufgabe0) {
    var i = "";
    function main() {
        var i = prompt("Wie heisst du?");
        var node = document.getElementById("body");
        node.innerHTML += "Yo ";
        node.innerHTML += i;
        node.innerHTML += ", Was geht ab.";
        console.log("Yo ", i, ", Was Geht ab.");
    }
    document.addEventListener('DOMContentLoaded', main);
})(aufgabe0 || (aufgabe0 = {}));
//# sourceMappingURL=aufgabe0.js.map