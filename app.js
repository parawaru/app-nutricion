let goal = 1400

function renderMeals(){

for(let meal in database.foods){

let container = document.getElementById(meal)

container.innerHTML=""

database.foods[meal].forEach((food,index)=>{

let div=document.createElement("div")

div.className="food"

div.innerHTML=`

${food.name} (${food.kcal} kcal)

<span onclick="deleteFood('${meal}',${index})">✕</span>

`

container.appendChild(div)

})

}

updateDashboard()

}

function updateDashboard(){

let total=0

for(let meal in database.foods){

database.foods[meal].forEach(f=>{

total+=f.kcal

})

}

document.getElementById("foodTotal").innerText=total

document.getElementById("remaining").innerText=goal-total

}

function addFood(meal){

let name=prompt("Alimento")

let kcal=parseInt(prompt("Kcal"))

if(!name||!kcal)return

database.foods[meal].push({name,kcal})

saveDB()

renderMeals()

}

function deleteFood(meal,index){

database.foods[meal].splice(index,1)

saveDB()

renderMeals()

}

function quickAdd(){

let meal=prompt("desayuno/comida/cena")

addFood(meal)

}

renderMeals()