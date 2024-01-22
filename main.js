img=""
status=""
objects = []

function setup() {
canvas=createCanvas(600, 600)

canvas.center()
video = createCapture(VIDEO);
video.size(600,600)
objectDetector = ml5.objectDetector("cocossd",ModelLoaded)
document.getElementById("status").innerHTML = "Status : Detecting objects"
video.hide()
}

function ModelLoaded() {
    console.log("Model Loaded")
    status = true
    
}

function gotResults(error,results){
    if(error){
        console.error(error)

    }
    else{
        console.log(results)
        objects=results                
    }
     
}

function preload() {
    img = loadImage("dog_cat.jpg")  

}

function draw() {
    image(video,0,0,600,600)



if(status != "") {
    objectDetector.detect(video,gotResults)

    for (i=0 ; i<objects.length ; i++) {
        r = random(255)
        g = random(255)
        b = random(255)
        document.getElementById("status").innerHTML = "Status :objects detected"
        document.getElementById("objects").innerHTML = "Number of Objects Detected : " + objects.length
        fill(r,b,g) ;
        percent = Math.floor(objects[i].confidence*100) ;
        text(objects[i].label+" "+ percent +"%",objects[i].x+85,objects[i].y+115)

        noFill()
stroke(r,g,b) ;


rect(objects[i].x+70,objects[i].y+90,objects[i].width,objects[i].height)
    }
}
}