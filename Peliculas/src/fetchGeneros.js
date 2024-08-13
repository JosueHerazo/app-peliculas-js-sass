const fetchGeneros = async(filtro = "movie") => {
    const tipo = filtro === "movie" ? "movie" : "tv";
                  
    const url =   `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-US&page=1`;
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json()
            return datos.genres;
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    
export default fetchGeneros;