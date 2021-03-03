Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById( 'camera' );

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_N8yIbrUt/model.json',modelLoaded);

function modelLoaded() {
    console.log('ModelLoaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata_1 = "The first predinction is " + prediction_1;
    speakdata_2 = "And the secong prediction is " + predintion_2;
    var utterThis = new SpeechSynthesisUtterance(speakdata_1 + speankdata_2);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label== "Amazing")
        {
            document.getElementById("update_emoji").innerHTML= "👌";
        }

        if(results[0].label== "Best")
        {
            document.getElementById("update_emoji").innerHTML= "👍";
        }

        if(results[0].label== "Victory")
        {
            document.getElementById("update_emoji").innerHTML= "✌";
        }

        if(results[1].label== "Amazing")
        {
            document.getElementById("update_emoji2").innerHTML= "👌";
        }

        if(results[1].label== "Best")
        {
            document.getElementById("update_emoji2").innerHTML= "👍";
        }

        if(results[1].label== "Victory")
        {
            document.getElementById("update_emoji2").innerHTML= "✌";
        }
    }
}