'use strict';


function createTracks() {
    fetch("http://localhost:8090/Tracks/", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createTracksname"),
           Time: document.querySelector("#Duration").value,
           Lyrics: document.querySelector("#createLyrics").value

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


    

     function updateTracks(){
    let Tid= parseInt(document.querySelector("#updateTracks").value)
    fetch("http://localhost:8080/Tracks/"+Tid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#createTracksname"),
            Time: document.querySelector("#Duration").value,
            Lyrics: document.querySelector("#createLyrics").value
           
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
        let pid= parseInt(document.querySelector("#DA_id").value)
         fetch("http://localhost:8080/Tracks/"+pid, {//2
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