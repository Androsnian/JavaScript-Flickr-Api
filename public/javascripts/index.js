function fetchImageInfo() {
    fetch('http://localhost:3000/images').then(function (response) {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    }).then(function (data) {
        var galleryDiv = document.querySelector(".galleryDiv");
        data.rsp.photos.photo.forEach(photo => {
            var id = photo.$.id;
            var serverId = photo.$.server;
            var secret = photo.$.secret;
            var title = photo.$.title;

            var img = document.createElement("img");
            var div = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML = `<strong>Title: ${title}</strong>`;
            div.className = "photo";
            
            var imageURL = `${photoURL}${serverId}/${id}_${secret}.jpg`;
            img.src = imageURL;
            img.title = title;
            img.alt = "Picture could not be loaded";
            
            div.appendChild(p);
            div.appendChild(img);
            galleryDiv.append(div);
        });
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });

}
const photoURL = `https://live.staticflickr.com/`;
fetchImageInfo();