// nos traemos el id del main__media recuerda que el main__media

const fetchItem = async (id) => {
    // el tipo toma la clase de btn--active para saber a cual de los dos se le dio click ya que una tiene el  id de "MOVIE" y el otro "TV" 

    const tipo = document.querySelector(".main__filtros .btn--active").id
    try{
        // 
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=501c5805fcce2f1715aded8a2cd58806&language=es-ES`;
        const respuesta  = await fetch(url)
        const datos = await respuesta.json();
        // console.log(datos);

        return datos;
    }catch (e){
        console.log(e);
    }

};

export default fetchItem;