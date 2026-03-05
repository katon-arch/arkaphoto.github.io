const video = document.getElementById("video");

let photos = [];

let selectedFrame = "frames/frame1.png";

/* CAMERA START */

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
video.srcObject = stream;
});


/* TAKE PHOTO */

function takePhoto(){

if(photos.length >= 4) return;

const canvas = document.createElement("canvas");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(video,0,0);

photos.push(canvas.toDataURL("image/png"));

updatePreview();

updateCounter();

}


/* UPDATE COUNTER */

function updateCounter(){

document.getElementById("photoCount").innerText =
photos.length + " / 4 Photos";

}


/* PREVIEW */

function updatePreview(){

const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

const scale = canvas.width / 1200;

const positions = [
{ x:95.2, y:222.9 },
{ x:95.2, y:871.4 },
{ x:95.2, y:1520 },
{ x:95.2, y:2168.6 }
];

photos.forEach((photo,index)=>{

const img = new Image();

img.onload = function(){

const pos = positions[index];

ctx.drawImage(
img,
pos.x * scale,
pos.y * scale,
1000 * scale,
600 * scale
);

}

img.src = photo;

});

}


/* RETAKE */

function retakeAll(){

photos = [];

updatePreview();

updateCounter();

}


/* GENERATE STRIP */

function generateStrip(){

if(photos.length !== 4){
alert("Take 4 photos first");
return;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const positions = [
{ x:95.2, y:222.9 },
{ x:95.2, y:871.4 },
{ x:95.2, y:1520 },
{ x:95.2, y:2168.6 }
];

photos.forEach((photo,index)=>{

const img = new Image();

img.onload = function(){

const pos = positions[index];

ctx.drawImage(img,pos.x,pos.y,1000,600);

if(index === 3){
drawFrame();
}

}

img.src = photo;

});

}


function drawFrame(){

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frame = new Image();

frame.onload = function(){

ctx.drawImage(frame,0,0,canvas.width,canvas.height);

const link = document.getElementById("downloadLink");

link.href = canvas.toDataURL("image/png");

link.click();

}

frame.src = selectedFrame;

}
