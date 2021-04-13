
'use strict';
function fetchplay(){


  fetch("http://localhost:8090/playlists/read") // 1
    .then(response => {
        if (response.status !== 200) {  //  2
            console.log(response.status);
            console.error(`status: ${reponse.status}`);
            return;
        }
        response.json() // 3
        //.then(data => console.info(data))
        .then(data  => createPlaylistTable(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
  }

  function createPlaylistTable(data){

    console.log(data);
    deleteTable();
  
    let table = document.getElementById("PlayResultSet");
    let row =  document.createElement('tr');
    let idHeader = document.createElement('th');
    let nameHeader = document.createElement('th');
    let descriptionHeader = document.createElement('th');
    let artworkHeader = document.createElement('th');
    idHeader.innerHTML= "Play-ID";
    nameHeader.innerHTML = "Play Name";
    descriptionHeader.innerHTML = "Play Description";
    artworkHeader.innerHTML = "Play Artwork";
    row.appendChild(idHeader);
    row.appendChild(nameHeader);
    row.appendChild(descriptionHeader);
    row.appendChild(artworkHeader);
    table.appendChild(row);
  
    for(let i = 0; i<data.length; i++){
     console.log(data[i].name); 
     let row = document.createElement('tr');
     let cell1 = document.createElement('td')
     let cell2 = document.createElement('td');
     let cell3 = document.createElement('td');
     let cell4 = document.createElement('td');
     cell1.innerHTML = data[i].id;
     cell2.innerHTML = data[i].name;
     cell3.innerHTML = data[i].description;
     cell4.innerHTML = data[i].artwork;
     row.appendChild(cell1);
     row.appendChild(cell2);
     row.appendChild(cell3);
     row.appendChild(cell4);
     table.appendChild(row); 
   }
  }

  function deleteTable(){
    let i = document.getElementById("PlayResultSet").rows.length-1
    for (i; i>=0; i--){
      document.getElementById('PlayResultSet').deleteRow(i);
      console.log("deleted row");
    }
  }

function createPlaylist() {
    fetch("http://localhost:8090/playlists/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createPlaylistsName").value,
           description: document.querySelector("#createPlaylistsDescription").value,
           artwork: document.querySelector("#createPlaylistsArtwork").value

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


    

     function updatePlaylist(){
    let Pid= parseInt(document.querySelector("#updatePlaylistsId").value)
    fetch("http://localhost:8090/playlists/update/"+Pid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#updatePlaylistsName").value,
            description: document.querySelector("#updatePlaylistsDescription").value,
            artwork: document.querySelector("#updatePlaylistsArtwork").value
            
           
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



    function delete_Playlist() {
        let pid= parseInt(document.querySelector("#delIdCheck").value)
         fetch("http://localhost:8090/playlists/delete/"+pid, {//2
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