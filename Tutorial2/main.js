// Select necessary elements
const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const overlay = document.querySelector('.overlay');
const btn = document.querySelector('.dark');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'pic1.jpg': 'Closeup of a blue eye',
    'pic2.jpg': 'Rock formations in the desert',
    'pic3.jpg': 'Purple and white flowers',
    'pic4.jpg': 'Ancient architecture with blue sky',
    'pic5.jpg': 'Closeup of a butterfly on a leaf'

};
/* Looping through images */
images.forEach(image => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', altTexts[image]);
    thumbBar.appendChild(newImage);

    // Click event to update the displayed image
    newImage.addEventListener('click', () => {
        displayedImg.setAttribute('src', `images/${image}`);
        displayedImg.setAttribute('alt', altTexts[image]);

    });
});
/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    if(btn.getAttribute('class') === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';

    } 
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';

    }
});
  
