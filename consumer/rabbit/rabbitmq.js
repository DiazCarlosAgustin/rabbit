const amqp = require('amqplib');
require('dotenv').config();

const createChannel = async () => {
    try {
        
        const connection = await amqp.connect(`amqp://${process.env.AMQP_USER}:${process.env.PASSWORD_AMQP}@${process.env.HOST_AMQP}`);
        console.log("Connection established");
    
        const channel = await connection.createConfirmChannel();
        console.log("Channel created");
    
        return {connection, channel};
    } catch (error) {
        return {error};
    }
    
}

module.exports = createChannel;