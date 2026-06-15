const form = document.querySelector("form");
const inputFile = document.getElementById("file-upload");

let imagenBase64 = "";

inputFile.addEventListener("change", () => {
    const archivo = inputFile.files[0];
    if(!archivo) return;
    const reader = new FileReader();
    reader.onload = () => {
        imagenBase64 = reader.result;
    }
    reader.readAsDataURL(archivo);
});

form.addEventListener("submit", async (e)=>{

    e.preventDefault();
    const body = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        copyright: document.getElementById("copyright").value,
        usuarioId: document.querySelector(
            'input[name="usuarioId"]'
        ).value,
        imagenBase64
    };

    await fetch("/publicar",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });
    window.location.href="/galeria";
});