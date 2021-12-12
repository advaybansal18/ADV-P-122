x=0;
y=0;
draw_circle="";
draw_rect="";
screen_width=0;
screen_height=0;
draw_apple="";
apple="";
speak_data="";
to_number=0;

function preload(){
    apple=loadImage("apple.png");
}

var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();

function setup(){
    screen_width=window.innerWidth;
    screen_height=window.innerHeight;
    canvas=createCanvas(screen_width,screen_height-150);
    canvas.position(0,150);
}

function start(){
    document.getElementById("status").innerHTML="System is listening. Please Speak.";
    recognition.start();
}

recognition.onresult=function (event){
    console.log(event);
    var content=event.results[0][0].transcript;
    to_number=Number(content);
    if(Number.isInteger(to_number)){
        document.getElementById("status").innerHTML="Started Drawing Apple:";
        draw_apple="set";
    }
    else if(content=="Circle"){
        x=Math.floor(Math.random()*800);
        y=Math.floor(Math.random()*500);
        document.getElementById("status").innerHTML="Circle is drawing";
        draw_circle="set";
    }
    else if(content=="rectangle"){
        x=Math.floor(Math.random()*800);
        y=Math.floor(Math.random()*500);
        document.getElementById("status").innerHTML="Rectangle is drawing";
        draw_rect="set";
    }
    else{
        document.getElementById("status").innerHTML="The Speech has been recognized as: "+content;}
}
    
    function draw(){
        if(draw_circle=="set"){
            radius=Math.floor(Math.random()*100);
            circle(x,y,radius);
            document.getElementById("status").innerHTML="Circle is Drawn";
            draw_circle="";
        }
        if(draw_rect=="set"){
            width=Math.floor(Math.random()*100);
            height=Math.floor(Math.random()*100);
            rect(x,y,width,height);
            document.getElementById("status").innerHTML="Rectangle is Drawn";
            draw_rect="";
        }
        if(draw_apple=="set"){
            for(var i=1; i<=to_number;i++){
                x=Math.floor(Math.random()*700);
                y=Math.floor(Math.random()*400);
                image(apple,x,y,75,75);
            }
            document.getElementById("status").innerHTML= to_number+"Apple is Drawn";
            speak_data=to_number+"Apples Drawn";
            speak();
            draw_apple="";
        }
    }
    function speak(){ 
        var synth = window.speechSynthesis;
         var utterThis = new SpeechSynthesisUtterance(speak_data); 
        synth.speak(utterThis); speak_data = ""; }