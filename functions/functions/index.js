"use strict";

const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: '*',
  }
));
app.timeout = 120000; 

const tableName = "BookingList";
const dataColumn = "data";

const BRIGHT_DATA_API_TOKEN = "c1603e50-237b-4604-b6e0-0ccaceffe696";
const BRIGHT_DATA_COLLECTOR_ID = "c_m0f2cu0inmzo0s00a";

// Retry configuration
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.post("/scrape", async (req, res) => {
  const catalystApp = catalyst.initialize(req, {
    type: catalyst.type.applogic,
  });

  try {
    const scrapeData = await triggerBrightDataScrape();

    console.log("Scrape successful, saving data...", scrapeData);
    await saveScrapeResults(catalystApp, scrapeData);
    res
      .status(200)
      .json({ message: "Scrape successful and data saved!", data: scrapeData });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal server error occurred. Please try again in some time.",
      });
  }
});

app.get("/latest", (req, res) => {
  const catalystApp = catalyst.initialize(req, {
    type: catalyst.type.applogic,
  });

  const query = `SELECT ${dataColumn} FROM ${tableName} ORDER BY CREATEDTIME DESC LIMIT 1`;

  catalystApp
    .zcql()
    .executeZCQLQuery(query)
    .then((queryResponse) => {
      if (queryResponse.length > 0) {
        const latestData = queryResponse[0][tableName][dataColumn];
        res.status(200).json(JSON.parse(latestData));
      } else {
        res.status(404).json({ message: "No data found!" });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({
          error:
            "Internal server error occurred. Please try again in some time.",
        });
    });
});

app.post("/update", (req, res) => {
  const catalystApp = catalyst.initialize(req, {
    type: catalyst.type.applogic,
  });
  const dataObject = req.body;

  if (!dataObject || typeof dataObject !== "object") {
    return res.status(400).json({ error: "Invalid data object provided." });
  }

  saveScrapeResults(catalystApp, dataObject)
    .then(() => {
      res.status(200).json({ message: "Data successfully pushed and saved!" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({
          error:
            "Internal server error occurred. Please try again in some time.",
        });
    });
});

app.post("/webhook", async (req, res) => {
  const catalystApp = catalyst.initialize(req, {
    type: catalyst.type.applogic,
  });
  console.log("Webhook received:", req.body);
  try {
    const { response_id } = req.body;
    const scrapeData = await fetchBrightDataResult(response_id);
    await saveScrapeResults(catalystApp, scrapeData);
    res
      .status(200)
      .json({ message: "Webhook received and data saved successfully" });
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(500).json({ error: "Error processing webhook" });
  }
});

// functions
async function triggerBrightDataScrape() {
  console.log("Triggering Bright Data scrape...");
  try {
    // Step 1: Trigger the immediate scrape
    const triggerResponse = await axios.post(
      `https://api.brightdata.com/dca/trigger_immediate?collector=${BRIGHT_DATA_COLLECTOR_ID}`,
      {
        url: "https://www.booking.com/",
        webhook: {
          url: "https://project-rainfall-860841904.development.catalystserverless.com/server/functions/webhook",
          secret: "WEBHOOK_SECRET",
        },
      },

      {
        headers: {
          Authorization: `Bearer ${BRIGHT_DATA_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { response_id } = triggerResponse.data;

    // Step 2: Retrieve the result with retry logic
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const resultResponse = await axios.get(
          `https://api.brightdata.com/dca/get_result?response_id=${response_id}`,
          {
            headers: {
              Authorization: `Bearer ${BRIGHT_DATA_API_TOKEN}`,
            },
            timeout: 120000,
          }
        );

        if (resultResponse.data && resultResponse.data.length > 0) {
          return resultResponse.data;
        }

        // If we get here, the data isn't ready yet
        console.log(
          `Attempt ${retries + 1}: Data not ready, retrying in ${
            RETRY_DELAY / 1000
          } seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        retries++;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 404 error means the data isn't ready yet
          console.log(
            `Attempt ${retries + 1}: Data not ready (404), retrying in ${
              RETRY_DELAY / 1000
            } seconds...`
          );
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          retries++;
        } else {
          // For other errors, throw and exit the retry loop
          throw error;
        }
      }
    }

    throw new Error("Max retries reached. Unable to retrieve scrape results.");
  } catch (err) {
    console.error("Error in Bright Data scrape:", err);
    throw err;
  }
}

function saveScrapeResults(catalystApp, scrapeData) {
    return new Promise((resolve, reject) => {
      const results = scrapeData[0].results;
      if (results) {
        const jsonData = JSON.stringify(results);
        const row = { [dataColumn]: jsonData };
        catalystApp
          .datastore()
          .table(tableName)
          .insertRow(row)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error('Results not found in scrapeData'));
      }
    });
  }
  

async function fetchBrightDataResult(response_id) {
  try {
    const resultResponse = await axios.get(
      `https://api.brightdata.com/dca/get_result?response_id=${response_id}`,
      {
        headers: {
          Authorization: `Bearer ${BRIGHT_DATA_API_TOKEN}`,
        },
      }
    );

    if (resultResponse.data && resultResponse.data.length > 0) {
      return resultResponse.data;
    } else {
      throw new Error("No data received from Bright Data");
    }
  } catch (err) {
    console.error("Error fetching Bright Data result:", err);
    throw err;
  }
}

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {
  console.log("Server is running");
});

module.exports = app;
