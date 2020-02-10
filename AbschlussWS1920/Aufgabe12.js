var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Rodelhang;
(function (Rodelhang) {
    window.addEventListener("load", init);
    Rodelhang.canvas = document.getElementsByTagName("canvas")[0];
    let objects = [];
    Rodelhang.birdArray = [];
    Rodelhang.foodArray = [];
    Rodelhang.snowArray = [];
    let imagedata;
    let fps = 25;
    let snowball;
    Rodelhang.score = 0;
    var x = document.getElementById("myAudio");
    var audio1 = new Audio('bam.mp3');
    var audio2 = new Audio('monster.mp3');
    Rodelhang.address = "https://hendrik-eia2.herokuapp.com/"; // Hier server adresse einfügen
    function highscores() {
        document.getElementById("scores").innerText = Rodelhang.score.toString();
        document.getElementsByTagName("div")[0].style.display = "none";
        document.getElementsByTagName("canvas")[0].classList.add("invisible");
        document.getElementsByTagName("section")[0].classList.remove("invisible");
        document.getElementById("nameIn").style.display = "none";
    }
    function handleSendHS(_name, _score) {
        let query = "score=" + _score + "&name=" + _name;
        let response = fetch(Rodelhang.address + "?" + query);
    }
    function handleEnd() {
        let name = document.getElementById("textInput").getAttribute("value");
        if (name != null) {
            console.log("ausgeführt????");
            handleSendHS(name, Rodelhang.score);
            //self das es 
        }
    }
    function handleRetriveHS(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "command=retrieve";
            let response = yield fetch(Rodelhang.address + "?" + query);
            console.log(response);
            let responseText = yield response.text();
            console.log(responseText);
            let highscorelists = document.getElementById("scores");
            /*  let responseJSON = await response.json();
             console.log(responseJSON) */
            console.log("scoree");
            highscorelists.innerText = " " + responseText;
        });
    }
    function listeners() {
        document.getElementById("Start").addEventListener("click", anzeigeCanvas);
        document.getElementById("Start").addEventListener("click", timer);
        document.getElementById("Restart").addEventListener("click", anzeigeCanvas);
        document.getElementById("Restart").addEventListener("click", timer);
        document.getElementsByTagName("canvas")[0].addEventListener("click", mouseEvent);
        document.getElementById("submitButton").addEventListener("click", test);
        document.getElementById("submitButton").addEventListener("click", handleEnd);
        document.addEventListener("contextmenu", rightClick);
        document.getElementById("buttonHighscore").addEventListener("click", highscores);
        document.getElementById("buttonHighscore").addEventListener("click", handleRetriveHS);
        // document.addEventListener("contextmenu", rightClick);
    }
    function test() {
        console.log(Rodelhang.score);
        console.log(document.getElementById("textInput").getAttribute("value"));
    }
    function init() {
        let canvas = document.getElementsByTagName("canvas")[0];
        Rodelhang.crc2 = canvas.getContext("2d");
        /* let nameinput: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        name = nameinput.value; */
        listeners();
        drawSky();
        drawHill();
        drawSun();
        console.log(Rodelhang.name);
        drawCloud();
        // generateSnow();
        drawSnow();
        drawTrees();
        drawSnowman();
        drawBirdhouse();
        drawBird();
        imagedata = Rodelhang.crc2.getImageData(0, 0, canvas.width, canvas.height);
        update();
    }
    function anzeigeCanvas() {
        document.getElementsByTagName("canvas")[0].classList.remove("invisible");
        document.getElementsByTagName("div")[0].classList.add("invisible");
        document.getElementById("nameIn").style.display = "block";
    }
    function timer() {
        console.log("timer start");
        setTimeout(end, 5000);
        x.play();
    }
    function end() {
        document.getElementsByTagName("canvas")[0].classList.add("invisible");
        document.getElementsByTagName("section")[0].classList.remove("invisible");
        document.getElementById("end").innerText = "Deine Punktzahl:" + " " + Rodelhang.score.toString();
        setTimeout(handleRetriveHS, 100);
    }
    function update() {
        Rodelhang.crc2.clearRect(0, 0, 600, 700);
        Rodelhang.crc2.putImageData(imagedata, 0, 0);
        window.setTimeout(update, 1000 / fps);
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            object.draw();
            object.move();
        }
        restockBirds();
        for (let moveable of Rodelhang.birdArray) {
            moveable.move();
            moveable.draw();
        }
        for (let foodable of Rodelhang.foodArray) {
            foodable.draw();
            foodable.becomeSmaller();
            foodable.check();
        }
        for (let snowy of Rodelhang.snowArray) {
            snowy.draw();
            snowy.move();
        }
        if (snowball) {
            snowball.draw();
            if (snowball.radius >= 0.2)
                snowball.radius -= 0.3;
        }
        drawScore();
    }
    function mouseEvent(_event) {
        let snowballVector = new Rodelhang.Vector(_event.offsetX, _event.offsetY);
        snowball = new Rodelhang.Snowball(6, snowballVector);
        window.setTimeout(getBirdHit, 600, snowballVector);
    }
    function killBird(_bird) {
        let index = Rodelhang.birdArray.indexOf(_bird);
        Rodelhang.birdArray.splice(index, 1);
        console.log("Anzahl Vögel" + Rodelhang.birdArray.length);
        Rodelhang.score = Rodelhang.score + 10;
        var random = 10 * Math.random();
        console.log(random);
        if (random < 5) {
            audio1.play();
        }
        else {
            audio2.play();
        }
    }
    function getBirdHit(_aim) {
        for (let bird of Rodelhang.birdArray) {
            if (bird.isHit(_aim)) {
                killBird(bird);
            }
        }
    }
    //Schnee
    /*     function generateSnow(): void {
            for (let i: number = 0; i < 70; i++) {
    
                let snowflake: Snow = new Snow();
                objects.push(snowflake);
            }
        } */
    function drawSnow() {
        let nFlakes = 20;
        for (let i = 0; i < nFlakes; i++) {
            let snowflake = new Rodelhang.Snow();
            Rodelhang.snowArray.push(snowflake);
        }
    }
    function drawBird() {
        let nBirds = 20;
        for (let i = 0; i < nBirds; i++) {
            let bird = new Rodelhang.Bird();
            Rodelhang.birdArray.push(bird);
        }
    }
    function restockBirds() {
        if (Rodelhang.birdArray.length < 10) {
            let bird = new Rodelhang.Bird();
            Rodelhang.birdArray.push(bird);
        }
    }
    function rightClick(_event) {
        let foodVector = new Rodelhang.Vector(_event.offsetX, _event.offsetY);
        Rodelhang.foodArray = [];
        let food = new Rodelhang.Food(foodVector, 5);
        Rodelhang.foodArray.push(food);
    }
    function drawCloud() {
        var gradient = Rodelhang.crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#ECE9E6");
        gradient.addColorStop(0.5, "#FFFFFF");
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(200, 50);
        Rodelhang.crc2.arc(195, 50, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(210, 50, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(187, 50, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(200, 45, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.fillStyle = gradient;
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(100, 150);
        Rodelhang.crc2.arc(97, 150, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(105, 150, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(83, 150, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(105, 145, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(95, 145, 12, 0, 2 * Math.PI);
        Rodelhang.crc2.fillStyle = "#ffffff";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(140, 160);
        Rodelhang.crc2.arc(137, 160, 16, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(145, 160, 16, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(130, 160, 16, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(145, 155, 16, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(125, 165, 16, 0, 2 * Math.PI);
        Rodelhang.crc2.fillStyle = "#ffffff";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(300, 70);
        Rodelhang.crc2.arc(295, 70, 9, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(305, 70, 20, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(290, 70, 15, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(310, 80, 18, 0, 2 * Math.PI);
        Rodelhang.crc2.arc(300, 75, 10, 0, 2 * Math.PI);
        Rodelhang.crc2.fillStyle = "#ffffff";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
    }
    function drawTrees() {
        for (let i = 0; i < 3; i++) {
            let tree = new Rodelhang.Tree();
            objects.push(tree);
        }
    }
    function drawSky() {
        var gradient = Rodelhang.crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#7474BF");
        gradient.addColorStop(0.5, "#348AC7");
        Rodelhang.crc2.fillStyle = gradient;
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.rect(-2, -2, 500, 300);
        Rodelhang.crc2.lineWidth = 2;
        Rodelhang.crc2.fill();
    }
    function drawHill() {
        var gradient = Rodelhang.crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#5AFF15");
        gradient.addColorStop(0.5, "#00B712");
        Rodelhang.crc2.fillStyle = gradient;
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(0, 400);
        Rodelhang.crc2.lineTo(500, 0);
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.lineWidth = 2;
        Rodelhang.crc2.fill();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(0, 600);
        Rodelhang.crc2.lineTo(700, 600);
        Rodelhang.crc2.moveTo(500, 600);
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.lineWidth = 2;
        Rodelhang.crc2.fill();
    }
    function drawSnowman() {
        Rodelhang.crc2.save();
        Rodelhang.crc2.translate(300, 300);
        Rodelhang.crc2.fillStyle = "lightgrey";
        Rodelhang.crc2.beginPath();
        // crc2.moveTo(0, 0);
        Rodelhang.crc2.arc(0, 0, 25, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.arc(0, -25, 20, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.arc(0, -50, 17, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(0, -50, 4, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "orange";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(-5, -42, 2, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "black";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(0, -40, 2, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "black";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(5, -42, 2, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "black";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(4, -55, 2, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "black";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(-4, -55, 2, Math.PI * -0.5, Math.PI * 2);
        Rodelhang.crc2.fillStyle = "black";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.restore();
    }
    function drawBirdhouse() {
        Rodelhang.crc2.save();
        Rodelhang.crc2.translate(50, 300);
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.stroke();
        Rodelhang.crc2.fillStyle = "brown";
        Rodelhang.crc2.fillRect(0, 0, 35, 20);
        Rodelhang.crc2.restore();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.save();
        Rodelhang.crc2.translate(50, 300);
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(-5, 0);
        Rodelhang.crc2.lineTo(20, -20);
        Rodelhang.crc2.lineTo(40, 0);
        Rodelhang.crc2.fillStyle = "brown";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.restore();
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.save();
        Rodelhang.crc2.translate(50, 300);
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.stroke();
        Rodelhang.crc2.fillStyle = "brown";
        Rodelhang.crc2.fillRect(15, 0, 2, 55);
        Rodelhang.crc2.restore();
        Rodelhang.crc2.closePath();
    }
    function drawSun() {
        var gradient = Rodelhang.crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#FF512F");
        gradient.addColorStop(0.5, "#F09819");
        Rodelhang.crc2.fillStyle = gradient;
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.arc(35, 28, 30, 0, 2 * Math.PI);
        Rodelhang.crc2.fill();
    }
    function drawScore() {
        Rodelhang.crc2.beginPath();
        Rodelhang.crc2.moveTo(50, 670);
        Rodelhang.crc2.lineTo(300, 670);
        Rodelhang.crc2.lineTo(300, 770);
        Rodelhang.crc2.lineTo(50, 770);
        Rodelhang.crc2.closePath();
        Rodelhang.crc2.fillStyle = "#ffffff";
        Rodelhang.crc2.fill();
        Rodelhang.crc2.lineWidth = 3.5;
        Rodelhang.crc2.strokeStyle = "#7eb6e9";
        Rodelhang.crc2.stroke();
        Rodelhang.crc2.font = "30px Quicksand";
        Rodelhang.crc2.fillStyle = "#000000";
        Rodelhang.crc2.fillText("Score:" + Rodelhang.score.toString(), 135, 700);
    }
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Aufgabe12.js.map