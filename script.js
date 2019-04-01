let imageContainer = document.getElementById("image-container");
let buttons = document.getElementById("button-container");
let winState = document.getElementById("win-state");
let resetButton = document.getElementById('reset');

const apiKey = "ELKoQ5fTlhVe7DYohidy95L2Lfv5yDIu8mboshxmTAA9wzNVeb";

function startGame() {

    //reset
    imageContainer.innerHTML = '';
    buttons.innerHTML = '';
    winState.innerHTML = '';

    // create array && shuffle
    let tagName = ['mobile', 'bicycle', 'boat', 'train'];
    tagName = Shuffle(tagName);

    //Get random correct answer
    let randomTag = tagName[Math.floor(Math.random() * tagName.length)];

    //Create buttons and append to DOM
    tagName.forEach(tag => {
        let button = document.createElement('Button');
        button.innerHTML = tag;
        button.classList.add('btn');
        button.classList.add('btn-outline-info');
        button.classList.add('mr-3');
        buttons.appendChild(button);
    });

    //Fetch pictures from tumblr 
    fetch(`https://api.tumblr.com/v2/tagged?tag=${randomTag}&api_key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.response.forEach(function(post) {
                if (post.photos) {
                    post.photos.forEach(function(photo) {
                        let image = document.createElement("img");
                        let photoUrl = photo.original_size.url;

                        image.src = photoUrl;
                        image.style.width = "250px";
                        image.style.height = "250px";

                        imageContainer.appendChild(image);
                    });
                }
            });
        });

    //Check if user got correct answer or not
    buttons.onclick = function(event) {
        console.log(event.target.innerHTML);
        if (event.target.innerHTML === randomTag) {
            let winHeading = document.createElement('h1');
            winHeading.innerHTML = 'CORRECT!';
            winState.appendChild(winHeading);
        } else {
            let winHeading = document.createElement('h1');
            winHeading.innerHTML = 'WRONG! TRY AGAIN';
            winState.appendChild(winHeading);
        }
    }
}

//Start Game
startGame();

//Shuffle array and return shuffled array
function Shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//Restart Game
resetButton.onclick = function() {
    startGame();
}