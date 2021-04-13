function fetchgenres(){
  fetch("http://localhost:8090/genres/read") // 1
    .then(response => {
        if (response.status !== 200) {  //  2
            console.log(response.status);
            console.error(`status: ${reponse.status}`);
            return;
        }
        response.json() // 3
        //.then(data => console.info(data))
        .then(data  => creategenresCards(data))// 4
    }).catch((err)=> console.error(`${err}`)); // 5
}

function creategenresCards(data){

  console.log(data);
  deleteTable();

  let table = document.querySelector("#GenresResultSet");
  let row =  document.createElement('tr');
  let idHeader = document.createElement('th');
  let nameHeader = document.createElement('th');
  let descriptionHeader = document.createElement('th');
  idHeader.innerHTML= "Genre-ID";
  nameHeader.innerHTML = "Genre Name";
  descriptionHeader.innerHTML = "Genre Description";
  row.appendChild(idHeader);
  row.appendChild(nameHeader);
  row.appendChild(descriptionHeader);
  table.appendChild(row);

  for(let i = 0; i<data.length; i++){
   console.log(data[i].name); 
   let row = document.createElement('tr');
   let cell1 = document.createElement('td')
   let cell2 = document.createElement('td');
   let cell3 = document.createElement('td');
   cell1.innerHTML = data[i].id;
   cell2.innerHTML = data[i].name;
   cell3.innerHTML = data[i].description;
   row.appendChild(cell1);
   row.appendChild(cell2);
   row.appendChild(cell3);
   table.appendChild(row); 
 }
}

function deleteTable(){
  let i = document.getElementById("GenresResultSet").rows.length-1
  for (i; i>=0; i--){
    document.getElementById('GenresResultSet').deleteRow(i);
    console.log("deleted row");
  }
}






function createGenre() {
    fetch("http://localhost:8090/genres/create", {
       method: 'post',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
           name: document.querySelector("#createGenresName").value,
           description: document.querySelector("#createGenresDescription").value

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


    

     function updateGenre(){
    let Gid= parseInt(document.querySelector("#updateGenreId").value)
    fetch("http://localhost:8090/genres/update/"+Gid, {
       method: 'put',
        headers: {
          "Content-type": "application/json"
      },
        body: JSON.stringify({
            name: document.querySelector("#updateGenreName").value,
            description: document.querySelector("#UpdateGenresDescription").value
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
        let pid= parseInt(document.querySelector("#delIdCheck").value)
         fetch("http://localhost:8090/genres/delete/"+pid, {//2
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