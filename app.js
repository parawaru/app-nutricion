let alimentos = JSON.parse(localStorage.getItem("alimentos")) || []
let registros = JSON.parse(localStorage.getItem("registros")) || []
let ejercicios = JSON.parse(localStorage.getItem("ejercicios")) || []
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

let lista=document.getElementById("listaHoy")

lista.innerHTML=""

let total=0

registros.filter(r=>r.fecha===fecha).forEach(r=>{

let li=document.createElement("li")

li.textContent=r.tipo+" - "+r.alimento+" "+r.gramos+"g ("+r.kcal.toFixed(0)+" kcal)"

lista.appendChild(li)

total+=r.kcal

})

document.getElementById("totalHoy").textContent=total.toFixed(0)

}

function añadirEjercicio(){

let fecha=document.getElementById("fechaHoy").value
let nombre=document.getElementById("ejercicioNombreHoy").value
let kcal=document.getElementById("ejercicioKcalHoy").value

ejercicios.push({fecha,nombre,kcal})

localStorage.setItem("ejercicios",JSON.stringify(ejercicios))

}

actualizarAlimentos()
