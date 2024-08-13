import fetchGeneros from "./fetchGeneros";
const contenedorGenero = document.getElementById("filtro-generos");

const cargarGeneros = async(filtro) => {
    const generos =  await fetchGeneros(filtro);
    contenedorGenero.innerHTML = ""
    generos.forEach((genero) => {
        const btn = document.createElement("button")
        btn.classList.add("btn")
        btn.innerText = genero.name;
        btn.setAttribute("data-id", genero.id)
        contenedorGenero.appendChild(btn)

    });
}

export default cargarGeneros;