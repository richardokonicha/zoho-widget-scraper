
const data = [
    {
      "results": [
        {
          "name": "Citadines Connect Fifth Avenue New York",
          "price": "US$177",
          "score": 7.5,
          "reviews": 7531573157
        },
        {
          "name": "Holiday Inn Wall Street, an IHG Hotel",
          "price": "US$237",
          "score": 7.1,
          "reviews": 71972972
        },
        {
          "name": "West Side YMCA",
          "price": "US$119",
          "score": 6.6,
          "reviews": 661443214432
        },
        {
          "name": "New York Marriott Downtown",
          "price": "US$709",
          "score": 8.4,
          "reviews": 84395395
        },
        {
          "name": "Mayfair Hotel, Ascend Hotel Collection",
          "price": "US$190",
          "score": 8.6,
          "reviews": 8611521152
        },
        {
          "name": "Margaritaville Resort Times Square",
          "price": "US$289",
          "score": 8.7,
          "reviews": 8734913491
        },
        {
          "name": "SpringHill Suites by Marriott New York Manhattan Chelsea",
          "price": "US$239",
          "score": 8.2,
          "reviews": 8297099709
        },
        {
          "name": "Fairfield Inn & Suites by Marriott New York Manhattan/Chelsea",
          "price": "US$229",
          "score": 7.9,
          "reviews": 7910591059
        },
        {
          "name": "Hilton Garden Inn New York Times Square South",
          "price": "US$240",
          "score": 8.1,
          "reviews": 8144134413
        },
        {
          "name": "Moxy NYC Chelsea",
          "price": "US$239",
          "score": 8.2,
          "reviews": 8231243124
        },
        {
          "name": "Renaissance New York Chelsea Hotel",
          "price": "US$219",
          "score": 8,
          "reviews": 8010111011
        },
        {
          "name": "Hotel Belleclaire Central Park",
          "price": "US$216",
          "score": 8.1,
          "reviews": 8146744674
        },
        {
          "name": "Aura Hotel Times Square Newly Renovated",
          "price": "US$254",
          "score": 8.2,
          "reviews": 829393
        },
        {
          "name": "Le Méridien New York, Fifth Avenue",
          "price": "US$265",
          "score": 7.8,
          "reviews": 785050
        },
        {
          "name": "45 Times Square Hotel",
          "price": "US$253",
          "score": 8.3,
          "reviews": 8322242224
        },
        {
          "name": "Hotel Indigo NYC Downtown - Wall Street, an IHG Hotel",
          "price": "US$193",
          "score": 8.3,
          "reviews": 83987987
        },
        {
          "name": "Hotel Shocard Broadway, Times Square",
          "price": "US$199",
          "score": 7.3,
          "reviews": 7325732573
        },
        {
          "name": "Hampton Inn Times Square Central",
          "price": "US$261",
          "score": 8.3,
          "reviews": 8329732973
        },
        {
          "name": "CIVILIAN Hotel",
          "price": "US$249",
          "score": 8.6,
          "reviews": 8642464246
        },
        {
          "name": "InterContinental New York Barclay Hotel, an IHG Hotel",
          "price": "US$269",
          "score": 8,
          "reviews": 8015961596
        },
        {
          "name": "The Chelsean New York",
          "price": "US$199",
          "score": 7.1,
          "reviews": 7120372037
        },
        {
          "name": "INNSiDE by Meliá New York Nomad",
          "price": "US$229",
          "score": 8.5,
          "reviews": 8510131013
        },
        {
          "name": "MOXY NYC Times Square",
          "price": "US$239",
          "score": 8.1,
          "reviews": 8164596459
        },
        {
          "name": "The Cloud One New York-Downtown, by the Motel One Group",
          "price": "US$229",
          "score": 8.5,
          "reviews": 8552425242
        },
        {
          "name": "Motto by Hilton New York City Chelsea",
          "price": "US$246",
          "score": 8.6,
          "reviews": 8627862786
        },
        {
          "name": "The Manhattan at Times Square",
          "price": "US$187",
          "score": 5.6,
          "reviews": 5678007800
        },
        {
          "name": "Dream Downtown, by Hyatt",
          "price": "US$236",
          "score": 7.4,
          "reviews": 7414721472
        }
      ],
      "input": {
        "url": "https://www.booking.com/"
      }
    }
  ];


function saveScrapeResults(scrapeData) {
    return new Promise((resolve, reject) => {
      const results = scrapeData[0].results;
      if (results) {
        const jsonData = JSON.stringify(results);
        console.log(jsonData);
        // const row = { [dataColumn]: jsonData };
        // catalystApp
        //   .datastore()
        //   .table(tableName)
        //   .insertRow(row)
        //   .then(resolve)
        //   .catch(reject);
      } else {
        reject(new Error('Results not found in scrapeData'));
      }
    });
  }
  

console.log(saveScrapeResults(data));