const connect_to_db = require('../shared/db');
const TagGraph = require('../shared/models/TagGraph');

/**
 * Handler per l'endpoint GET /graph/tags
 * Recupera l'intero set di dati delle connessioni tra i tag.
 */
module.exports.getTagGraph = async (event) => {
    await connect_to_db();

    try {
        // Esegue una query per trovare tutti i documenti nella collection
        const graphData = await TagGraph.find({});

        // Risposta di successo
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(graphData),
        };
    } catch (err) {
        // Gestione degli errori
        console.error("Errore durante il recupero del grafo dei tag:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Impossibile recuperare il grafo dei tag.', error: err.message }),
        };
    }
};