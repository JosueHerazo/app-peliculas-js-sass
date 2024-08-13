import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";


const fetchBusqueda = async(pagina = 1) => {
    const tipo = document.querySelector(".main__filtros .btn--active").id;
    const idGenero = document.querySelector("#filtro-generos .btn--active")?.dataset.id;
    const añoInicial = document.querySelector("#años-min").value || 1950;
    const añoFinal = document.querySelector("#años-max").value || 2024;
    let url;
    if(tipo === "movie"){
        url = `https://api.themoviedb.org/3/discover/movie?api_key=501c5805fcce2f1715aded8a2cd58806&include_adult=true&include_video=true&language=es-ES&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&sort_by=popularity.desc&with_genres=${idGenero}
        `
    }else if (tipo === "tv"){
        url = `https://api.themoviedb.org/3/discover/tv?api_key=501c5805fcce2f1715aded8a2cd58806&first_air_date_year=${añoInicial}&first_air_date.gte=${añoFinal}&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${pagina}&sort_by=popularity.desc&without_genres=${idGenero} 
        `
    }
    
    try{
     const respuesta = await fetch(url);
        const datos =  await respuesta.json()
        const resultados = datos.results;

        const generos = await fetchGeneros();
        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0], generos)});

        return resultados;
    }catch(e){
        console.log(e);
    }
    
    
}
export default fetchBusqueda;