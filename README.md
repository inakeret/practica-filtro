# Práctica Filtro – Galería de Imágenes Interactiva

Este proyecto es una galería de fotos dinámica creada con HTML, CSS y JavaScript puro.  
Permite filtrar imágenes por categoría, mostrar el número de resultados encontrados y cambiar la imagen principal por cualquiera de las relacionadas con un solo clic.

---

## Índice

- [Vista general](#vista-general)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Descripción de los archivos](#descripción-de-los-archivos)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Funcionalidades principales](#funcionalidades-principales)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Recursos gráficos](#recursos-gráficos)
- [Autor](#autor)
- [Licencia](#licencia)

---

## Vista general

La página muestra un encabezado con el título “Práctica Filtro” y una sección principal donde:
- Se generan botones dinámicos para cada categoría de fotos.
- Se visualiza una imagen principal acompañada de su título.
- Debajo aparecen imágenes relacionadas según la categoría seleccionada.
- Al hacer clic sobre una imagen relacionada, esta se intercambia con la imagen principal.

El diseño es responsive y se adapta correctamente a diferentes tamaños de pantalla.

---

## Estructura del proyecto

```
proyecto-filtro
├── index.html
├── css/
│ └── main.css
├── js/
│ └── main.js
├── assets/
│ ├── viajes/
│ │ ├── viajes-1.jpg
│ │ ├── viajes-2.jpg
│ │ ├── viajes-3.jpg
│ │ ├── viajes-4.jpg
│ │ ├── viajes-5.jpg
│ │ ├── viajes-6.jpg
│ │ └── viajes-7.jpg
│ └── imagenescss/
│ ├── fondo.jpg
│ └── fondo_grande.jpg
└── README.md
```

---

## Descripción de los archivos

### index.html
Estructura principal de la aplicación:
- Header con el título de la página.  
- Main con el menú de categorías, la imagen principal y las imágenes relacionadas.  
- Footer con un aviso legal o información complementaria.  
Incluye la carga de los estilos desde `css/main.css` y el script principal `js/main.js`.

### css/main.css
Define la apariencia visual:
- Uso de gradientes, flexbox y grid.  
- Diseño responsive con tres puntos de ruptura (768px, 992px y 1200px).  
- Efectos de hover y escalado en las imágenes.  
- Fondos personalizados con imágenes de la carpeta `assets/imagenescss/`.

### js/main.js
Controla toda la interacción dinámica:
- Crea los botones de categorías de forma automática.  
- Filtra imágenes por categoría seleccionada.  
- Actualiza el texto con el número de resultados encontrados.  
- Muestra la imagen principal y las secundarias.  
- Permite intercambiar imágenes (principal ↔ relacionada).  
- Usa `DocumentFragment` para optimizar la inserción en el DOM.

---

## Cómo ejecutar el proyecto

1. Descarga o clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/proyecto-filtro.git
