const connect_to_db = require('../shared/db');
const SpeakerProfile = require('../shared/models/SpeakerProfile');

/**
 * Handler per l'endpoint GET /speakers/{id}
 * Recupera il profilo analitico di un singolo speaker.
 * L'ID dello speaker nel path deve essere URL-encoded.
 */
module.exports.getSpeakerProfile = async (event) => {
    await connect_to_db();
    
    // Il nome dello speaker può contenere spazi o caratteri speciali (es. "John%20Doe")
    // È fondamentale decodificarlo per usarlo nella query.
    const speakerId = decodeURIComponent(event.pathParameters.id);

    try {
        // Cerca il profilo per _id, che corrisponde al nome dello speaker
        const profile = await SpeakerProfile.findById(speakerId);

        // Se non viene trovato, restituisce 404
        if (!profile) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Profilo speaker non trovato.' }),
            };
        }

        // Risposta di successo
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        };
    } catch (err) {
        console.error(`Errore durante il recupero del profilo di ${speakerId}:`, err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Impossibile recuperare il profilo dello speaker.', error: err.message }),
        };
    }
};