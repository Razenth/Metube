// ----------- STYLE AND HTML CONFIG MENU-ICON

let menuIcon = document.querySelector('.menu-icon');
let sidebar = document.querySelector('.sidebar');
let container = document.querySelector('.container')

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

// -------------------------------------------------------


// IMPORT DATA CHANNEL AND MAKING TESTS

const creativeCodeURL = 'UC8fkwsjcI_MhralEX1g4OBw';
// const urlChannel = 'https://youtube138.p.rapidapi.com/channel/details/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
// const optionsChannel = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '934a7bd36amsh12abd614806dcaap162e10jsnfbadd68f361e',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

const pathChannel = "channel";
(async(url)=>{ 
        let peticion = await fetch (`./JSON/${url}.json`) 
        let response = await peticion.json()
        console.log(response);


        // BANNER IMAGE
        let myBanner = document.querySelector('#myBanner');
        myBanner.insertAdjacentHTML("beforeend", `
            <img src="${response.banner.desktop[0].url}">
        `)


        // CHANNEL INFO

        let myChannelInfo = document.querySelector('#channelInfo');
        myChannelInfo.insertAdjacentHTML("beforeend", `
            <img src="${response.avatar[2].url}" alt="channelPicture">
            <div class="channel-subinfo flex-div">
                <div class="realinfo">
                    <h3>${response.title}</h3>
                    <div class="flex-div">
                        <span>${response.username}</span>
                        <span>${response.stats.subscribersText}</span>
                        <span>${response.stats.videosText}</span>
                    </div>
                    <a href=""><p>More information about this channel ></p></a>
                </div>
                <div class="contButton">
                    <button type="button">Subscribe</button>
                </div>
            </div>
        `)
})(pathChannel);


// const urlVideos = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
// const optionsVideos = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '934a7bd36amsh12abd614806dcaap162e10jsnfbadd68f361e',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

const path= "config";
(async(paramet)=>{ 
        let peticion = await fetch (`./JSON/${paramet}.json`) 
        let response = await peticion.json()
        console.log(response);


        // INSERTAR TARJETAS DE VIDEO AL INDEX.HTML
        let myVideos = document.querySelector('#vid-container');

        myVideos.insertAdjacentHTML("beforeend", `
            ${response.contents.map((value)=>`
                <div class="vid-list" video-id='${value.video.videoId}'>
                    <a href="./play-video.html"><img src="${value.video.thumbnails[3].url}" class="thumbnail"></a>
                    <div class="flex-div">
                        <div class="vid-info">
                            <a href=""></a>
                            <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                        </div>
                    </div>
                </div>
                `).join("")}
        `)


        // FUNCION DE QUE ESCUCHARÁ TODAS LAS TARJETAS DE VIDEOS CREADOS AL HACERLE CLICK 
        const videoElements = document.querySelectorAll('.vid-list');

        // Agrega un manejador de eventos a cada tarjeta video
        videoElements.forEach(video => {
            video.addEventListener('click', () => {
                let videoId = video.getAttribute('video-id');

                 //GUARDO EL VALOR DEL ATRIBUTO ANTERIORMENTE CREADO
                 // PARA SABER EL ID DEL VIDEO AL QUE SE LE DIÓ CLICK
                localStorage.setItem('ID', videoId)
                });
        });
})(path);


(async(parameters) => {

        let peticion = await fetch (`./JSON/${parameters}.json`) 
        let response = await peticion.json()
        console.log(response);

        // INSERTAR TARJETAS DE VIDEO AL PLAY-VIDEO

        let rightSide = document.querySelector('#right-videos')
        rightSide.insertAdjacentHTML('beforeend', `
            ${response.contents.map((value)=>`
            <div class="side-video-list" video-id='${value.video.videoId}'>
                    <a href="./play-video.html" class="small-thumbnail"><img src="${value.video.thumbnails[3].url}"></a>
                    <div class="vid-info">
                        <a href="">${value.video.title}</a>
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

                 //GUARDO EL VALOR DEL ATRIBUTO ANTERIORMENTE CREADO
                 // PARA SABER EL ID DEL VIDEO AL QUE SE LE DIÓ CLICK
                localStorage.setItem('ID', videoId)
                });
        });
})(path)





 //Funcion para cambiar el video según video seleccionado
function changingVideo(parameter){
    let iframe = document.querySelector('#video-left');
    iframe.insertAdjacentHTML('afterbegin', `
    <iframe width="100%" height="615" src="https://www.youtube.com/embed/${parameter}?si=czx-JXcyfxDxe0lv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `)
}

let storageElement = localStorage.getItem('ID')
console.log(storageElement);
changingVideo(storageElement)


// const urlVideoInfo = `https://youtube138.p.rapidapi.com/video/details/?id=${storageElement}&hl=en&gl=US`;
const optionsVideoInfo = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '934a7bd36amsh12abd614806dcaap162e10jsnfbadd68f361e',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

let infoVid = 'videoInfo';
(async(url)=>{ 
    let peticion = await fetch (`./JSON/${url}.json`) 
    let response = await peticion.json()
    console.log(response);

    let infoVid = document.querySelector('#top-info')

    infoVid.insertAdjacentHTML('afterend', 
    `
        <h3>${response.title}</h3>

        <div class="play-video-info">
            <p>${response.stats.views} Views &bull; Publish Date: ${response.publishedDate}</p>
            <div>
                <a href=""><img src="../IMG/like.png">${response.stats.likes}</a>
                <a href=""><img src="../IMG/dislike.png"></a>
                <a href=""><img src="../IMG/share.png">Share</a>
                <a href=""><img src="../IMG/save.png">Save</a>
            </div>
        </div>
        <hr>
        <div class="publisher">
            <img src="${response.author.avatar[2].url}">
            <div>
                <p>${response.author.title}</p>
                <span>${response.author.stats.subscribersText}</span>
            </div>
            <button type="button">Subscribe</button>
        </div>
        
        <div class="vid-description" id="vid-description">
            <p>${response.description}</p>
            <hr>
        </div>
    `)
})(infoVid);

let commentsVid = 'comments';

(async(url)=>{ 
    let peticion = await fetch (`./JSON/${url}.json`) 
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
                <img src="../IMG/Jack.png" alt="">
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
                            <img src="../IMG/like.png">
                            <span>${value.stats.votes}</span>
                            <img src="../IMG/dislike.png">
                            <span></span>

                            <span>REPLY</span>
                            <a href="">${value.stats.replies} Replies</a>
                        </div>
                    </div>
                </div>
            `).join("")}
        `)
    }
})(commentsVid);




