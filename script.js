const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// variables required if using the Unsplash API images.  Unsplash API not currently used.
// const count = 30;  
// const query = 'read';   

// Unsplash API of book images that may be used in place of the actual books read.
// API key is free, so no need to obscure it.
// const apiKey = 'gF4pvK3cLTf3Dnf4Lx8iSXgNWgBa_BMYIDtsbc91p1U';
// const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${query}&count=${count}`;

// JSON of actual books read rather than Unsplash API of book images
const apiUrl = "JLCimages.json"

// Check if all images were loaded.  Turn off loader svg when images have been loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;                       
  }
}

// Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
 }

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);    
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {   
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
    }
}

// Set scroll event listener. Load more photos when browser window plus scrolled length >=
//1000px before bottom. And when photos are loaded/ready
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});
  
// On Load
getPhotos();