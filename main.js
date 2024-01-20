const buttons_Switches = document.querySelectorAll('.menu_item');
const main_Canvas = document.querySelector('.main');
const range_Audio = document.querySelector('.range_Audio');
const img_Play_Music = document.querySelector('.img_Play_Music');
const search = document.getElementById('search');
const text_for_profile = document.querySelector('.text_for_profile');
const Alert=document.querySelector('.Alert')
const head_search_container = document.querySelector('.head_search_container');
let input_toggle = false;
let data_Songs;
let Id_Playing_Songs;
let music_data;
let author_data;
async function getSongsSearch(value) {
    const val = value;
    console.log(value);
    const response = await fetch(
        'https://project-49di.onrender.com/auth/getmusic',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(val),
        }
    );
    const data = await response.json();
    return data;
}
function delete_QueryParam_search() {
    let currentUrl = window.location.href;

    let urlObject = new URL(currentUrl);

    urlObject.searchParams.delete('find');
    urlObject.searchParams.delete('search');
    history.pushState({}, '', urlObject.toString());
}
function create_QueryParam_search(queryParam, PagequeryParam) {
    let currentUrl = window.location.href;

    let newUrl = new URL(currentUrl);
    newUrl.searchParams.append('find', queryParam);
    newUrl.searchParams.append('search', PagequeryParam);

    history.pushState({}, '', newUrl.toString());
}
async function getAuthorSearch() {
    const response = await fetch(
        'https://project-49di.onrender.com/auth/getuauthor'
    );
    const data = await response.json();
    return data;
}
// async function get_author_find() {
//     music_data = await getSongsSearch();
//     author_data = await getAuthorSearch();
//     console.log(music_data)
// }
function Search(elem, value) {}
async function Search_button_click() {
    const search_button_head = document.querySelector('.search_button_head');
    const search_input_head = document.querySelector('.search_input_head');
    search_button_head.addEventListener('click', async () => {
        const search_input_head = document.querySelector('.search_input_head');

        const value = search_input_head.value;
        fetch_search(value);
    });
}
function fetch_search(value) {
    fetch('https://project-49di.onrender.com/auth/getmusic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
    })
        .then((res) => res.json())
        .then((data) => {
            bild_search(data);
            delete_QueryParam_search();
            delete_QueryParam();
            create_QueryParam_search(value, 'search');
        });
}
function transitionAuthorPage(event){
    
    event.forEach((elem)=> {
        elem.addEventListener('click',(e)=>{
            const clickedId = e.target.id;
            const Author=clickedId.split('_')
        console.log(clickedId)
        delete_QueryParam_search()
        create_QueryParam(Author[1], 'autor')
        autor()
    })
    });
    
   
}
function bild_search(data) {
    const author = data.author;
    const musics = data.musics;
    data_Songs = musics;
    console.log(data);
    main_Canvas.innerHTML = '';
    main_Canvas.innerHTML = `<div>
    ${author
        .map(
           
            (elem) => 
            `<div class='searchAuthorContainer' id='autor_${elem.autor}'>

<img   id='autor_${elem.autor}' src=${elem.img}>
    <h1  id='autor_${elem.autor}'>${elem.autor}</h1>
    </div>`
        )
        .join('')}</div>
    </div>
   <div class='search_container_music'>
    
   </div>`;
    const searchAuthorContainer=document.querySelectorAll('.searchAuthorContainer')
    console.log( searchAuthorContainer)
   transitionAuthorPage(searchAuthorContainer)

    musics.forEach((arr) => {
        let like_Img = 'img/image8.png';
        if (data.user) {
            console.log(arr._id);
            const like_User = data.user.liker_songs + ' ';
            console.log(like_User.includes(arr._id));

            if (like_User.includes(arr._id)) {
                console.log('true');
                like_Img = 'img/image 8 (2).png';
            }
        }
        const search_container_music = document.querySelector(
            '.search_container_music'
        );
        Id_Playing_Songs = arr.idpath;

        console.log(data_Songs);
        search_container_music.innerHTML += `
<div class='autorPage_Div_Music_Li'>
    
    <button class='autorPage_Div_Music_Content_Music_Play_Button'>
    <img class='autorPage_Div_Music_Content_Music_Play_Img ' id="${arr.idpath}" src='img/2ff977b7-2c90-41d5-813f-49170d570561.png' alt="" />
    </button>
    <button class='autorPage_Div_Music_Play_Button_Img_Songs'         >
    <img class='autorPage_Div_Music_Play_Img_Songs' src='${arr.img_autor}' alt="" />
    </button>
    <div calss="autorPage_Div_Music_Content_Music_Head_Music"> 
    <p class='autorPage_Div_Music_Content_Music_Name_Music'>${arr.songs}</p>
    <p class='autorPage_Div_Music_Content_Music_Autor_Music'>${arr.autor}</p>
    </div>
    <div></div>
    <div class='autorPage_Div_Music_Play_Like_Div'>
    <div></div>
    <div></div>
    <p class='autorPage_Div_Music_Play_Like_Num'>${arr.like}</p>
    <button class='autorPage_Div_Music_Play_Like_Button'>
    <img class='autorPage_Div_Music_Play_Like' id="${arr._id} " src='${like_Img}' alt="" />
    </button>
    </div>
    </div>`;
    });
    get_Like();
    const autorPage_Div_Music_Content_Music_Play_Img =
        document.querySelectorAll(
            '.autorPage_Div_Music_Content_Music_Play_Img'
        );
    get_Id_Mass(autorPage_Div_Music_Content_Music_Play_Img, Button_Play_Music);
}
search.addEventListener('click', () => {
    input_toggle
        ? ((head_search_container.innerHTML = ''), (input_toggle = false))
        : ((head_search_container.innerHTML = `<div class="container_search_input_head">
    <input class="search_input_head" placeholder="Пошук авторів та музики" type="text">
    <button class="search_button_head">
    <img class='search_img_head'  src="img/c22d9061-59d5-4167-86b4-485922470fd8.png" alt="">
    </button>
    </div>`),
          (input_toggle = true));

    Search_button_click();
});
function login_check() {
    text_for_profile.innerHTML = '';
    text_for_profile.innerHTML = '<a href="/profile.html">profile</a>';
}
autorPage_Check_Authorization(login_check);

function delete_QueryParam() {
    let currentUrl = window.location.href;

    let urlObject = new URL(currentUrl);

    urlObject.searchParams.delete('param');
    urlObject.searchParams.delete('page');
    history.pushState({}, '', urlObject.toString());
}
function get_Page_queryParam() {
    const urlkey = window.location.search;
    const url = new URLSearchParams(urlkey);
    const page = url.get('page');
    const search = url.get('search');

    return { page, search };
}
function create_QueryParam(queryParam, PagequeryParam) {
    let currentUrl = window.location.href;

    let newUrl = new URL(currentUrl);
    newUrl.searchParams.append('param', queryParam);
    newUrl.searchParams.append('page', PagequeryParam);

    history.pushState({}, '', newUrl.toString());
}
function autorPage_Check_Authorization(function_True) {
    const time = localStorage.getItem('time');
    console.log(now_Time());
    if (time - now_Time() >= 0) {
        console.log('faf');
        function_True();
    } else {
        localStorage.removeItem('time');
        console.log('aaa');
    }
}
function falseTrue_Check_Authorization(function_True) {
    const time = localStorage.getItem('time');
    console.log(now_Time());
    if (time - now_Time() >= 0) {
        return true
    } else {
        localStorage.removeItem('time');
        return false
    }
}
function check_Suaitability_token() {
    const time = localStorage.getItem('time');
    console.log(now_Time());
    if (time - now_Time() >= 0) {
        return localStorage.getItem('token');
    } else {
        localStorage.removeItem('time');
        localStorage.removeItem('token');
        console.log('aaa');
    }
}
function creatTime() {
    const now = new Date();
    const date = now.getDate() + 1 + '.' + now.getHours();
    return date;
}
function now_Time() {
    const now = new Date();
    let hour = now.getHours();
    if (now.getHours().length <= 10) {
        hour = '0' + now.getHours();
        console.log(hour);
    }
    const date = now.getDate() + '.' + hour;
    return date;
}
buttons_Switches.forEach((button) => {
    button.addEventListener('click', (e) => {
        const clickedId = e.target.id;
        switchcase_Page_For_Start(clickedId);
    });
});
function switchcase_Page_For_Start(param_Page_Url) {
    console.log(param_Page_Url);
    if (
        (param_Page_Url.page == null && param_Page_Url.search == null) ||
        param_Page_Url == 'main'
    ) {
        featch_Create_Main_Page();
    }
    if (param_Page_Url.page == 'autor') {
        autor();
    }
    if (param_Page_Url.search === 'search') {
        const urlkey = window.location.search;
        const url = new URLSearchParams(urlkey);
        const page = url.get('find');
        fetch_search(page);
    }
}
switchcase_Page_For_Start(get_Page_queryParam());

function featch_Create_Main_Page() {
    fetch('https://project-49di.onrender.com/auth/getsongsforcreatmainpage')
        .then((data) => data.json())

        .then((res) => {
            console.log(res);
            console.log('ff');
            Bild_Create_Main_Page(res);
        });
}
function Bild_Create_Main_Page(res) {
    delete_QueryParam_search();
    delete_QueryParam();
    const arry = res.arr;
    console.log(arry);
    main_Canvas.innerHTML = '';
    main_Canvas.innerHTML = `<div class="mainPage_autor_Div"></div>`;
    const mainPage_autor_Div = document.querySelector('.mainPage_autor_Div');
    mainPage_autor_Div.innerHTML = `<h1 class="mainPage_Autor_title">Автори</h1>
    <div class='mainPage_Autor_Div_For_card'>  </div>`;

    Create_autor_Card(arry);
}

function Create_autor_Card(arry) {
    const mainPage_Autor_Div_For_card = document.querySelector(
        '.mainPage_Autor_Div_For_card'
    );

    arry.autor.forEach((autor) => {
        const img = autor.img;

        console.log(autor);
        mainPage_Autor_Div_For_card.innerHTML += `<div>
        </div><div class="mainPage_autor_card">
<button class="mainPage_Autor_Card_Img_Button"id='autor_${autor.autor}'><div class='mainPage_Autor_Img_Order_Div' id='autor_${autor.autor}' ></div><img class="mainPage_Autor_Card_Img" src="${img}" alt="">
<h1 class="mainPage_Autor_Card_Autor_Name">${autor.autor}</h1>
</button>

</div>`;
    });

    const mainPage_autor_card = document.querySelectorAll(
        '.mainPage_autor_card'
    );
    mainPage_Transition_Autor_Card_Click(mainPage_autor_card);
}
function mainPage_Transition_Autor_Card_Click(event) {
    event.forEach((button) => {
        button.addEventListener('click', (e) => {
            const clickedId = e.target.id;
            const arr = clickedId.split('_');
            const function_url = arr[0];
            const queryParam = arr[1];
            console.log(function_url);
            delete_QueryParam();
            create_QueryParam(queryParam, function_url);

            if (function_url == 'autor') {
                autor();
            }
        });
    });
}
const audio = document.querySelector('.audioPlayer');
function autor() {
    const urlkey = window.location.search;

    const url = new URLSearchParams(urlkey);

    const autor = url.get('param');
    main_Canvas.innerHTML = '';
    main_Canvas.innerHTML = `<div class='autorPage_Head_Autor_Content'></div><div class='autorPage_Div_Music_Content'></div>`;

    fetch('https://project-49di.onrender.com/auth/getsongs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ autor: autor }),
    })
        .then((response) => {
            // Handle the response from the server

            return response.json();
        })
        .then((data) => {
            featch_autorPage_Create_Autor(data);
        });
    fetch_Get_Songs_For_Autor();
}
function fetch_Get_Songs_For_Autor() {
    const urlkey = window.location.search;
    const token = localStorage.getItem('token');

    const url = new URLSearchParams(urlkey);

    const autor = url.get('param');
    fetch('https://project-49di.onrender.com/auth/getsongsforautor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            autor: autor,
            token: check_Suaitability_token(),
        }),
    })
        .then((response) => {
            // Handle the response from the server

            return response.json();
        })
        .then((data) => {
            console.log(data);
            featch_autorPage_Create_MusicPlayer(data);
        });
}

function featch_autorPage_Create_MusicPlayer(data) {
    const autorPage_Div_Music_Content = document.querySelector(
        '.autorPage_Div_Music_Content'
    );

    autorPage_Div_Music_Content.innerHTML = `
    <div class='autorPage_Div_Music_Content_line'> </div>
    <div class='autorPage_Div_Music_Content_MusicLIst'></div>
    `;
    const autorPage_Div_Music_Content_MusicLIst = document.querySelector(
        '.autorPage_Div_Music_Content_MusicLIst'
    );
    data_Songs = data.music;
    data.music.forEach((arr) => {
        let like_Img = 'img/image8.png';
        if (data.user) {
            console.log(arr._id);
            const like_User = data.user.liker_songs + ' ';
            console.log(like_User.includes(arr._id));

            if (like_User.includes(arr._id)) {
                console.log('true');
                like_Img = 'img/image 8 (2).png';
            }
        }

        Id_Playing_Songs = arr.idpath;
        autorPage_Div_Music_Content_MusicLIst.innerHTML += `
    <div class='autorPage_Div_Music_Li'>
        
        <button class='autorPage_Div_Music_Content_Music_Play_Button'>
        <img class='autorPage_Div_Music_Content_Music_Play_Img ' id="${arr.idpath}" src='img/2ff977b7-2c90-41d5-813f-49170d570561.png' alt="" />
        </button>
        <button class='autorPage_Div_Music_Play_Button_Img_Songs'         >
        <img class='autorPage_Div_Music_Play_Img_Songs' src='${arr.img_autor}' alt="" />
        </button>
        <div calss="autorPage_Div_Music_Content_Music_Head_Music"> 
        <p class='autorPage_Div_Music_Content_Music_Name_Music'>${arr.songs}</p>
        <p class='autorPage_Div_Music_Content_Music_Autor_Music'>${arr.autor}</p>
        </div>
        <div></div>
        <div class='autorPage_Div_Music_Play_Like_Div'>
        <div></div>
        <div></div>
        <p class='autorPage_Div_Music_Play_Like_Num'>${arr.like}</p>
        <button class='autorPage_Div_Music_Play_Like_Button'>
        <img class='autorPage_Div_Music_Play_Like' id="${arr._id} " src='${like_Img}' alt="" />
        </button>
        </div>
        </div>`;
    });

    get_Like();
    const autorPage_Div_Music_Content_Music_Play_Img =
        document.querySelectorAll(
            '.autorPage_Div_Music_Content_Music_Play_Img'
        );
    get_Id_Mass(autorPage_Div_Music_Content_Music_Play_Img, Button_Play_Music);
}
function Function_Next_Music_For_Play_List() {
    for (let i = 0; i < data_Songs.length; i++) {
        data = data_Songs[i].idpath;
        if (data == Id_Playing_Songs) {
            console.log('aaaa');

            next_Song = i + 1;
            console.log(' next_Song' + next_Song);

            if (data_Songs.length + 1 == next_Song) {
                document.getElementById(data_Songs[i].idpath).src =
                    'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
                audio.pause();
                break;
            } else {
                Id_Playing_Songs = data_Songs[next_Song].idpath;
                audio.src = data_Songs[next_Song].idpath;
                audio.play();
                img_Icon_Autorh_InPlayers_Img.src =
                    data_Songs[next_Song].img_autor;
                document.getElementById(data_Songs[i].idpath).src =
                    'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
                document.getElementById(data_Songs[next_Song].idpath).src =
                    ' img/icons8-pause-30.png';
                break;
            }
        }
    }
}

function Function_Previous_Music_For_Play_List() {
    for (i = 0; i < data_Songs.length; i++) {
        data = data_Songs[i].idpath;
        if (data == Id_Playing_Songs) {
            console.log('aaaa');

            next_Song = i - 1;
            console.log(data_Songs.length);
            console.log(next_Song);
            if (-1 > next_Song) {
                document.getElementById(data_Songs[i].idpath).src =
                    'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
                audio.pause();
                break;
            } else {
                Id_Playing_Songs = data_Songs[next_Song].idpath;
                audio.src = data_Songs[next_Song].idpath;
                audio.play();
                img_Icon_Autorh_InPlayers_Img.src =
                    data_Songs[next_Song].img_autor;
                document.getElementById(data_Songs[i].idpath).src =
                    'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
                document.getElementById(data_Songs[next_Song].idpath).src =
                    ' img/icons8-pause-30.png';
                break;
            }
        }
    }
}
const img_Icon_Autorh_InPlayers_Img = document.querySelector(
    '.img_Icon_Autorh_InPlayers_Img'
);
function featch_autorPage_Create_Autor(info) {
    const autors = info.autors[0];
    console.log(autors);

    const autorPage_Head_Autor_Content = document.querySelector(
        '.autorPage_Head_Autor_Content'
    );
    img_Icon_Autorh_InPlayers_Img.src = autors.img;
    autorPage_Head_Autor_Content.innerHTML = `<div class='autorPage_Head_Autor_Content_Img'>
    
    <img class='autorPage_Head_Autor_Content_Img_Main' src="${autors.img}" alt="">
    <div class="autorPage_Head_Autor_Content_Img_Slider">
    <img id='autorPage_Head_Autor_Content_Img_Left' class='autorPage_Head_Autor_Content_Img_Left autorPage_Head_Autor_Content_Img_SwitcheCase' src="${autors.img_autor_rigth}" alt="">
    <img id='autorPage_Head_Autor_Content_Img_Center' class='autorPage_Head_Autor_Content_Img_Center autorPage_Head_Autor_Content_Img_SwitcheCase' src="${autors.img}" alt="">
        <img  id='autorPage_Head_Autor_Content_Img_Rigth' class='autorPage_Head_Autor_Content_Img_Rigth autorPage_Head_Autor_Content_Img_SwitcheCase' src="${autors.img_autor_left}" alt="">
    </div>
    </div>
    <div class='autorPage_Head_Autor_Content_Text'>
    <button class='autorPage_Head_Autor_Content_Music_Play_button'>
        <img class='autorPage_Head_Autor_Content_Music_Play_Img' src='img/2ff977b7-2c90-41d5-813f-49170d570561.png' alt="" />
        </button>

    <p class='autorPage_Head_Autor_Content_Text_title'> ${autors.autor}</p>
    <p class='autorPage_Head_Autor_Content_Text_info'>${autors.title}</p>
   
    </div>`;

    const autorPage_Head_Autor_Content_Img_SwitcheCase =
        document.querySelectorAll(
            '.autorPage_Head_Autor_Content_Img_SwitcheCase'
        );
    const autorPage_Head_Autor_Content_Img_Main = document.querySelector(
        '.autorPage_Head_Autor_Content_Img_Main'
    );
    const autorPage_Head_Img_Center = document.getElementById(
        'autorPage_Head_Autor_Content_Img_Center'
    );
    console.log(autorPage_Head_Img_Center);
    autorPage_Img_SwitcheCase(autorPage_Head_Autor_Content_Img_SwitcheCase);
}
function autorPage_Img_switchMain(data_Id, data_Src) {
    const autorPage_Head_Autor_Img_Center = document.getElementById(
        'autorPage_Head_Autor_Content_Img_Center'
    );
    const autorPage_Head_Autor_Content_Img_Main = document.querySelector(
        '.autorPage_Head_Autor_Content_Img_Main'
    );
    const autorPage_img = autorPage_Head_Autor_Img_Center.src;
    const autorPage_Change_Img = document.getElementById(data_Id);
    autorPage_Head_Autor_Img_Center.src = data_Src;
    autorPage_Change_Img.src = autorPage_img;

    autorPage_Head_Autor_Content_Img_Main.src = data_Src;
}
function autorPage_Img_SwitcheCase(event) {
    event.forEach((element) => {
        element.addEventListener('click', (e) => {
            const autorPage_id_Element_Switch = e.target.id;
            const autorPage_url_Element_Switch = e.target.src;

            autorPage_Img_switchMain(
                autorPage_id_Element_Switch,
                autorPage_url_Element_Switch
            );
        });
    });
}
function get_Like() {
    const autorPage_Div_Music_Play_Like = document.getElementsByClassName(
        'autorPage_Div_Music_Play_Like'
    );
    for (let j = 0; j < autorPage_Div_Music_Play_Like.length; j++) {
        autorPage_Div_Music_Play_Like[j].addEventListener(
            'click',
            function (event) {
                const res=falseTrue_Check_Authorization()
                let id_Like =event.target.id;
                console.log( data_Songs)
                console.log(id_Like)
                if(res){
                

                autorPage_Check_Authorization(() =>
                    autorPage_Like_Function(id_Like)
                );
            }else{
         
                const text = data_Songs.find(({ _id }) => _id.trim() === String(id_Like).trim());

                console.log(text)
                drawAlertLogin(text)
                
            }}
        );
    }
}
function drawAlertLogin(data){
Alert.innerHTML+=`
<div class='alertLoginAll'></div>
<div class='alertLogin'>
<div class=''><img class='alertImg' src=${data.img_autor} alt=""></div>
<div class='alertTextContainer'>
<h1 class='alertText'>щоб лайкнути пісню зареєструйтесь або війдіть в аккаунт</h1>


<a href="/login.html">
<button class='alertButton'>війти</button>
</a>
<a href="regist.html">
<button class='alertButton'>зареєструватися</button>
</a>
</div>
</div>
`
const alertLoginAll=document.querySelector('.alertLoginAll')
alertLoginAll.addEventListener('click',()=>{
    Alert.innerHTML=''
})

}
function autorPage_Like_Function(idlike) {
    const token = localStorage.getItem('token');

    console.log(idlike);
    fetch('https://project-49di.onrender.com/auth/musiclike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idlike: idlike, token: token }),
    }).then(() => {
        autorPage_Check_Authorization(() => fetch_Get_Songs_For_Autor());
        return console.log('all good');
    });
}
let id_Play_Music;
function Button_Play_Music(id_Element) {
    const audio_Src = audio.src;
    const audio_For_If = audio_Src.split('/').pop();
    const id_Element_For_If = id_Element.split('\\').pop();

    if (id_Element_For_If != audio_For_If) {
        if (Id_Playing_Songs) {
            range_Audio.value = 0;

            document.getElementById(Id_Playing_Songs).src =
                'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
        }
        audio.src = id_Element;
    }

    const autorPage_Div_Music_Play_Button_Img_Songs = document.querySelectorAll(
        '.autorPage_Div_Music_Play_Button_Img_Songs'
    );
    console.log(id_Element);
    Id_Playing_Songs = id_Element;
    checks_Play_Music(id_Element);
}

function get_Id_Mass(element, function_event) {
    element.forEach((element) => {
        console.log();
        element.addEventListener('click', (e) => {
            const id_Element = e.target.id;

            function_event(id_Element);
        });
    });
}
const previous_Song_Button = document.querySelector('.previous_Song_Button');
const next_Song_Button = document.querySelector('.next_Song_Button');
next_Song_Button.addEventListener('click', () => {
    Function_Next_Music_For_Play_List();
});
previous_Song_Button.addEventListener('click', () => {
    Function_Previous_Music_For_Play_List();
});
function checks_Play_Music(id_Element) {
    authorths_Page_Img_Icon();
    if (audio.paused) {
        audio.play();
        authorths_Page_Img_Icon();
        if ( document.getElementById(Id_Playing_Songs)) {
        document.getElementById(Id_Playing_Songs).src =
            'img/icons8-pause-30.png';
        }
        img_Play_Music.src = ' img/icons8-pause-30.png';
    } else {
        audio.pause();
        if ( document.getElementById(Id_Playing_Songs)) {
        document.getElementById(Id_Playing_Songs).src =
            'img/2ff977b7-2c90-41d5-813f-49170d570561.png';}
        img_Play_Music.src = 'img/2ff977b7-2c90-41d5-813f-49170d570561.png';
    }
}
function authorths_Page_Img_Icon() {
    for (let i = 0; i < data_Songs.length; i++) {
        data = data_Songs[i].idpath;
        if (data == Id_Playing_Songs) {
            img_Icon_Autorh_InPlayers_Img.src = data_Songs[i].img_autor;
        }
    }
}
img_Play_Music.addEventListener('click', () => {
    const url = audio.src;
    const partAfterSymbol = url.split('/').pop();
    console.log(partAfterSymbol);
    if ('null' == partAfterSymbol) {
        console.log('affaafaaaaaaaaaaaaaaaaaaaaaaa');
    } else {
        checks_Play_Music();
    }
});

// range_Audio.addEventListener('input', function() {
//     const value = this.value; // Получаем значение положения ползунка

//     // Выполняем действия в зависимости от значения ползунка (например, изменяем громкость или скорость воспроизведения)
//     // В этом примере мы будем изменять громкость звука
//     audio.volume = value / 100; // Пример: устанавливаем громкость в зависимости от значения ползунка (от 0 до 1)

//     // Также можно использовать значение ползунка для управления другими аспектами аудио, например, currentTime для перемотки звука
//     // audio.currentTime = value; // Пример: перематываем аудио в указанное место в секундах
//   });
audio.addEventListener('loadedmetadata', function () {
    const duration = audio.duration; // Получаем общую продолжительность аудио в секундах
    console.log(duration);
    range_Audio.setAttribute('max', duration); // Устанавливаем максимальное значение ползунка как общую продолжительность аудио

    range_Audio.addEventListener('input', function () {
        const currentTime = this.value; // Получаем текущее значение временной позиции ползунка

        audio.currentTime = currentTime; // Устанавливаем текущее время аудио в соответствии с позицией ползунка
    });
    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime; // Получаем текущее время воспроизведения аудио

        range_Audio.value = currentTime;
        if (range_Audio.value >= duration - 2) {
            Function_Next_Music_For_Play_List();
        }
    });
});
let switch_menu_song_button_boolean = true;
const switch_Menu_Song_Button = document.querySelector(
    '.switch_Menu_Song_Button'
);
function click_Switch_Menu_Song_Button() {
    return switch_Menu_Song_Button.addEventListener('click', () => {
        if (switch_menu_song_button_boolean) {
            bild_switch_panel_players_music();
            switch_menu_song_button_boolean = false;
            console.log('aaaaaaaaa');
        } else {
            remove_switch_panel_players_music();
            switch_menu_song_button_boolean = true;
        }
    });
}

const play_Music = document.querySelector('.play_Music');
const body = document.querySelector('.body');
const img_Icon_Autorh_InPlayers = document.querySelector(
    '.img_Icon_Autorh_InPlayers'
);

click_Switch_Menu_Song_Button();
function bild_switch_panel_players_music() {
    const autorpage_head_author_content_text_info = document.querySelector(
        '.autorPage_Head_Autor_Content_Text_info '
    );
    const player_music_songs_text = document.querySelector(
        '.player_music_songs_text'
    );
    const img_Icon_Autorh_InPlayers_Img = document.querySelector(
        '.img_Icon_Autorh_InPlayers_Img'
    );
    const autorPage_Head_Autor_Content_Img = document.querySelector(
        '.autorPage_Head_Autor_Content_Img'
    );
    const buttons_Players_Music = document.querySelector(
        '.buttons_Players_Music'
    );

    body.classList.add('body_Players_Music_Open');

    play_Music.classList.add('play_Music_Open');
    range_Audio.classList.add('range_Audio_Open');
    buttons_Players_Music.classList.add('buttons_Players_Music_Open');
    img_Icon_Autorh_InPlayers_Img.classList.add(
        'img_Icon_Autorh_InPlayers_Open'
    );
    player_music_songs_text.classList.add('.player_music_songs_text_open');
}
function remove_switch_panel_players_music() {
    const autorpage_head_author_content_text_info = document.querySelector(
        '.autorPage_Head_Autor_Content_Text_info '
    );
    const player_music_songs_text = document.querySelector(
        '.player_music_songs_text'
    );
    const img_Icon_Autorh_InPlayers_Img = document.querySelector(
        '.img_Icon_Autorh_InPlayers_Img'
    );
    const autorPage_Head_Autor_Content_Img = document.querySelector(
        '.autorPage_Head_Autor_Content_Img'
    );
    const buttons_Players_Music = document.querySelector(
        '.buttons_Players_Music'
    );
    player_music_songs_text.classList.remove('player_music_songs_text_open');
    body.classList.remove('body_Players_Music_Open');
    play_Music.classList.remove('play_Music_Open');
    range_Audio.classList.remove('range_Audio_Open');
    buttons_Players_Music.classList.remove('buttons_Players_Music_Open');
    img_Icon_Autorh_InPlayers.classList.remove(
        'img_Icon_Autorh_InPlayers_Open'
    );
    img_Icon_Autorh_InPlayers_Img.classList.remove(
        'img_Icon_Autorh_InPlayers_Open'
    );
}
