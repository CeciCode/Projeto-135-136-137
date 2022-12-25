status= "";
objects= [];
function setup() {
    canvas= createCanvas(480, 300);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
}
function start() {
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status: ojebetos sendo decetidados";
    object= document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("CARREGADO");
    status= true;
}
function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: ojebetos decetidados";
            fill("pink");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("pink");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label == object) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_detected").innerHTML= "Ojebeto detectado";
        }
        else {
            document.getElementById("object_detected").innerHTML= "O ojebeto não compareceu a reunião 🍷 🗿";
        }

    }
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects= results;
}