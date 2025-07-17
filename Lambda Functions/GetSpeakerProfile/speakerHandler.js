const connect_to_db = require('./db');
const SpeakerProfile = require('./SpeakerProfile');

module.exports.getSpeakerProfile = async (event) => {
  await connect_to_db();

  const speakerId = decodeURIComponent(event.pathParameters.id);

  try {
    const profile = await SpeakerProfile.findById(speakerId);

    if (!profile) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Profilo speaker non trovato.' }),
      };
    }

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
