
'use strict';

function fetchArtists(){
  fetch("http://localhost:8090/artists/read") // 1
    .then(response => {
        if (response.status !== 200) {  //  2
            console.log(response.status);
            console.error(`status: ${reponse.status}`);
            return;
        }
        response.json() // 3
        //.then(data => console.info(data))
        .then(data  => createArtistCard(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
}

function createArtistCard(data){
  console.log(data);
}

function createArtist() {
    fetch("http://localhost:8090/artists/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createArtistName").value
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
    



    function updateArtist(){
    let Aid= parseInt(document.querySelector("#updateArtistId").value)
    fetch("http://localhost:8090/artists/update/"+Aid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#updateArtistName").value,
           
         })
        })
        .then(res => {
          if(res.status!=200){
              console.error(res);
              console.log(wrong)
          }  
            res.json()})
        .then((data)=> {
           console.log(`Request succeeded with JSON response ${data}`);
       })
       .catch((error)=> {
           console.log(`Request failed ${error}`);
     });
    }

    function delete_artist() {
        let pid= parseInt(document.querySelector("#DA_id").value)
         fetch("http://localhost:8080/artists/delete/"+pid, {//2
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



