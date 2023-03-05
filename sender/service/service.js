const axios = require('axios');

async function getCustomers() {
    const result = await axios.get("https://jsonplaceholder.typicode.com/users")
    return result.data;
}
module.exports = getCustomers;