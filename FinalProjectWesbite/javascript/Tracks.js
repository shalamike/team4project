'use strict';

function fetchTracks(){
  fetch("http://localhost:8090/tracks/read") // 1
    .then(response => {
        if (response.status !== 200) {  //  2
            console.log(response.status);
            console.error(`status: ${reponse.status}`);
            return;
        }
        response.json() // 3
        //.then(data => console.info(data))
        .then(data  => createTracksTable(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
}

function createTracksTable(data){

  console.log(data);
  deleteTable();

  let table = document.getElementById('TrackResultSet');
  let row =  document.createElement('tr');
  let idHeader = document.createElement('th');
  let nameHeader = document.createElement('th');
  let durationHeader = document.createElement('th');
  let lyricHeader = document.createElement('th');
  let AlbumHeader = document.createElement('th');
  let PlayHeader = document.createElement('th');
  idHeader.innerHTML= "Track-ID";
  nameHeader.innerHTML = "Track Name";
  durationHeader.innerHTML = "Track Duration";
  lyricHeader.innerHTML = "Track Lyrics";
  // AlbumHeader.innerHTML = "Track in which Album";
  // PlayHeader.innerHTML = "Track in which Playlist";

  row.appendChild(idHeader);
  row.appendChild(nameHeader);
  row.appendChild(durationHeader);
  row.appendChild(lyricHeader);
  // row.appendChild(AlbumHeader);
  // row.appendChild(PlayHeader);
  table.appendChild(row);
  console.log(data);
  for(let i = 0; i<data.length; i++){
   console.log(data[i].name); 
   console.log(data[i].id);
   let row = document.createElement('tr');
   let cell1 = document.createElement('td')
   let cell2 = document.createElement('td');
   let cell3 = document.createElement('td');
   let cell4 = document.createElement('td');
  //  let cell5 = document.createElement('td');
  //  let cell6 = document.createElement('td');
   cell1.innerHTML = data[i].id;
   cell2.innerHTML = data[i].name;
   cell3.innerHTML = data[i].duration;
   cell4.innerHTML = data[i].lyrics;
  //  cell5.innerHTML = data[i].Album;
  //  cell6.innerHTML = data[i].Play;
   row.appendChild(cell1);
   row.appendChild(cell2);
   row.appendChild(cell3);
   row.appendChild(cell4);
  //  row.appendChild(cell5);
  //  row.appendChild(cell6);
   table.appendChild(row); 
 }
}

function deleteTable(){
  let i = document.getElementById("TrackResultSet").rows.length-1
  for (i; i>=0; i--){
    document.getElementById('TrackResultSet').deleteRow(i);
    console.log("deleted row");
  }
}
function get_Albumandplay(AlbumDropdownID,PlayDropdownID){
  let Album_select = document.querySelector(AlbumDropdownID);
  let Play_select = document.querySelector(PlayDropdownID);
  while(Album_select.firstChild){
    Album_select.removeChild(Album_select.firstChild)
  }
  while(Play_select.firstChild){
    Play_select.removeChild(Play_select.firstChild)
  }
fetch("http://localhost:8090/albums/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
    data.forEach(album => {
    let option = document.createElement("option");
    option.value = album.id;
    option.text = album.name;
    Album_select.appendChild(option);  
    });
}).catch(err => console.error(err));



fetch("http://localhost:8090/playlists/read").then(response => {
    if(response.status != 200) {
        console.error(response);

    }
    return response.json();
}).then(data => {
    data.forEach(Play => {
    let options = document.createElement("option");
    options.value = Play.id;
    options.text = Play.name;
    Play_select.appendChild(options);  
    });
}).catch(err => console.error(err));
}

function createTracks() {
    fetch("http://localhost:8090/tracks/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createTracksName").value,
           duration: document.querySelector("#createTracksDuration").value,
           lyrics: document.querySelector("#createTracksLyrics").value,
           album: {id: parseInt(document.querySelector("#albumName").value)},
           playlist: {id: parseInt(document.querySelector("#PlayName").value)}

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


    

    function updateTracks(){
      let Tid= parseInt(document.querySelector("#updateTrackId").value)
      fetch("http://localhost:8090/tracks/update/"+Tid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            "name": document.querySelector("#updateTrackName").value,
            "duration": document.querySelector("#updateTracksDuration").value,
            "lyrics": document.querySelector("#updateTracksLyrics").value
           
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



    function delete_Tracks() {
        let pid= parseInt(document.querySelector("#delIdCheck").value)
         fetch("http://localhost:8090/tracks/delete/"+pid, {//2
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