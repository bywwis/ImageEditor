const circleButton = document.querySelector('.circle-button');
const imageContainer = document.querySelector('.image-container');
const dashedBorder = document.querySelector('.dashed-border');
const loadingCircle = document.querySelector('.loading-circle');
const fileNameElement = document.querySelector('.file-name');
const editButton = document.querySelector('.edit-button');
const replaceButton = document.querySelector('.replace-button');
const deleteButton = document.querySelector('.delete-button');
const wrapper = document.querySelector('.wrapper');
const dropDownItems = document.querySelectorAll('.dropdown-content a');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const saveButton = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn'); 
const slidecontainer = document.querySelector('.slidecontainer');
const filtersBtn = document.getElementById('filters-button');
const resize = document.querySelector('.resize');
const resizeBtn = document.getElementById('resize-button');
const image = document.querySelector('.image');
const inputHeight = document.getElementById('input-height');
const inputWidth = document.getElementById('input-width');
const heightValue = inputHeight.value;
const widthValue = inputWidth.value;

const cropBtn = document.getElementById('cropBtn');
const cropUn = document.getElementById('crop-un');
const crop = document.querySelector('.crop');

let currentFile;
let imgElement; 
let originalImage; 

function displayFileInfo(file) {
    fileNameElement.textContent = file.name;
    imageContainer.classList.remove('hidden');
}

function loadImage(file) {
    const reader = new FileReader();

    loadingCircle.style.display = 'block';

    reader.onload = (e) => {
        imgElement = imageContainer.querySelector('img'); 
        imgElement.src = e.target.result;
        loadingCircle.style.display = 'none';
        displayFileInfo(file);
        currentFile = file; 

        imageContainer.classList.add('image-loaded');

        originalImage = new Image();
        originalImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

dashedBorder.addEventListener('dragover', (event) => {
    event.preventDefault(); 
    dashedBorder.classList.add('dragover');
});

dashedBorder.addEventListener('dragleave', () => {
    dashedBorder.classList.remove('dragover'); 
});

dashedBorder.addEventListener('drop', (event) => {
    event.preventDefault(); 
    dashedBorder.classList.remove('dragover'); 

    const file = event.dataTransfer.files[0]; 
    loadImage(file); 
});

circleButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        loadImage(file); 
    });

    fileInput.click(); 
});

editButton.addEventListener('click', () => {

    const imgElement = imageContainer.querySelector('img');
    const imgSrc = imgElement.src;

    const modalImage = wrapper.querySelector('.image');
    modalImage.src = imgSrc;

    wrapper.classList.remove('hidden');
});

filtersBtn.addEventListener('click', () => {
    event.preventDefault(); 
    
    slidecontainer.classList.toggle('hidden');
});

resizeBtn.addEventListener('click', () => {
    event.preventDefault(); 

    resize.classList.toggle('hidden');
});

cropUn.addEventListener('click', () => {
    event.preventDefault(); 

    crop.classList.toggle('hidden');
});

replaceButton.addEventListener('click', () => {
    circleButton.click(); 
});

resetBtn.addEventListener('click', () => {
    image.style.width = ""; 
    image.style.height = ""; 
    image.style.filter = ""; 

    brightnessSlider.value = 0;
    contrastSlider.value = 0;
    saturationSlider.value = 0;

    inputWidth.value = imgElement.width;
    inputHeight.value = imgElement.width;

    image.style.clipPath = ""; 

    image.src = originalImage.src;
});


deleteButton.addEventListener('click', () => {
    imageContainer.classList.add('hidden');
    fileNameElement.textContent = '';
    currentFile = null; 
    imageContainer.classList.remove('image-loaded');
});

cropBtn.addEventListener('click', () => {
    const startX = parseInt(document.getElementById('startX').value);
    const startY = parseInt(document.getElementById('startY').value);
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    if (!isNaN(startX) && !isNaN(startY) && !isNaN(width) && !isNaN(height)) {
        cropImage(startX, startY, width, height);
    } 
    else {
        alert("Пожалуйста, введите корректные значения!");
        }
});

function updateImage() {
    const brightness = brightnessSlider.value / 100;
    const contrast = contrastSlider.value / 100;
    const saturation = saturationSlider.value / 100;

    if (!imgElement.complete) {
        console.error("Изображение еще не загружено.");
        return;
    }

    image.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`; 
}

function updateResize() {
    const heightValue = parseInt(inputHeight.value); 
    const widthValue = parseInt(inputWidth.value); 

    image.style.width = widthValue + 'px'; 
    image.style.height = heightValue + 'px'; 
}

brightnessSlider.addEventListener('input', updateImage);
contrastSlider.addEventListener('input', updateImage);
saturationSlider.addEventListener('input', updateImage);

inputWidth.addEventListener('input', updateResize);
inputHeight.addEventListener('input', updateResize);

function cropImage(x, y, width, height) {
    image.style.clipPath = `inset(${y}px ${image.clientWidth - (x + width)}px ${image.clientHeight - (y + height)}px ${x}px)`;
}
