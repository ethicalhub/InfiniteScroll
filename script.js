const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");


let imageArray = []
let ready = false;
let imgLoad = 0;
let totalImage = 0;

// imageArray[0].alt_description
//imageArray[0].links.html
//imageArray[0].urls.regular
function imageLoaded(){
    
     imgLoad++;
     if(imgLoad === totalImage ){
         loader.hidden = true;
         ready= true;
     }

}

function displayPhotos(){
    totalImage = imageArray.length;

    imageArray.forEach((image)=>{
        const item = document.createElement('a');
        item.setAttribute('href', image.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', image.urls.regular);
        img.setAttribute('alt', image.alt_description);
        img.setAttribute('title', image.alt_description);

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

        });

}

// console.log("Server is up and running")
const count = 10;
const apiKey = "70pJ6qZT65DIp0h4htXCieIve29qeOXzo0bMK6QEzP4";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Get Photos from APi

async function getPhotos(){

    try{
        const response = await fetch(apiUrl);
        imageArray = await response.json();
        console.log(imageArray)
        displayPhotos();
        
    }
    catch{
        //Catch Error
    }
}

// Checking Scroll

window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY > document.body.offsetHeight-1000 && ready == true){
       getPhotos();
       ready = false;
       imgLoad = 0;

    }
})

//On Load
getPhotos();