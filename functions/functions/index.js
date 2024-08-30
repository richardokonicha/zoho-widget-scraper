"use strict";

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const tableName = 'BookingList'; // Your Data Store table name
const dataColumn = 'data'; // Column to store JSON response as a string

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Server is running" });
});

// Route to trigger scrape and save data
app.post("/scrape", (req, res) => {
    const catalystApp = catalyst.initialize(req, { type: catalyst.type.applogic });

    triggerBrightDataScrape()
        .then(scrapeData => {
            return saveScrapeResults(catalystApp, scrapeData);
        })
        .then(() => {
            res.status(200).json({ "message": "Scrape successful and data saved!" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "error": "Internal server error occurred. Please try again in some time." });
        });
});

// Route to get the latest added object
app.get("/latest", (req, res) => {
    const catalystApp = catalyst.initialize(req, { type: catalyst.type.applogic });

    const query = `SELECT ${dataColumn} FROM ${tableName} ORDER BY CREATEDTIME DESC LIMIT 1`;

    catalystApp.zcql().executeZCQLQuery(query)
	.then(queryResponse => {
		if (queryResponse.length > 0) {
			const latestData = queryResponse[0][tableName][dataColumn];
			res.status(200).json(JSON.parse(latestData));
		} else {
			res.status(404).json({ "message": "No data found!" });
		}
	})
        .catch(err => {
            console.log(err);
            res.status(500).json({ "error": "Internal server error occurred. Please try again in some time." });
        });
});

// Function to trigger Bright Data scrape
async function triggerBrightDataScrape() {
    try {
        const response = await axios.post('YOUR_BRIGHT_DATA_ENDPOINT', {
            // Include any required headers, body, or params
        });
        return response.data;
    } catch (err) {
        console.error('Error triggering Bright Data scrape:', err);
        throw err;
    }
}

// Function to save data in Catalyst Data Store
function saveScrapeResults(catalystApp, scrapeData) {
    return new Promise((resolve, reject) => {
        // Stringify the JSON response to store it as a string
        const jsonData = JSON.stringify(scrapeData);

        const row = {
            [dataColumn]: jsonData
        };

        catalystApp.datastore().table(tableName).insertRows([row]).then(resolve).catch(reject);
    });
}

// New endpoint to push data objects directly
app.post("/update", (req, res) => {
    const catalystApp = catalyst.initialize(req, { type: catalyst.type.applogic });

    const dataObject = req.body;

    if (!dataObject || typeof dataObject !== 'object') {
        return res.status(400).json({ "error": "Invalid data object provided." });
    }

    saveScrapeResults(catalystApp, dataObject)
        .then(() => {
            res.status(200).json({ "message": "Data successfully pushed and saved!" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "error": "Internal server error occurred. Please try again in some time." });
        });
});

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {
    console.log("Server is running");
});

module.exports = app;
