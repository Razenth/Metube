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

// const urlChannel = 'https://youtube138.p.rapidapi.com/channel/details/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
const optionsChannel = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '934a7bd36amsh12abd614806dcaap162e10jsnfbadd68f361e',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

(async(url,config)=>{ 
        let peticion = await fetch (url,config) 
        let response = await peticion.json()
        console.log(response);

        let myBanner = document.querySelector('#myBanner');
        myBanner.insertAdjacentHTML("beforeend", `
            <img src="${response.banner.desktop[0].url}">
        `)

})(urlChannel,optionsChannel);


// const urlVideos = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US';
const optionsVideos = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '934a7bd36amsh12abd614806dcaap162e10jsnfbadd68f361e',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

(async(url,config)=>{ 
        let peticion = await fetch (url,config) 
        let response = await peticion.json()
        console.log(response);

        let myVideos = document.querySelector('#vid-container');
        myVideos.insertAdjacentHTML("beforeend", `
            ${response.contents.map((value)=>`
                <div class="vid-list">
                    <a href="./HTML/play-video.html"><img src="${value.video.thumbnails[3].url}" class="thumbnail"></a>
                    <div class="flex-div">
                        <div class="vid-info">
                            <a href="">${value.video.title}</a>
                            <p>${value.video.stats.views} Views &bull; ${value.video.publishedTimeText}</p>
                        </div>
                    </div>
                </div>
                `).join("")}
        `)

})(urlVideos,optionsVideos);