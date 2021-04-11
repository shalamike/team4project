function createPlylist() {
    fetch("http://localhost:8090/Playlist", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createPlaylistname"),
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


    

     function updatePlaylist(){
    let Pid= parseInt(document.querySelector("#updatePlaylistId").value)
    fetch("http://localhost:8080/Playlist/"+Pid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#createPlaylistname"),
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



    function delete_Playlist() {
        let pid= parseInt(document.querySelector("#DA_id").value)
         fetch("http://localhost:8080/Playlist/"+pid, {//2
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