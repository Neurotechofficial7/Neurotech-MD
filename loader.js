const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_USERNAME;
const REPO = process.env.GITHUB_REPO;

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
