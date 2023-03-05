const createChannel = require("../rabbit/rabbitmq");

async function consumeData() {
	const connectionRabbitMQ = await createChannel();
	const channel = await connectionRabbitMQ.channel;

	channel.assertQueue("testQueue", { durable: false });
	channel.prefetch(1);
	channel.consume(
		"testQueue",
		async (msg) => {
			setTimeout(async () => {
				const content = JSON.parse(msg.content);
				console.log(`[*] Consumed message: ${JSON.stringify(content)}`);
				channel.ack(msg);
			}, 1000 * 3);
		},
		{ noAck: false },
	);

	let intervalID = setInterval(async () => {
		try {
			const countMessages = await channel.checkQueue("testQueue");
			if (countMessages.messageCount == 0) {
				clearInterval(intervalID);
				setTimeout(async () => {
					await connectionRabbitMQ.connection.close();
					process.exit();
				}, 1000 * 3);
			}
		} catch (error) {
			console.log(error);
			process.exit();
			
		}
	}, 1000 );
}

module.exports = consumeData;
