namespace Rodelhang {

    export interface Vector {
        x: number;
        y: number;
    }
    window.addEventListener("load", init);

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    export let birdHousePolePosition: Vector;
    let objects: Draw[] = [];
    export let birdArray: Bird[] = [];
    export let foodArray: Food[] = [];
    export let snowArray: Snow[] = [];
    let imagedata: ImageData;
    let fps: number = 25;
    let snowball: Snowball;
    export let score: number = 0;
    export let name: string;
    var x = <HTMLAudioElement>document.getElementById("myAudio");
    var audio1 = new Audio('bam.mp3');
    var audio2 = new Audio('monster.mp3');

    export let address: string = "https://hendrik-eia2.herokuapp.com/"; // Hier server adresse einfügen




    function highscores(): void {
        document.getElementById("scores").innerText = score.toString();
        document.getElementsByTagName("div")[0].style.display = "none";

        document.getElementsByTagName("canvas")[0].classList.add("invisible");
        document.getElementsByTagName("section")[0].classList.remove("invisible");
        document.getElementById("nameIn").style.display = "none";

    }

    function handleSendHS(_name: string, _score: number): void {
        let query: string = "score=" + _score + "&name=" + _name;
        let response: Promise<Response> = fetch(address + "?" + query);

    }

    function handleEnd(): void {
        let name: any = (<HTMLInputElement>document.getElementById("textInput")).value;
        if (name != null) {
            console.log(name);
            console.log("ausgeführt????");

            handleSendHS(name, score);


        }
    }



    async function handleRetriveHS(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(address + "?" + query);
        console.log(response)

        //let responseText: string = await response.text();

        //  console.log(responseText)
        let nameList = document.getElementById("names");
        let scorelist = document.getElementById("scores");
        let responseJSON = await response.json();
        console.log(responseJSON)
        console.log("scoree");

        for (let x:number; x < responseJSON.length; x++) {
            scorelist.innerText = " " +  responseJSON[x].name;
        }
        for (let x:number; x < responseJSON.length; x++) {
            scorelist.innerText = " " +  responseJSON[x].score;
        }
    }

    function listeners(): void {
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


    function test(): void {

        console.log(score);
        console.log(document.getElementById("textInput").getAttribute("value"));
    }

    function init(): void {

        let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        /* let nameinput: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        name = nameinput.value; */
        listeners();
        drawSky();
        drawHill();
        drawSun();

        console.log(name);
        drawCloud();
        // generateSnow();
        drawSnow();
        drawTrees();
        drawSnowman();
        drawBirdhouse();
        drawBird();



        imagedata = crc2.getImageData(0, 0, canvas.width, canvas.height);

        update();
    }


    function anzeigeCanvas() {
        document.getElementsByTagName("canvas")[0].classList.remove("invisible");
        document.getElementsByTagName("div")[0].classList.add("invisible");
        document.getElementById("nameIn").style.display = "block";
    }

    function timer(): void {
        console.log("timer start");
        setTimeout(end, 5000)
        x.play();
    }

    function end(): void { // Spiel fertig
        document.getElementsByTagName("canvas")[0].classList.add("invisible");
        document.getElementsByTagName("section")[0].classList.remove("invisible");
        document.getElementById("end").innerText = "Deine Punktzahl:" + " " + score.toString()
        setTimeout(handleRetriveHS, 100);

    }


    function update(): void {
        crc2.clearRect(0, 0, 600, 700);
        crc2.putImageData(imagedata, 0, 0);
        window.setTimeout(update, 1000 / fps);


        for (let i: number = 0; i < objects.length; i++) {
            let object: Draw = objects[i];
            object.draw();
            object.move();

        }

        restockBirds();

        for (let moveable of birdArray) {

            moveable.move();
            moveable.draw()

        }

        for (let foodable of foodArray) {


            foodable.draw();
            foodable.becomeSmaller();
            foodable.check();
        }


        for (let snowy of snowArray) {


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

    function mouseEvent(_event: MouseEvent): void {

        let snowballVector: Vector = new Vector(_event.offsetX, _event.offsetY);
        snowball = new Snowball(6, snowballVector);
        window.setTimeout(getBirdHit, 600, snowballVector);

    }
    function killBird(_bird: Bird): void {
        let index: number = birdArray.indexOf(_bird);
        birdArray.splice(index, 1);
        console.log("Anzahl Vögel" + birdArray.length)
        score = score + 10;
        var random: number = 10 * Math.random();
        console.log(random);
        if (random < 5) {
            audio1.play();
        }
        else {
            audio2.play();

        }
    }

    function getBirdHit(_aim: Vector): void {
        for (let bird of birdArray) {
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

    function drawSnow(): void {
        let nFlakes: number = 20;
        for (let i: number = 0; i < nFlakes; i++) {

            let snowflake: Snow = new Snow();
            snowArray.push(snowflake);
        }
    }


    function drawBird(): void {
        let nBirds: number = 20;

        for (let i: number = 0; i < nBirds; i++) {
            let bird: Bird = new Bird();
            birdArray.push(bird);

        }
    }


    function restockBirds(): void {

        if (birdArray.length < 10) {
            let bird: Bird = new Bird();
            birdArray.push(bird);
        }
    }

    function rightClick(_event: MouseEvent): void {
        let foodVector: Vector = new Vector(_event.offsetX, _event.offsetY);
        foodArray = [];
        let food: Food = new Food(foodVector, 5);
        foodArray.push(food);

    }

    function drawCloud(): void {
        var gradient = crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#ECE9E6");
        gradient.addColorStop(0.5, "#FFFFFF");


        crc2.beginPath();
        crc2.moveTo(200, 50);
        crc2.arc(195, 50, 12, 0, 2 * Math.PI);
        crc2.arc(210, 50, 12, 0, 2 * Math.PI);
        crc2.arc(187, 50, 12, 0, 2 * Math.PI);
        crc2.arc(200, 45, 12, 0, 2 * Math.PI);
        crc2.fillStyle = gradient
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(100, 150);
        crc2.arc(97, 150, 12, 0, 2 * Math.PI);
        crc2.arc(105, 150, 12, 0, 2 * Math.PI);
        crc2.arc(83, 150, 12, 0, 2 * Math.PI);
        crc2.arc(105, 145, 12, 0, 2 * Math.PI);
        crc2.arc(95, 145, 12, 0, 2 * Math.PI);
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(140, 160);
        crc2.arc(137, 160, 16, 0, 2 * Math.PI);
        crc2.arc(145, 160, 16, 0, 2 * Math.PI);
        crc2.arc(130, 160, 16, 0, 2 * Math.PI);
        crc2.arc(145, 155, 16, 0, 2 * Math.PI);
        crc2.arc(125, 165, 16, 0, 2 * Math.PI);
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.closePath();



        crc2.beginPath();
        crc2.moveTo(300, 70);
        crc2.arc(295, 70, 9, 0, 2 * Math.PI);
        crc2.arc(305, 70, 20, 0, 2 * Math.PI);
        crc2.arc(290, 70, 15, 0, 2 * Math.PI);
        crc2.arc(310, 80, 18, 0, 2 * Math.PI);
        crc2.arc(300, 75, 10, 0, 2 * Math.PI);
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.closePath();


    }

    function drawTrees(): void {
        for (let i: number = 0; i < 3; i++) {
            let tree: Tree = new Tree();
            objects.push(tree);
        }
    }


    function drawSky(): void {
        var gradient = crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#7474BF");
        gradient.addColorStop(0.5, "#348AC7");


        crc2.fillStyle = gradient;

        crc2.beginPath();
        crc2.rect(-2, -2, 500, 300)
        crc2.lineWidth = 2;

        crc2.fill();
    }


    function drawHill(): void {
        var gradient = crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#5AFF15");
        gradient.addColorStop(0.5, "#00B712");


        crc2.fillStyle = gradient;

        crc2.beginPath();
        crc2.moveTo(0, 400);
        crc2.lineTo(500, 0);
        crc2.closePath();

        crc2.lineWidth = 2;

        crc2.fill();

        crc2.beginPath();
        crc2.moveTo(0, 600);
        crc2.lineTo(700, 600);
        crc2.moveTo(500, 600);

        crc2.closePath();
        crc2.lineWidth = 2;

        crc2.fill();

    }

    function drawSnowman(): void {

        crc2.save();
        crc2.translate(300, 300);

        crc2.fillStyle = "lightgrey";


        crc2.beginPath();
        // crc2.moveTo(0, 0);
        crc2.arc(0, 0, 25, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(0, -25, 20, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(0, -50, 17, Math.PI * -0.5, Math.PI * 2);
        crc2.fill();

        crc2.closePath();

        crc2.beginPath();
        crc2.arc(0, -50, 4, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "orange";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(-5, -42, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.fill();

        crc2.beginPath();
        crc2.arc(0, -40, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.fill();

        crc2.beginPath();
        crc2.arc(5, -42, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.fill();

        crc2.beginPath();
        crc2.arc(4, -55, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.fill();

        crc2.beginPath();
        crc2.arc(-4, -55, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.fill();

        crc2.restore();
    }

    function drawBirdhouse(): void {


        crc2.save();
        crc2.translate(50, 300);
        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "brown";
        crc2.fillRect(0, 0, 35, 20);
        crc2.restore();
        crc2.closePath();

        crc2.save();
        crc2.translate(50, 300);
        crc2.beginPath();
        crc2.moveTo(-5, 0);
        crc2.lineTo(20, -20);
        crc2.lineTo(40, 0);
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.restore();
        crc2.closePath();


        crc2.save();
        crc2.translate(50, 300);
        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "brown";
        crc2.fillRect(15, 0, 2, 55);
        crc2.restore();
        crc2.closePath();

    }


    function drawSun(): void {
        var gradient = crc2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#FF512F");
        gradient.addColorStop(0.5, "#F09819");


        crc2.fillStyle = gradient;


        crc2.beginPath();
        crc2.arc(35, 28, 30, 0, 2 * Math.PI);
        crc2.fill();
    }


    function drawScore(): void {
        crc2.beginPath();
        crc2.moveTo(50, 670);
        crc2.lineTo(300, 670);
        crc2.lineTo(300, 770);
        crc2.lineTo(50, 770);
        crc2.closePath();
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.lineWidth = 3.5;
        crc2.strokeStyle = "#7eb6e9";
        crc2.stroke();

        crc2.font = "30px Quicksand";
        crc2.fillStyle = "#000000";
        crc2.fillText("Score:" + score.toString(), 135, 700);

    }
}