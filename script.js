const search = document.getElementById("search");
const searchBtn = document.getElementById("submit");
const container = document.getElementById("container");

const key = "AIzaSyBL0pQQiUyFuq0BXc5UE1qJIqIpJt3FXqo";

searchBtn.addEventListener("click", (e) => {
    let gifName = search.value
  if (gifName <= 0) {
       e.preventDefault();
         container.innerHTML = `please enter a gif name first!`;
         container.style.color = "red";

    } else {
         container.innerHTML = ''
         e.preventDefault();

         let getUsersRequest = new XMLHttpRequest();
         const URL = `https://tenor.googleapis.com/v2/search?q=${gifName}&key=${key}&limit=8`;
         getUsersRequest.open("GET", URL);

         getUsersRequest.responseType = "json";

         getUsersRequest.onreadystatechange = function () {
           if (getUsersRequest.readyState === 4) {
             let response = getUsersRequest.response;

             if (response && response.results) {
               let result = response.results;
               printGif(result);
             }
           }
         };

         getUsersRequest.send();
    }
});



function printGif(gifsData) {
    gifsData.forEach(gif => {
        let gifBlok = document.createElement('div')
      gifBlok.setAttribute('class', 'gifBlok')
      gifBlok.setAttribute('width', '360')
      gifBlok.setAttribute("height", "360");

        let gifImg = document.createElement('img')
        gifImg.setAttribute("src", gif.media_formats.gif.url);
        gifImg.setAttribute('alt', gif.content_description)
        gifImg.setAttribute('width', '350')

        gifBlok.appendChild(gifImg)
        container.appendChild(gifBlok)

       
    })
}