document.getElementById("app").innerHTML = `

<h2>Registrar comida</h2>

<input type="date" id="fecha">

<select id="tipo">

<option>Desayuno</option>
<option>Almuerzo</option>
<option>Comida</option>
<option>Merienda</option>
<option>Cena</option>

</select>

<input id="alimento" placeholder="alimento">

<input id="kcal" placeholder="kcal">

<button onclick="guardar()">Guardar</button>

<ul id="lista"></ul>

`

let registros = JSON.parse(localStorage.getItem("registros")) || []

function guardar(){

let fecha=document.getElementById("fecha").value

let tipo=document.getElementById("tipo").value

let alimento=document.getElementById("alimento").value

let kcal=document.getElementById("kcal").value

registros.push({fecha,tipo,alimento,kcal})

localStorage.setItem("registros",JSON.stringify(registros))

mostrar()

}

function mostrar(){

let lista=document.getElementById("lista")

lista.innerHTML=""

registros.forEach(r=>{

let li=document.createElement("li")

li.textContent=r.fecha+" "+r.tipo+" "+r.alimento+" "+r.kcal+" kcal"

lista.appendChild(li)

})

}

mostrar()