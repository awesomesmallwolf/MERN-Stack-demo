const axios = require('axios');

const fetchAsync = (filter) => {
    return axios
    .get("https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow");
}

module.exports.fetchAsync = fetchAsync;