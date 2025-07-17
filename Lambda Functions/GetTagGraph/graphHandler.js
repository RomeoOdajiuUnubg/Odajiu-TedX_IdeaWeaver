const connect_to_db = require('./db');
const TagGraph = require('./TagGraph');

module.exports.getTagGraph = async (event) => {
  await connect_to_db();

  try {
    const graphData = await TagGraph.find({});

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphData),
    };
  } catch (err) {
    console.error("Errore durante il recupero del grafo dei tag:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Impossibile recuperare il grafo dei tag.', error: err.message }),
    };
  }
};
