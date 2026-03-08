let database = {

foods:{

desayuno:[],
comida:[],
cena:[]

},

weight:[]

}

function saveDB(){

localStorage.setItem("kcalDB",JSON.stringify(database))

}

function loadDB(){

let data = localStorage.getItem("kcalDB")

if(data){

database = JSON.parse(data)

}

}

loadDB()