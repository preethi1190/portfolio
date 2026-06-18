AOS.init({
duration:1000,
once:true
});

const text = [
"Embedded Systems Enthusiast",
"ESP32 Developer",
"IoT Learner",
"Electronics Engineer"
];

let index = 0;
let charIndex = 0;

function typeEffect(){

if(charIndex < text[index].length){

document.getElementById("typing").innerHTML += text[index].charAt(charIndex);

charIndex++;

setTimeout(typeEffect,100);

}
else{

setTimeout(eraseEffect,1500);
}
}

function eraseEffect(){

if(charIndex > 0){

document.getElementById("typing").innerHTML =
text[index].substring(0,charIndex-1);

charIndex--;

setTimeout(eraseEffect,50);

}
else{

index++;

if(index >= text.length){
index = 0;
}

setTimeout(typeEffect,500);

}
}

