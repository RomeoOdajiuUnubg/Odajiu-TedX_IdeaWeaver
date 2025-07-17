const connect_to_db = require('./db');
const Talk = require('./Talk');

module.exports.getTalks = async (event) => {
    await connect_to_db();

    const page = parseInt(event.queryStringParameters?.page) || 1;
    const limit = parseInt(event.queryStringParameters?.limit) || 10;
    const tag = event.queryStringParameters?.tag;

    const query = tag ? { tags: tag } : {};

    try {
        const talks = await Talk.find(query)
            .sort({ date: -1 }) 
            .skip((page - 1) * limit) 
            .limit(limit);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(talks)
        };
    } catch (err) {
        console.error("Errore durante il recupero dei talk:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Impossibile recuperare i talk.', error: err.message })
        };
    }
};
