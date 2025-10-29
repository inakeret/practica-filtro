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
const numero = document.querySelector("#numero");
const category = document.querySelector("#category");
const oculto = document.querySelector(".oculto");


/*    Eventos   */

document.addEventListener('click', (ev) => {
    //Pulsar categoria seleccionar las fotos
    if(ev.target.classList.contains('btn')){    //Si es un boton
        // Pintamos las imagenes seleccionadas
        pintarImagenesDelTag(ev.target.textContent);
    }

    //Pulsar una foto Relacionada
    if(ev.target.classList.contains('intercambio')){//Si es una imagen relacionada
        // La cambiamos con la principal
        intercambio(ev.target);
    }
})



/*    Funciones   */
//Funcion para obtener una lista de tags ordenada alfabeticamente pasandole como parametro el array
const obtenerTagsUnicos = (array) => {
    let tags = [];
    //recorremos el Array de la propiedad Categoria de cada elemento del Array arrayfotos para conseguir los tags sin repetirlos
    for(let viaje of array){
        for(let tag of viaje.categorias){
            if(!tags.includes(tag)){
                tags.push(tag)
            }
        }
    }
    return tags.sort();
}

//Funcion para selecionar los tags y pintar los botones
const pintarBotones = () =>{

    //Obtener las categorias
    const tags = obtenerTagsUnicos(arrayFotos)

    //Recorremos el Array de tags sin repetir Ordenados alfabéticamente e ir añadiendo los botones al fragmento
    for(let tag of tags.sort()){
        const boton = document.createElement("LI");
        boton.classList.add("btn");
        boton.textContent = tag;
        boton.id = tag.toLowerCase();

        fragment.append(boton)
    }

    //Añadir el fragmento al dom
    menu.append(fragment)
}

//Función para filtrar las fotos en base al tag
const filtrarArrayEnBaseAlTag = (tag) => arrayFotos.filter(elemento => elemento.categorias.includes(tag))

//Funcion para pintar el texto
const pintarTextoTag = (array,tag) => {
    numero.textContent = array.length;
    category.textContent = tag;
    oculto.style.display = "block";
}

//Funcion para pintar la img Principal
const pintarImgPrincipal = (elemento) => {
    //Pintar la primera imagen en su respectivo container
    imgPrincipal.innerHTML = "";
    const imagenPrincipal = document.createElement("IMG");
    const tituloImg = document.createElement("P");
    tituloImg.textContent = elemento.titulo;
    imagenPrincipal.src = elemento.src;
    imagenPrincipal.alt = elemento.alt;
    imgPrincipal.append(tituloImg, imagenPrincipal);
}

//Funcion para pintar las fotos secundarias
const pintarImgSecundarias = (elemento, fragment) => {
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
    return fragment;
}

//Funcion para pintar las fotos de la etiqueta seleccionada
const pintarImagenesDelTag = (tag) => {
    //Conseguir el array filtrado en base al tag
    const seleccion = filtrarArrayEnBaseAlTag(tag);

    //Pintar el texto especial
    pintarTextoTag(seleccion, tag);

    //Pintar la imagen principal
    pintarImgPrincipal(seleccion[0]);

    //Pintar el resto de imágenes en el container de imagenesRelacionadas
    imgSecundario.innerHTML = "";
    let fragment1 = document.createElement("FRAGMENT");
    for(let elemento of seleccion.slice(1)){
        fragment1.append(pintarImgSecundarias(elemento,fragment));
    }

    //Añadir el fragmento de imágenes relacionadas en el dom
    imgSecundario.append(fragment1);
}

//Funcion para encontrar el elementos de un array con el mismo src pasandole como parametro el array y el src
const encontrarImg = (array,src) => {
    return array.find(elemento => src.includes(elemento.src))
}

//Funcion para intercambiar foto secundaria con principal pasando como parametro la img clicada
const intercambio = (img) => {

    //Crear y asignar el elemento que va a pasar a ser la imagen principal
    const elementoPeque = encontrarImg(arrayFotos, img.src); 

    //Obtenemos todos los datos necesarios para asignarlo
    const elementoGrande = encontrarImg(arrayFotos,imgPrincipal.lastElementChild.src);

    let fragment1 = document.createElement("FRAGMENT");
    fragment1.append(pintarImgSecundarias(elementoGrande,fragment));
    pintarImgPrincipal(elementoPeque);

    //Obtener la Figure (caja) en el container de imagenes relacionadas y eliminarla
    const figuraEliminable = document.querySelector(`#${elementoPeque.id}`);
    figuraEliminable.remove();

    //Añadimos la nueva imagen secundaria con el resto de imagenes secundarias
    imgSecundario.append(fragment1);
}

/*    Invocaciones   */

//Invocaion a pintar los botones

pintarBotones()