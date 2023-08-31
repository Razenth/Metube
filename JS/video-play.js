const apiKey = '5e3d625457mshf2c6cf0d18fe48ep1b9127jsnb1fd2409046a'


// --------------- FUNCIONALIDAD PARA MOSTRAR VIDEO LATERALES EN LA PÁGINA
const urlVideos = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
const generalOpt = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${apiKey}`,
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};
// const path= "config";
let storageElement2 = localStorage.getItem('Date');

(async(parameters,config) => {
    let peticion = await fetch (parameters,config) 
    let response = await peticion.json()
    console.log(response);

    // INSERTAR TARJETAS DE VIDEO AL PLAY-VIDEO

    let rightSide = document.querySelector('#right-videos')
    if (response.message){
        rightSide.insertAdjacentHTML("beforeend", `
            <div class="vid-list"'>
                SE NOS ACABÓ LA API :(
                <br>    
                <br>
                PORFAVOR BUSCAR OTRA KEY :P
            </div>
        `)
    } 
    rightSide.insertAdjacentHTML('beforeend', `
        ${response.contents.map((value)=>`
        <div videoDate="${value.video.publishedTimeText}" class="side-video-list" video-id='${value.video.videoId}'>
                <a href="./play-video.html" class="small-thumbnail"><img src="${value.video.thumbnails[3].url}"></a>
                <div class="vid-info">
                    <a href="./play-video.html">${value.video.title}</a>
                    <p>CreativeCode</p>
                    <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                </div>
        </div>
        `).join("")}
    `)

    // FUNCION DE QUE ESCUCHARÁ TODAS LAS TARJETAS DE VIDEOS CREADOS AL HACERLE CLICK 
    const videoElements = document.querySelectorAll('.side-video-list');

    // Agrega un manejador de eventos a cada tarjeta video
    videoElements.forEach(video => {
        video.addEventListener('click', () => {
            let videoId = video.getAttribute('video-id');
            let videoDate = video.getAttribute('videoDate');

             //GUARDO EL VALOR DEL ATRIBUTO ANTERIORMENTE CREADO
             // PARA SABER EL ID DEL VIDEO AL QUE SE LE DIÓ CLICK
            localStorage.setItem('ID', videoId)
            localStorage.setItem('Date', videoDate)
            });
    });
})(urlVideos,generalOpt)


//FUNCIONALIDAD PARA MOSTRAR EL VIDEO SELECCIONADO EN EL INDEX
function changingVideo(parameter){
let iframe = document.querySelector('#video-left');

iframe.insertAdjacentHTML('afterbegin', `
    <iframe width="100%" height="615" src="https://www.youtube.com/embed/${parameter}?si=czx-JXcyfxDxe0lv&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`)
}
let storageElement = localStorage.getItem('ID')
changingVideo(storageElement)



// FUNCIONES PARA AGREGAR INFORMACIÓN DEL VIDEO EN LA PÁGINA ----------
const urlVideoInfo = `https://youtube138.p.rapidapi.com/video/details/?id=${storageElement}&hl=en&gl=US`;
const optionsVideoInfo = {
method: 'GET',
headers: {
    'X-RapidAPI-Key': `${apiKey}`,
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
}
};

// let infoVid = 'videoInfo';
(async(url,options)=>{ 
let peticion = await fetch (url,options) 
let response = await peticion.json()
console.log(response);

document.querySelector('.title').insertAdjacentHTML('beforeend', response.title)

let infoVid = document.querySelector('#top-info')

infoVid.insertAdjacentHTML('afterbegin', 
    `
    <h3>${response.title}</h3>

    <div class="play-video-info">
        <p>${response.stats.views} Views &bull; ${storageElement2}</p>
        <div>
            <a href=""><img src="./IMG/like.png">${response.stats.likes}</a>
            <a href=""><img src="./IMG/dislike.png"></a>
            <a href=""><img src="./IMG/share.png">Share</a>
            <a href=""><img src="./IMG/save.png">Save</a>
        </div>
    </div>
    <hr>
    <div class="publisher">
        <a href="./index.html"><img src="${response.author.avatar[2].url}"></a>
        <div>
            <a href="./index.html"><p>${response.author.title}</p></a>
            <span>${response.author.stats.subscribersText}</span>
        </div>
        <button type="button">Subscribe</button>
    </div>
`)

if (response.description == null){
    infoVid.insertAdjacentHTML('beforeend', 
    `
    <div class="vid-description" id="vid-description">
    <p>The author doesn't put a description</p>
    <hr>
    </div>
`)
}
else{
    infoVid.insertAdjacentHTML('beforeend', 
    `
        <div class="vid-description" id="vid-description">
            <p>${response.description}</p>
            <hr>
        </div>
    `)
}
})(urlVideoInfo,generalOpt);



// -------------- INSERTANDO COMENTARIOS A LA PÁGINA

const urlComments = `https://youtube138.p.rapidapi.com/video/comments/?id=${storageElement}&hl=en&gl=US`;
// let commentsVid = 'comments';

(async(url,config)=>{ 
let peticion = await fetch (url,config) 
let response = await peticion.json()
console.log(response);

let vidComm = document.querySelector('#vidComments')
if (response.totalCommentsCount == null){
    vidComm.insertAdjacentHTML('beforeend', `
    <h4>0 Comments</h4>

    <div class="old-comment">
        <div>
            <p>
                The Comments have been desactivated
            </p>
            <div class="comment-action">
            </div>
        </div>
    </div>
    `)
}
else{
    vidComm.insertAdjacentHTML('beforeend', `
        <h4>${response.totalCommentsCount} Comments</h4>
        <div class="add-comment">
            <img src="./IMG/Jack.png" alt="">
            <input type="text" placeholder="Write Comments...">
        </div>
        ${response.comments.map((value)=>`
             <div class="old-comment">
                <img src="${value.author.avatar[1].url}" alt="">
                <div>
                    <h3>${value.author.title} <span>${value.publishedTimeText}</span></h3>
                    <p>
                        ${value.content}
                    </p>
                    <div class="comment-action">
                        <img src="./IMG/like.png">
                        <span>${value.stats.votes}</span>
                        <img src="./IMG/dislike.png">
                        <span></span>

                        <span>REPLY</span>
                        <a href="">${value.stats.replies} Replies</a>
                    </div>
                </div>
            </div>
        `).join("")}
    `)
}
})(urlComments,generalOpt);


//-------- FUNCIONALIDAD Y CSS DE BUSCADOR EN LA PÁGINA
document.querySelector('#chartSearch').addEventListener("change", (e)=>{
    if (e.target.value == ''){
        document.querySelector(".search-box").style.borderRadius = "15px"
        document.querySelector(".resultsDiv").style.display = "none"
    }
    else{
        document.querySelector(".search-box").style.borderRadius = "15px 15px 0 0"
        searchAll(e.target.value);
    }
});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${apiKey}`,
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};
const searchAll = async(p1)=>{
    options.method = 'GET';
    const peticion = await fetch(`https://youtube138.p.rapidapi.com/channel/search/?id=UC8fkwsjcI_MhralEX1g4OBw&q=${p1}&hl=en&gl=US`, options);
    // const peticion = await fetch(`../JSON/search.json`, options);
    const json = await peticion.json();

    let h = 0, cont = 0;
    let array = json.contents.map((val,id)=>{
        if(val.playlist) return undefined;
        else{
            cont++
        }
        if(cont <= 10) h = 30*cont;

        // CREO LA ETIQUETA HTML DEL ELEMENTO DE BUSQUEDA CON UN ATRIBUTO PARA GUARDAR EL ID DEL VIDEO
        return `<a href="./play-video.html" videoDate="${val.video.publishedTimeText}" class='searchElement' video-id='${val.video.videoId}'><li><img src="../IMG/lupa.svg" alt="" class='lupaSvg'> ${val.video.title}</li></a>`
    })
    document.querySelector(".resultsDiv").style.display = "inline"
    document.querySelector("#active").style.height = `${h}px`
    document.querySelector("#searchAll").innerHTML = null
    document.querySelector("#searchAll").insertAdjacentHTML("beforeend", array.join(""))

    const searchElement = document.querySelectorAll('.searchElement');

   // Agrega un manejador de eventos a cada recomendación del buscador
    searchElement.forEach(element => {
        element.addEventListener('click', () => {
            const videoId = element.getAttribute('video-id');
            let videoDate = element.getAttribute('videoDate');

             //GUARDO EL VALOR DEL ATRIBUTO ANTERIORMENTE CREADO
             // PARA SABER EL ID DEL ELEMENTOO AL QUE SE LE DIÓ CLICK
            localStorage.setItem('ID', videoId)
            localStorage.setItem('Date', videoDate)
            });
    })
}



