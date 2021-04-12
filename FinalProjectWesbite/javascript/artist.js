
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
        .then(data  => createArtistsCards(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
}

function createArtistsCards(data){

  console.log(data);
  //deleteTable();

 let table = document.querySelector("#artistResultSet");
 let row =  document.createElement('tr');
 let idHeader = document.createElement('th');
 let nameHeader = document.createElement('th')
 idHeader.innerHTML= "Artist-ID";
 nameHeader.innerHTML = "Artist Name";
 table.appendChild(row);
 for(let i = 0; i<data.length; i++){
   console.log(data[i].name); 
   let row = document.createElement('tr');
   let cell1 = document.createElement('td')
   let cell2 = document.createElement('td');
   cell1.innerHTML = data[i].id;
   cell2.innerHTML = data[i].name;
   row.appendChild(cell1);
   row.appendChild(cell2);
   table.appendChild(row); 
 }
}

function deleteTable(){
  for (let i = document.querySelector("#artistResultSet").rows.length-1; i>0; i--){
    document.querySelector('artistResultSet').deleteRow(i);
    console.log("deleted row");
  }
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
    fetch("http://localhost:8080/artist/"+Aid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#personname").value,
           
            
           
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

    function delete_artist() {
        let pid= parseInt(document.querySelector("#DA_id").value)
         fetch("http://localhost:8080/artist/"+pid, {//2
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



