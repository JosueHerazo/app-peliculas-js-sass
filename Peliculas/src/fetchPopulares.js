import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const fetchPopulares = async(filtro = "movie") => {
    const tipo = filtro === "movie" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-US&page=1`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json()
        const resultados = datos.results;
        const generos = await fetchGeneros();
        // console.log(generos);

        resultados.forEach((resultado) => {
             resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
             
        })
        
        return resultados;
        
        
    } catch (error) {
        console.log(error);
    }
}

export default fetchPopulares;




    
  