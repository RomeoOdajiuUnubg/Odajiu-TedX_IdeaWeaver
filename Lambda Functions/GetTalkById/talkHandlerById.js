const connect_to_db = require('./db');
const Talk = require('./Talk');


module.exports.getTalkById = async (event) => {
    await connect_to_db();
    const talkId = event.pathParameters.id;

    try {
        const talk = await Talk.findById(talkId);


        if (!talk) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Talk non trovato.' }),
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(talk),
        };

    } catch (err) {
        console.error(`Errore durante il recupero del talk ${talkId}:`, err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Impossibile recuperare il talk.', error: err.message }),
        };
    }
};
