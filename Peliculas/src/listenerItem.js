import fetchItem from "./fetchItem";
// el id de populares es el contenedor de las peliculas #populares
const contenedor = document.getElementById("populares")
// popup es el div de toda la pantalla saliente
const popup = document.getElementById("media");

// le damos click a todo el contenedor de las imagenes pero vamos detallando las clases al escuchar y hacer el evento, como por ejemplio el condicional con el siguiente if(). con la clase main__media 
contenedor.addEventListener("click", async(e) => {
    // cuando le de click a la clase .main__media  que cubre el div de las fotos incluyendo titulo y genero de la pelicula, cuando le de click se abrira la pantalla con la descripcion y sus backdrop_path 
        // main__media clase de las fotos del contenedor para abrir
    if(e.target.closest(".main__media")){
        // activamos el popup añadiendo la clase media--active al div de la pantalla saliente con la clase media 
        popup.classList.add("media--active")
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
        </button> `
        // media__contenedor
        document.querySelector(".media .media__contenedor").innerHTML = plantilla;

    }
})