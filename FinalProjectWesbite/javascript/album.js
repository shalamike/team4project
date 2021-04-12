'use strict';

fetch("http://localhost:8090/artists/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
    let Artist_select = document.querySelector("#createArtistName");
    data.forEach(artist => {
    let option = document.createElement("option");
    option.value = artist.id;
    option.text = artist.name;
    Artist_select.appendChild(option);  
    });
}).catch(err => console.error(err));

fetch("http://localhost:8090/genres/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
    let Genre_select = document.querySelector("#createGenreName");
    data.forEach(Genre => {
    let options = document.createElement("options");
    options.value = Genre.id;
    options.text = Genre.name;
    options.text = Genre.description;
    Genre_select.appendChild(options);  
    });
}).catch(err => console.error(err));



function createAlbum() {
    fetch("http://localhost:8090/Album/", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createArtistname"),
           ArtistName: document.querySelector("#createArtistname").value,
           GenreName: document.querySelector("#createGenre").value,
           description: document.querySelector("#createCover").value

         })
        })
        .then(res => {
          if(res.status!=200){
              console.error(res)
          }  
            res.json()})
        .then((data)=> {
           console.log(`Request succeeded with JSON response ${data}`);
       })
       .catch((error)=> {
           console.log(`Request failed ${error}`);
     });
    

    let Aid= parseInt(document.querySelector("#updateAlbumId").value)
    fetch("http://localhost:8080/Album/"+Aid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#createArtistname"),
            ArtistName: document.querySelector("#createArtistname").value,
            GenreName: document.querySelector("#createGenre").value,
            description: document.querySelector("#createCover").value
           
            
           
         })
        })
        .then(res => {
          if(res.status!=200){
              console.error(res)
          }  
            res.json()})
        .then((data)=> {
           console.log(`Request succeeded with JSON response ${data}`);
       })
       .catch((error)=> {
           console.log(`Request failed ${error}`);
     });
    }



    function delete_album() {
        let pid= parseInt(document.querySelector("#DA_id").value)
         fetch("http://localhost:8080/album/"+pid, {//2
             method: 'delete',//3
           })
           .then((data) => {
             console.log(`Request succeeded with JSON response ${data}`);
             // some function to execute if successful
           })
           .catch((error) => {
             //some function to execute if error
           });
     }