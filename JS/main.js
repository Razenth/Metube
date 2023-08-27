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
                            <a href="">${value.video.title}</a>
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
})(path)






function changingVideo(parameter){ //Funcion para cambiar el video según video seleccionado
    let iframe = document.querySelector('#video-left');
    iframe.insertAdjacentHTML('afterbegin', `
    <iframe width="100%" height="615" src="https://www.youtube.com/embed/${parameter}?si=czx-JXcyfxDxe0lv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
` )
}

let storageElement = localStorage.getItem('ID')
console.log(storageElement);
changingVideo(storageElement)





