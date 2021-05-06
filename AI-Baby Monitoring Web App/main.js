status  = "";
alarm = "";
object = [];

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results)
    object = results
}

function draw(){
    image(video,0,0,500,500);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotResult);
        for(i = 0;i < object.length;i++){
            document.getElementById(status).innerHTML = "Status : Object Detected";

            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%",object[i].x+15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby Found";
                alarm.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby Not Found";
                alarm.play();
            }
        }
        if(object.length == 0){
            document.getElementById("baby_status").innerHTML = "Baby Not Found";
            alarm.play();
        }
    }
}