Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach('#camera')

function capture_image() {
    Webcam.snap(function(data_uri) {
        document.getElementById("reasult").src = data_uri;
        document.getElementById("reasult").style.display = "block";
        document.getElementById("identify").style.display ="inline-block";
    });
}

console.log("Ml5 version: " + ml5.version);

var classifier = ml5.imageClassifier('model.json', model_loaded);
function model_loaded() {
    console.log("Model has successfully loaded");
}

function identify_img() {
    var img = document.getElementById("reasult");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
        alert("An error occured while processing the image");
    }
    else {
        document.getElementById("identified_img").innerHTML = result[0].label;
        document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(3);
        document.getElementById("identified").style.display = "block";
    }
}