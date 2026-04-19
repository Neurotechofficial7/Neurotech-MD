const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.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;
const OWNER = process.env.Neurotechofficial7;
const REPO = process.env.Neurotech-MD-backend;

async function loadCommand(name) {
    try {
        const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${name}.js`;

        const res = await axios.get(url, {
            headers: {
                Authorization: `token ${TOKEN}`,
                Accept: "application/vnd.github.v3.raw"
            }
        });

        return res.data;
    } catch (err) {
        console.log("Error loading:", name);
        return null;
    }
}

module.exports = { loadCommand };
