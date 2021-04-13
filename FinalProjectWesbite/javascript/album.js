'use strict';
//function get_Aristsandgenre(){
fetch("http://localhost:8090/artists/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
    let Artist_select = document.querySelector("#ArtistName");
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
    let Genre_select = document.querySelector("#GenreName");
    data.forEach(Genre => {
    let options = document.createElement("options");
    options.value = Genre.id;
    options.text = Genre.name;
    // options.text += Genre.description;
    Genre_select.appendChild(options);  
    });
}).catch(err => console.error(err));
//}


function createAlbum() {
    fetch("http://localhost:8090/albums/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createAlbumName").value,
           ArtistName: document.querySelector("#ArtistName").value,
           GenreName: document.querySelector("#GenreName").value,
           description: document.querySelector("#createCover").value

         })
        })
        .then(res => {
          if(res.status!=201){
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
    

    function updatealbum(){
     let Aid= parseInt(document.querySelector("#updateAlbumId").value)
    fetch("http://localhost:8080/albums/update/"+Aid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#createArtistname").value,
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
         fetch("http://localhost:8080/album/delete/"+pid, {//2
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