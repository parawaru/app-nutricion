let alimentos = JSON.parse(localStorage.getItem("alimentos")) || []
let registros = JSON.parse(localStorage.getItem("registros")) || []
let pesos = JSON.parse(localStorage.getItem("pesos")) || []

function cambiarPantalla(nombre){

document.querySelectorAll(".pantalla").forEach(p=>p.classList.remove("active"))

document.getElementById("pantalla-"+nombre).classList.add("active")

}

function guardarAlimento(){

let alimento={

nombre:document.getElementById("nombre").value,
kcal:parseFloat(document.getElementById("kcal").value)

}

alimentos.push(alimento)

localStorage.setItem("alimentos",JSON.stringify(alimentos))

actualizarAlimentos()

}

function actualizarAlimentos(){

let select=document.getElementById("listaAlimentos")
let lista=document.getElementById("listaAlimentosGuardados")

select.innerHTML=""
lista.innerHTML=""

alimentos.forEach((a,i)=>{

let option=document.createElement("option")
option.value=i
option.textContent=a.nombre

select.appendChild(option)

let li=document.createElement("li")
li.textContent=a.nombre+" "+a.kcal+" kcal"

lista.appendChild(li)

})

}

function añadirComida(){

let fecha=document.getElementById("fechaHoy").value
let tipo=document.getElementById("tipoComida").value
let alimento=alimentos[document.getElementById("listaAlimentos").value]
let gramos=document.getElementById("gramos").value

let kcal=(gramos*alimento.kcal)/100

registros.push({fecha,tipo,alimento:alimento.nombre,gramos,kcal})

localStorage.setItem("registros",JSON.stringify(registros))

mostrarHoy()

}

function mostrarHoy(){

let fecha=document.getElementById("fechaHoy").value

let total=0

document.querySelectorAll("ul").forEach(u=>u.innerHTML="")

registros.filter(r=>r.fecha===fecha).forEach(r=>{

let li=document.createElement("li")

li.textContent=r.alimento+" "+r.gramos+"g ("+r.kcal.toFixed(0)+" kcal)"

document.getElementById(r.tipo.toLowerCase()).appendChild(li)

total+=r.kcal

})

document.getElementById("totalHoy").textContent=total.toFixed(0)

dibujarCalorias()

}

function guardarPeso(){

let fecha=document.getElementById("fechaHoy").value
let peso=document.getElementById("pesoInput").value

pesos.push({fecha,peso})

localStorage.setItem("pesos",JSON.stringify(pesos))

dibujarPeso()

}

function dibujarPeso(){

let fechas=pesos.map(p=>p.fecha)
let valores=pesos.map(p=>p.peso)

new Chart(document.getElementById("graficoPeso"),{

type:"line",

data:{
labels:fechas,
datasets:[{label:"Peso",data:valores}]
}

})

}

function dibujarCalorias(){

let datos={}

registros.forEach(r=>{

if(!datos[r.fecha]) datos[r.fecha]=0

datos[r.fecha]+=r.kcal

})

let fechas=Object.keys(datos)
let kcal=Object.values(datos)

new Chart(document.getElementById("graficoCalorias"),{

type:"line",

data:{
labels:fechas,
datasets:[{label:"Calorías",data:kcal}]
}

})

}

function verHistorial(){

let fecha=document.getElementById("fechaHistorial").value

let lista=document.getElementById("historialLista")

lista.innerHTML=""

registros.filter(r=>r.fecha===fecha).forEach(r=>{

let li=document.createElement("li")

li.textContent=r.tipo+" "+r.alimento+" "+r.gramos+"g"

lista.appendChild(li)

})

}

function leerEtiqueta(){

let file=document.getElementById("imagen").files[0]

Tesseract.recognize(file,'spa').then(({data:{text}})=>{

let kcal=text.match(/\d+\s?kcal/i)

if(kcal) document.getElementById("kcal").value=kcal[0].replace("kcal","")

})

}

actualizarAlimentos()