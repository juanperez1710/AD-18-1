const itemsContainer = document.querySelector("#list-items");
const URL_API="https://reqres.in/api/unknown";
const apiKey="reqres-free-v1";
const STORAGE_KEY = "coloresGuardados"

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)

}
/**
 * Tareas 1 y 2: 
 * function fetchColorsList() {
  fetch(URL_API)
  .then((response)=> response.json())
  .then((data)=>{
    const colors=data.data;
    colors.forEach((color)=>{
      addItem(color);
    })
  }).catch((error)=>{
    console.log(error)
  })
}
 */

/* Tarea 3: */
function fetchColorsList() {
  fetch(URL_API)
  .then((response)=> response.json())
  .then((data)=>{
    const colors=data.data;
    const colorsCadena=JSON.stringify(colors);
    localStorage.setItem(STORAGE_KEY,colorsCadena);
    colors.forEach((color)=>{
      addItem(color);
    })
  }).catch((error)=>{
    console.log(error);
  })
}

/** Tarea 4: */

function renderColors(colorsArray){
  itemsContainer.innerHTML="";
  colorsArray.forEach((color)=>{
    addItem(color);
  })
}

function loadColorsFromStorage() {
  const colorsCadena=localStorage.getItem(STORAGE_KEY);
  if (colorsCadena){
    console.log("Colores almacenados en local storage");
    const colors=JSON.parse(colorsCadena);
    renderColors(colors);
    return true;
  }else{
    console.log("No hay colores guardados en local storage");
    return false;
  }
}

/** Tarea 5 */
function limpiarColores(){
  localStorage.removeItem(STORAGE_KEY);
  console.log("Colores eliminados del local storage");
  itemsContainer.innerHTML="";
}

fetchColorsList()
loadColorsFromStorage()