'use strict';
function fetchalbum(){
 fetch("http://localhost:8090/albums/read") // 1
    .then(response => {
        if (response.status !== 200) {  //  2
            console.log(response.status);
            console.error(`status: ${reponse.status}`);
            return;
        }
        response.json() // 3
        //.then(data => console.info(data))
        .then(data  => createAlbumTable(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
  }
  function createAlbumTable(data){

    console.log(data);
    deleteTable();
  
    let table = document.getElementById("AlbumResultSet");
    let row =  document.createElement('tr');
    let idHeader = document.createElement('th');
    let nameHeader = document.createElement('th');
    let TrackHeader = document.createElement('th');
    let coverHeader = document.createElement('th');
    let artistHeader = document.createElement('th');
    let genreHeader = document.createElement('th');
    idHeader.innerHTML= "Album-ID";
    nameHeader.innerHTML = "Album Name";
    TrackHeader.innerHTML = "Track Name";
    coverHeader.innerHTML = "Album Description";
    artistHeader.innerHTML = "Artist ";
    genreHeader.innerHTML = "genre ";
    row.appendChild(idHeader);
    row.appendChild(nameHeader);
    row.appendChild(TrackHeader);
    row.appendChild(coverHeader);
    row.appendChild(artistHeader);
    row.appendChild(genreHeader);
    table.appendChild(row);
  
    for(let i = 0; i<data.length; i++){
     console.log(data[i].name); 
     let row = document.createElement('tr');
     let cell1 = document.createElement('td')
     let cell2 = document.createElement('td');
     let cell3 = document.createElement('td');
     let cell4 = document.createElement('td');
     let cell5 = document.createElement('td');
     let cell6 = document.createElement('td');

     cell1.innerHTML = data[i].id;
     cell2.innerHTML = data[i].name;
    //  cell3.innerHTML = data[i].tracks[i].name;
    for(let j=0;j<data[i].tracks.length;j++){
      let row1 = document.createElement('tr');
      let innercell = document.createElement('td');
      innercell.innerHTML = data[i].tracks[j].name;
      row1.appendChild(innercell);
      cell3.appendChild(row1);
    }
     cell4.innerHTML = data[i].cover;
     cell5.innerHTML = data[i].artist;
     cell6.innerHTML = data[i].genre;
     row.appendChild(cell1);
     row.appendChild(cell2);
     row.appendChild(cell3);
     row.appendChild(cell4);
     row.appendChild(cell5);
     row.appendChild(cell6);
     table.appendChild(row); 
   }
  }

  function deleteTable(){
    let i = document.getElementById("AlbumResultSet").rows.length-1
    for (i; i>=0; i--){
      document.getElementById('AlbumResultSet').deleteRow(i);
      console.log("deleted row");
    }
  }



function get_Aristsandgenre(ArtistDropdownID,GenreDropdownID){
  let Artist_select = document.querySelector(ArtistDropdownID);
  let Genre_select = document.querySelector(GenreDropdownID);
  // let Track_select = document.querySelector(TrackDropdownID);
  while(Artist_select.firstChild){
    Artist_select.removeChild(Artist_select.firstChild)
  }
  while(Genre_select.firstChild){
    Genre_select.removeChild(Genre_select.firstChild)
  }
  // while(Track_select.firstChild){
  //   Track_select.removeChild(Track_select.firstChild)
  // }

fetch("http://localhost:8090/artists/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
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
    data.forEach(Genre => {
    let options = document.createElement("option");
    options.value = Genre.id;
    options.text = Genre.name;
    
    Genre_select.appendChild(options);  
    });
}).catch(err => console.error(err));

//   fetch("http://localhost:8090/tracks/read").then(response => {
//     if(response.status != 200) {
//         console.error(response);

//     }
//     return response.json();
// }).then(data => {
//     data.forEach(Track => {
//     let optionss = document.createElement("option");
//     optionss.value = Track.id;
//     optionss.text = Track.name;
    
//     Track_select.appendChild(optionss); 
   
// });
// }).catch(err => console.error(err));
}



function createAlbum() {
    fetch("http://localhost:8090/albums/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createAlbumName").value,
           artist: {id: parseInt(document.querySelector("#ArtistName").value)},
           genre: {id: parseInt(document.querySelector("#GenreName").value)},
           cover: document.querySelector("#createCover").value
          
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
    fetch("http://localhost:8090/albums/update/"+Aid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#updateAlbumName").value,
            ArtistName: document.querySelector("#uArtistName").value,
            GenreName: document.querySelector("#uGenreName").value,
            cover: document.querySelector("#updateCover").value
           
            
           
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
        let pid= parseInt(document.querySelector("#delIdCheck").value)
         fetch("http://localhost:8090/albums/delete/"+pid, {//2
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