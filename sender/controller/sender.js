const createChannel = require("../rabbit/rabbit");
const getCustomers = require("../service/service");
const axios = require("axios");


async function sendMessages() {
	try {
		const customers = await getCustomers();

		if (!customers) {
			console.log(`[*] No customers found`);
		}

		const connectionRabbitMQ = await createChannel();
        await connectionRabbitMQ.channel.assertQueue("testQueue", {
            durable: false,
        });

		for (const customer of customers) {
			const sentMessage = await connectionRabbitMQ.channel.sendToQueue(
				"testQueue",
				Buffer.from(JSON.stringify(customer)),
				{ persistent: false },
			);
		}
        await connectionRabbitMQ.channel.waitForConfirms();
        
        axios.get('http://localhost:3000/')


	} catch (error) {
		console.log(error);
	}
}
 

module.exports = sendMessages;