var xml2js = require("xml2js");
var express = require("express");
var axios = require("axios");
var router = express.Router();
var parser = new xml2js.Parser({ explicitArray: false, trim: false });
const FLICKR_API_KEY = "add your api_key here";
const FLICKR_URL = `https://www.flickr.com/services/rest/`;

const parseAndConvertXmlToJson = (rawXml) => {
  return new Promise((resolve) => {
    parser.parseString(rawXml, (err, result) => {
      if (err) {
        throw err;
      }

      const json = JSON.stringify(result, null, 4);

      resolve(json);
    });
  });
};

const fetchAndParseFlickrData = async () => {
  const response = await axios.get(
    //Swap out 'star-wars' to whatever search term you'd like to find
    `${FLICKR_URL}?method=flickr.photos.search&text=star-wars&api_key=${FLICKR_API_KEY}`
  );
  const json = await parseAndConvertXmlToJson(response.data);

  return json;
};

/* GET users listing. */
router.get("/", async (req, res) => {
  res.send(await fetchAndParseFlickrData());
});

module.exports = router;