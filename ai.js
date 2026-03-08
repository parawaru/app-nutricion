async function analizarEtiqueta(texto){

const response = await fetch("/ai",{

method:"POST",

body:JSON.stringify({

text:texto

})

})

return await response.json()

}