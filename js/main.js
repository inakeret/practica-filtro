/*    Variables   */
const url = 'assets';

const fragment = document.createDocumentFragment();

const arrayFotos = [
    {
        id: 'v1',
        src: `${url}/viajes/viajes-1.jpg`,
        alt: "Viaje 1",
        categorias: ["Playa", "Naturaleza", "Aventura"],
        titulo: "Título viaje 1"
    },
    {
        id: 'v2',
        src: `${url}/viajes/viajes-2.jpg`,
        alt: "Viaje 2",
        categorias: ["Playa", "Naturaleza"],
        titulo: "Título viaje 2"
    },
    {
        id: 'v3',
        src: `${url}/viajes/viajes-3.jpg`,
        alt: "Viaje 3",
        categorias: ["Aventura", "Ciudad"],
        titulo: "Título viaje 3"
    },
    {
        id: 'v4',
        src: `${url}/viajes/viajes-4.jpg`,
        alt: "Viaje 4",
        categorias: ["Ciudad", "Historia"],
        titulo: "Título viaje 4"
    },
    {
        id: 'v5',
        src: `${url}/viajes/viajes-5.jpg`,
        alt: "Viaje 5",
        categorias: ["Ciudad", "Historia", "Aventura"],
        titulo: "Título viaje 5"
    },
    {
        id: 'v6',
        src: `${url}/viajes/viajes-6.jpg`,
        alt: "Viaje 6",
        categorias: ["Naturaleza", "Aventura"],
        titulo: "Título viaje 6"
    },
    {
        id: 'v7',
        src: `${url}/viajes/viajes-7.jpg`,
        alt: "Viaje 7",
        categorias: ["Historia", "Naturaleza"],
        titulo: "Título viaje 7"
    }
];
/*    Capturar elemntos del dom    */

const menu = document.querySelector("#botonContainer");
const imgPrincipal = document.querySelector("#imagenPrincipal");
const imgSecundario = document.querySelector("#imagenesRelacionadas");



/*    Eventos   */

//Pulsar categoria seleccionar las fotos
document.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('btn')){
        pintarImagenesDelTag(ev.target.textContent);
    }

    if(ev.target.classList.contains('intercambio')){
        console.log(ev.target);
        intercambio(ev.target);
    }
})


//Pulsar las fotos de abajo cambiar a primer plano
// document.addEventListener('click', (ev) => {
//     if(ev.target.classList.contains('intercambio')){
//         console.log("cambiar Imagen");
//         //intercambio(ev.target);
//     }
// })



/*    Funciones   */

//Funcion para selecionar los tags y pintar los botones
const pintarBotones = () =>{
    let tags = [];
    for(let viaje of arrayFotos){
        for(let tag of viaje.categorias){
            if(!tags.includes(tag)){
                tags.push(tag)
            }
        }
    }

    for(let tag of tags.sort()){
        const boton = document.createElement("LI");
        boton.classList.add("btn");
        boton.textContent = tag;
        boton.id = tag.toLowerCase();

        fragment.append(boton)
    }

    menu.append(fragment)
}

//Función para filtrar las fotos en base al tag
const filtrarArrayEnBaseAlTag = (tag) => arrayFotos.filter(elemento => elemento.categorias.includes(tag))


//Funcion para pintar las fotos de la etiqueta seleccionada
const pintarImagenesDelTag = (tag) => {
    
    const seleccion = filtrarArrayEnBaseAlTag(tag);
    //Pintar imagen Grande sleccion[0]
    imgPrincipal.innerHTML = ""; //vaciar el contenido anterior
    const textoMatches = document.createElement("P");
    textoMatches.innerHTML = `Se han encontrado <span class="negrita">${seleccion.length}</span> imágenes de la categoría <span class="negrita">${tag}</span>`;
    const figuraPrincipal = document.createElement("FIGURE");
    figuraPrincipal.id = 'imgGrande';
    const imagenPrincipal = document.createElement("IMG");
    const tituloImg = document.createElement("P");
    tituloImg.textContent = seleccion[0].titulo;
    imagenPrincipal.src = seleccion[0].src;
    imagenPrincipal.alt = seleccion[0].alt;
    figuraPrincipal.append(tituloImg);
    figuraPrincipal.append(imagenPrincipal);
    imgPrincipal.append(textoMatches,figuraPrincipal);

    //Pintar el sobrante
    imgSecundario.innerHTML = "";
    for(let elemento of seleccion.slice(1)){
        const figuraSecundaria = document.createElement("FIGURE");
        figuraSecundaria.id = elemento.id;
        const imagenSecundaria = document.createElement("IMG");
        imagenSecundaria.classList.add("intercambio");
        const titleImg = document.createElement("P");
        titleImg.textContent = elemento.titulo;
        imagenSecundaria.src = elemento.src;
        imagenSecundaria.alt = elemento.alt;
        figuraSecundaria.append(titleImg,imagenSecundaria);
        fragment.append(figuraSecundaria);
    }
    imgSecundario.append(fragment);
}

//Funcion para intercambiar foto secundaria con principal
const intercambio = (img) => {

    const figurePeque = document.createElement("FIGURE");
    figurePeque.id = "imgGrande";
    const titlePeque = document.createElement("P");

    const elementoPeque = arrayFotos.find(elemento => img.src.includes(elemento.src)); 
    titlePeque.textContent = elementoPeque.titulo;

    const imgPeque = document.createElement("IMG");
    imgPeque.src = elementoPeque.src;
    imgPeque.alt = elementoPeque.alt;

    figurePeque.append(titlePeque,imgPeque);
    fragment.append(figurePeque);
    const figuraEliminable = document.querySelector(`#${elementoPeque.id}`);
    figuraEliminable.remove();


    const imagenGrande = document.querySelector("#imgGrande");

    const figureGrande = document.createElement("FIGURE");
    const elementoGrande = arrayFotos.find(elemento => imagenGrande.lastElementChild.src.includes(elemento.src));
    figureGrande.id = elementoGrande.id;
    const titleGrande = document.createElement("P");
    //console.log(imagenGrande)
    titleGrande.textContent = imagenGrande.firstElementChild.textContent; 

    const imgGrande = document.createElement("IMG");
    imgGrande.classList.add("intercambio");
    imgGrande.src = imagenGrande.lastElementChild.src;
    imgGrande.alt = imagenGrande.lastElementChild.alt;
    figureGrande.append(titleGrande,imgGrande);


    imagenGrande.remove();
    imgPrincipal.append(fragment);
    imgSecundario.append(figureGrande);
}

/*    Invocaciones   */

//Invocaion a pintar los botones

pintarBotones()