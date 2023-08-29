const token = '1c5939c8eamshe746361478a17abp160705jsn930d56635adb'

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
const urlChannel = 'https://youtube138.p.rapidapi.com/channel/details/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
const optionsChannel = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':`${token}`,
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

// const pathChannel = "channel";
(async(url,options)=>{ 
        let peticion = await fetch (url,options); 
        let response = await peticion.json();
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
})(urlChannel,optionsChannel);


const urlVideos = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
const optionsVideos = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${token}`,
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

// const path= "config";
(async(paramet,config)=>{ 
        let peticion = await fetch (paramet,config) 
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
                            <a href="./play-video.html">${value.video.title}</a>
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
})(urlVideos,optionsVideos);





// FUNCIONES PARA BUSCADOR, TANTO CSS COMO FUNCIONALIDAD
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
		'X-RapidAPI-Key': `${token}`,
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


        return `<a href="./play-video.html" class='searchElement' video-id='${val.video.videoId}'><li><img src="../IMG/lupa.svg" alt="" class='lupaSvg'> ${val.video.title}</li></a>`
    })
    document.querySelector(".resultsDiv").style.display = "inline"
    document.querySelector("#active").style.height = `${h}px`
    document.querySelector("#searchAll").innerHTML = null
    document.querySelector("#searchAll").insertAdjacentHTML("beforeend", array.join(""))

    const searchElement = document.querySelectorAll('.searchElement');

    // Agrega un manejador de eventos a cada tarjeta video
    searchElement.forEach(element => {
        element.addEventListener('click', () => {
            const videoId = element.getAttribute('video-id');

             //GUARDO EL VALOR DEL ATRIBUTO ANTERIORMENTE CREADO
             // PARA SABER EL ID DEL VIDEO AL QUE SE LE DIÓ CLICK
            console.log(videoId);
            localStorage.setItem('ID', videoId)
            });
    })
}