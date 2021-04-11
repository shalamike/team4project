function createGenre() {
    fetch("http://localhost:8090/Genre/", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createGenrename"),
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


    

     function updateGenre(){
    let Gid= parseInt(document.querySelector("#updateGenreId").value)
    fetch("http://localhost:8080/Genre/"+Gid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#createGenrename"),
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



    function delete_Genre() {
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