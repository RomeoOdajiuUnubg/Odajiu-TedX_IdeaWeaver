const connect_to_db = require('./db');
const Talk = require('./Talk');

module.exports.getTalks = async (event) => {
  const queryParams = event.queryStringParameters || {};
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const tag = queryParams.tag;

  const query = tag ? { tags: tag } : {};

  try {
    await connect_to_db();

    const [talks, totalTalks] = await Promise.all([
      Talk.find(query)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Talk.countDocuments(query),
    ]);

    const responsePayload = {
      totalTalks: totalTalks,
      currentPage: page,
      totalPages: Math.ceil(totalTalks / limit),
      data: talks,
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responsePayload, null, 2),
    };
  } catch (err) {
    console.error("Errore durante il recupero dei talk:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Impossibile recuperare i talk.", error: err.message }, null, 2),
    };
  }
};
