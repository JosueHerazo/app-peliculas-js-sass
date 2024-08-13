'use strict';

const fetchGeneros = async(filtro = "movie") => {
    const tipo = filtro === "movie" ? "movie" : "tv";
                  
    const url =   `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-US&page=1`;
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            return datos.genres;
            
        } catch (error) {
            console.log(error);
        }
        
    };

const obtenerGenero = (id, generos) => {
    let nombre;

    generos.forEach((elemento) => {
        if(id === elemento.id){
            nombre = elemento.name;
        }
    });

    return nombre;

};

const fetchPopulares = async(filtro = "movie") => {
    const tipo = filtro === "movie" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-US&page=1`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;
        const generos = await fetchGeneros();
        // console.log(generos);

        resultados.forEach((resultado) => {
             resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
             
        });
        
        return resultados;
        
        
    } catch (error) {
        console.log(error);
    }
};

const cargarTitulos = (resultados) => {
    const contenedor = document.querySelector("#populares .main__grid");

     contenedor.innerHTML = "";

    resultados.forEach((resultado) => {
        const plantilla = `
        <div class="main__media" data-id="${resultado.id}">
            <a href="#" class="main__media-thumb">
            ${
                resultado.poster_path &&
                ( 
                 `<img 
                class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}" alt=""
                />`
                  )
            }
            </a>
            <p class="main__media-titulo">${resultado.title || resultado.name}</p>
            <p class="main__media-fecha">${resultado.genero}</p>
        </div> `;

        contenedor.insertAdjacentHTML("beforeend", plantilla);
    });
};

const contenedorGenero = document.getElementById("filtro-generos");

const cargarGeneros = async(filtro) => {
    const generos =  await fetchGeneros(filtro);
    contenedorGenero.innerHTML = "";
    generos.forEach((genero) => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = genero.name;
        btn.setAttribute("data-id", genero.id);
        contenedorGenero.appendChild(btn);

    });
};

const filtroPelicula = document.getElementById("movie");
const filtroShow = document.getElementById("tv");

filtroPelicula.addEventListener("click", async(e)=> {
    e.preventDefault();
    cargarGeneros("movie");
    const resultados = await fetchPopulares("movie");
    cargarTitulos(resultados);
    filtroPelicula.classList.add("btn--active");
    filtroShow.classList.remove("btn--active");
    document.querySelector("#populares .main__titulo").innerText = "Peliculas Populares";


});

filtroShow.addEventListener("click", async(e)=> {
    e.preventDefault();
    // cargamos los generos en la barra latelar
    cargarGeneros("tv");
    // obtenemos los resultados
    const resultados = await fetchPopulares("tv");
    // los cargamos en el DOM
     cargarTitulos(resultados);
    filtroPelicula.classList.remove("btn--active");
    filtroShow.classList.add("btn--active");
    document.querySelector("#populares .main__titulo").innerText = "Series Populares";
});

const contenedor$1 = document.getElementById("filtro-generos");

contenedor$1.addEventListener("click",(e) => {
    e.preventDefault();
    if(e.target.closest("button")){
        contenedor$1.querySelector(".btn--active")?.classList.remove("btn--active");
        // agregamos la clase active al botno que clickamos
        e.target.classList.add("btn--active");
    }
});

const fetchBusqueda = async(pagina = 1) => {
    const tipo = document.querySelector(".main__filtros .btn--active").id;
    const idGenero = document.querySelector("#filtro-generos .btn--active")?.dataset.id;
    const añoInicial = document.querySelector("#años-min").value || 1950;
    const añoFinal = document.querySelector("#años-max").value || 2024;
    let url;
    if(tipo === "movie"){
        url = `https://api.themoviedb.org/3/discover/movie?api_key=501c5805fcce2f1715aded8a2cd58806&include_adult=true&include_video=true&language=es-ES&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&sort_by=popularity.desc&with_genres=${idGenero}
        `;
    }else if (tipo === "tv"){
        url = `https://api.themoviedb.org/3/discover/tv?api_key=501c5805fcce2f1715aded8a2cd58806&first_air_date_year=${añoInicial}&first_air_date.gte=${añoFinal}&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${pagina}&sort_by=popularity.desc&without_genres=${idGenero} 
        `;
    }
    
    try{
     const respuesta = await fetch(url);
        const datos =  await respuesta.json();
        const resultados = datos.results;

        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);});

        return resultados;
    }catch(e){
        console.log(e);
    }
    
    
};

const btn = document.getElementById("btn-buscar");

btn.addEventListener("click", async (e) => {
    const resultados = await fetchBusqueda();
    cargarTitulos(resultados);
});

const anterior = document.getElementById("pagina-anterior");
const siguiente = document.getElementById("pagina-siguiente");

siguiente.addEventListener("click", async(e) => {
    const paginaActual = document.getElementById("populares").dataset.pagina;
try{
   const resultados = await fetchBusqueda(paginaActual + 1);
   document.getElementById("populares").setAttribute("data-pagina", parseInt(paginaActual) + 1);

    cargarTitulos(resultados);
    window.scrollTo(0,0);

}catch(e){
    console.log(e);
}
    });
    

anterior.addEventListener("click", async(e) => {
    const paginaActual = document.getElementById("populares").dataset.pagina;


    if(paginaActual > 1){
        try{
            const resultados = await fetchBusqueda(paginaActual - 1);
            document.getElementById("populares").setAttribute("data-pagina", parseInt(paginaActual) - 1);
         
             cargarTitulos(resultados);
             window.scrollTo(0,0);
             
         
         }catch(e){
             console.log(e);
         } 
    }
    
    
});

// nos traemos el id del main__media recuerda que el main__media

const fetchItem = async (id) => {
    // el tipo toma la clase de btn--active para saber a cual de los dos se le dio click ya que una tiene el  id de "MOVIE" y el otro "TV" 

    const tipo = document.querySelector(".main__filtros .btn--active").id;
    try{
        // 
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-ES`;
        const respuesta  = await fetch(url);
        const datos = await respuesta.json();
        // console.log(datos);

        return datos;
    }catch (e){
        console.log(e);
    }

};

// el id de populares es el contenedor de las peliculas #populares
const contenedor = document.getElementById("populares");
// popup es el div de toda la pantalla saliente
const popup$1 = document.getElementById("media");

// le damos click a todo el contenedor de las imagenes pero vamos detallando las clases al escuchar y hacer el evento, como por ejemplio el condicional con el siguiente if(). con la clase main__media 
contenedor.addEventListener("click", async(e) => {
    // cuando le de click a la clase .main__media  que cubre el div de las fotos incluyendo titulo y genero de la pelicula, cuando le de click se abrira la pantalla con la descripcion y sus backdrop_path 
        // main__media clase de las fotos del contenedor para abrir
    if(e.target.closest(".main__media")){
        // activamos el popup añadiendo la clase media--active al div de la pantalla saliente con la clase media 
        popup$1.classList.add("media--active");
        // se toma el data id del div de cada foto para abrirla en la ventana emergente,
        const id = e.target.closest(".main__media").dataset.id;
        const resultados = await fetchItem(id);
        //  console.log(resultados);
        // resultados.forEach((resultado) =>{

            
        // })
        // creamos la pantilla para modificar media__contenedor
        const plantilla = ` <div class="media__backdrop">
            <img
                src="https://image.tmdb.org/t/p/w500//${resultados.backdrop_path}"
                class="media__backdrop-image"
            />
        </div>
        <div class="media__imagen">
            <img
                src="https://image.tmdb.org/t/p/w500//${resultados.poster_path}"
                class="media__poster"
            />
        </div>
        <div class="media__info">
            <h1 class="media__titulo">${resultados.title  || resultados.name}</h1>
            <p class="media__fecha">${resultados.release_date ||  resultados.first_air_date}</p>
            <p class="media__overview">${resultados.overview}</p>
        </div>
        <button class="media__btn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="media__btn-icono"
            >
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
            </svg>
        </button> `;
        // media__contenedor
        document.querySelector(".media .media__contenedor").innerHTML = plantilla;

    }
});

const popup = document.getElementById("media");

popup.addEventListener("click", (e) => {
    if(e.target.closest("button")){
       popup.classList.remove("media--active");
    }
});

const cargar = async () => {
    const resultados = await fetchPopulares();
    cargarTitulos(resultados);
    cargarGeneros("movie");
};

cargar();
//# sourceMappingURL=bundle.js.map
