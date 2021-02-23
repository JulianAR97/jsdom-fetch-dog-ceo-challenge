let breeds = []

function fetchDogs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  // returns object with key message that has a value of an array of image links
  // Access the array with json.message
  fetch(imgUrl).then(resp => resp.json()).then(json => renderImages(json.message));
}

function fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
  // return object with key message that has a value of an object with keys that are breeds
  // and values that are arrays of subbreeds.  ex: {bulldog: ["boston", "english", "french"]}
  // we will only be using the primary breed, i.e., the key
  addSelectListener()
  fetch(breedUrl).then(resp => resp.json()).then(json => {
    breeds = Object.keys(json.message)
    renderBreeds(breeds)});
}

function renderImages(images) {
  const dogImageContainer = document.getElementById('dog-image-container');
  images.forEach(image => {
    let newImageElement = document.createElement('img');
    newImageElement.src = image;
    dogImageContainer.appendChild(newImageElement);
  })
}

function renderBreeds(breeds) {
  let breedList = document.getElementById('dog-breeds')
  removeAllChildren(breedList)
  breeds.forEach(breed => addBreed(breed))
}

function addBreed(breed) {
  const breedList = document.getElementById('dog-breeds')
  let newLi = document.createElement('li')
  newLi.innerText = breed
  breedList.appendChild(newLi)
  newLi.addEventListener('click', e => e.target.style.color = 'pink')
  
}

function addSelectListener() {
  const breedDropdown = document.getElementById('breed-dropdown');
  // e.target.value gives letter we want to filter by
  breedDropdown.addEventListener('change', e => updateBreeds(e.target.value));
}

function updateBreeds(filterLetter) {
  renderBreeds(breeds.filter(breed => breed.startsWith(filterLetter)))
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
document.addEventListener('DOMContentLoaded', function() {
  fetchDogs();
  fetchBreeds();
})

