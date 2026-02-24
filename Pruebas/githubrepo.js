const axios = require('axios');

async function verificarForkGitHub() {
    // Tu usuario de GitHub
    const username = "RDanMT";

    // El nombre del repositorio. 
    // NOTA: Si en tu GitHub el repo se llama distinto (ej. "ibm-developer-skills-networkexpressBookReview"), 
    // cambia esta variable para que coincida exactamente con el nombre en GitHub.
    const repoName = "expressBookReview";

    try {
        console.log(`⏳ Consultando la API pública de GitHub para el repositorio: ${username}/${repoName}...\n`);

        // Hacemos una petición GET a la API de GitHub
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        const repoData = response.data;

        // Verificamos si la propiedad "fork" es verdadera y si tiene un "parent" (padre)
        if (repoData.fork && repoData.parent) {
            console.log("✅ ¡Confirmación Exitosa! El repositorio es un Fork.\n");

            console.log("Detalles del Repositorio:");
            console.log(`👤 Propietario actual: ${repoData.owner.login}`);
            console.log(`📌 Tu repositorio:     ${repoData.html_url}`);
            console.log(`🔗 Es un fork de:      ${repoData.parent.full_name}`);
            console.log(`🌐 URL Original:       ${repoData.parent.html_url}`);

            if (repoData.parent.full_name.includes("ibm-developer-skills-network")) {
                console.log("\n🎓 ¡Perfecto! Proviene del repositorio oficial del curso de IBM.");
            }
        } else {
            console.log("⚠️ El repositorio existe, pero GitHub indica que NO es un fork (fue creado desde cero).");
        }

    } catch (error) {
        console.error("❌ Error al consultar la API de GitHub:", error.message);

        if (error.response && error.response.status === 404) {
            console.error(`\n💡 SUGERENCIA: No se encontró el repositorio "${username}/${repoName}".`);
            console.error("1. Verifica que tu repositorio en GitHub sea PÚBLICO.");
            console.error("2. Verifica el nombre exacto de tu repositorio en GitHub. Si es diferente, actualiza la variable 'repoName' en la línea 10 de este archivo.");
        }
    }
}

// Ejecutamos la función
verificarForkGitHub();