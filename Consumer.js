const { Kafka } = require('kafkajs');
var connect_mongodb = require("./mongodb");
const Messages = require('./models/messages');

// Create a Kafka instance
connect_mongodb();
const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:29092'] 
});

const consumer = kafka.consumer({ groupId: 'test-group1' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'dbserver1.bookingapp.booker', fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Parse the message value as JSON
        if(message !== null){
        const messagePayload = JSON.parse(message.value.toString());
        const { payload } = messagePayload;

        // console.log('Payload:', payload);
        console.log(payload['op']);
        const op = payload['op'];
        if (payload.op === 'd' && payload.before) {
          const idToDelete = payload.before.id;

          // Delete documents in MongoDB collection where id matches the extracted id
          await Messages.deleteMany({ user_id: idToDelete });
          console.log(`Deleted documents with id ${idToDelete}`);
        }
        // console.log('Operation:', op);
        }else{
          console.log('Received null message');
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    },
  });
};

run().catch(console.error);

// Gracefully close consumer on exit
process.on('SIGINT', async () => {
  await consumer.disconnect();
  process.exit();
});
