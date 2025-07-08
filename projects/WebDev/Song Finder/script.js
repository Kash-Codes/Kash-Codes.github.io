let term = '';
const songContainer = document.getElementById('songs');

const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    if(!term || term === '') {
        alert('Please enter an Artist')
       } else {
           
           while(songContainer.firstChild) {
               songContainer.removeChild(songContainer.firstChild);
           }
           
           const url = `https://itunes.apple.com/search?limit=12&media=music&term=${term}`;
            fetch(url)
                .then( (response) => response.json() )
                .then((data) => { 

                const artists = data.results;
                return artists.map(result => {
                    
                    const article = document.createElement('article'),
                          artist = document.createElement("p"),
                          song = document.createElement("p"),
                          image = document.createElement("img"),
                          audio = document.createElement("audio"),
                          audioSource = document.createElement("source")

                    artist.innerHTML = result.artistName
                    song.innerHTML = result.trackName
                    image.src = result.artworkUrl100
                    audioSource.src = result.previewUrl
                    audio.setAttribute('controls', '')

                    article.appendChild(image)
                    article.appendChild(artist)
                    article.appendChild(song)
                    article.appendChild(audio)
                    audio.appendChild(audioSource)
                    songContainer.appendChild(article)
                })
            })
            .catch(error => console.log('Request Failed: ', error))
                   }
            }
const searchButton = document.querySelector('button')
searchButton.addEventListener('click', updateTerm)

var input = document.getElementById("searchInput");

input.addEventListener("keyup", function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        searchButton.click();
    }
})

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i=0; i< audio.length; i++){
        if(audio[i] != event.target){
            audio[i].pause();
        }
    }
}, true)

