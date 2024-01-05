const body = document.body;
const loade = document.querySelector('.loader');
const autorbody = document.querySelector('.autorbody');
const musiclistdiv = document.querySelector('.musiclist');
const name_Song=document.querySelector('.name_Song')
const menu_Img=document.querySelector('.menu_img')
function loader() {
    loade.classList.remove('loader');
    body.style.backgroundColor = 'white';
}
function bildautor(img) {
    const data = img.autors[0];
    imageArra = data.img.data.data;

    const blob = new Blob([new Uint8Array(imageArra)], { type: 'image/jpeg' });

    const imgUrl = URL.createObjectURL(blob);
    autorbody.innerHTML = '';
    autorbody.innerHTML = `<img src="${imgUrl}" alt=""> 
    <div>
    <h1>${data.autor} </h1>
    <p> ${data.title}</p>
    </div>`;
}
function bildplaylist(music) {
    const data = music.music[0];

    musiclist = '';
    for (i = 0; i < data.length; i++) {
        musiclist += `<div class='musicli'>
      <button  class='play-button' id=${data[i]._id}>play</button>
      <h1>${data[i].songs} </h1>

      </div>`;
    }

    musiclistdiv.innerHTML = ` ${musiclist}`;

    getsongs();
}

function getsongs() {
    const playButtons = document.querySelectorAll('.play-button');
    let id 

    playButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
            id = event.target.id;
            fetch('https://project-49di.onrender.com/auth/music',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id }),
              
          }).then(res=> res.json()).then((data)=>{
            console.log(data)
            bildmusic(data)
          })
            
        });
    });
 
} 


function bildmusic(music){
  audioData=music.music.data.data
  
  let blob = new Blob([new Uint8Array(audioData)], {
    type: music.music.contentType,
});


const audioUrl = URL.createObjectURL(blob);
name_Song.innerHTML=`${music.songs.songs}`
console.log(audioUrl)
document.getElementById('audio').src = audioUrl
}
function getautor() {
    const urlkey = window.location.search;

    const url = new URLSearchParams(urlkey);
    console.log(urlkey);
    const autor = url.get('token');
    console.log(autor);

    fetch('https://project-49di.onrender.com/auth/getsongs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ autor: autor }),
    })
        .then((response) => {
            // Handle the response from the server
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.status}`
                );
            }
            return response.json();
        })
        .then((data) => {
          console.log(data);
            loader();
            bildautor(data);
            bildplaylist(data);
            
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
}

getautor();
