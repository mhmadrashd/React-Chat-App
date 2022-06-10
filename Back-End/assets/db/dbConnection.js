const mongoose = require("mongoose");

// Connection URI
const uri = `mongodb://localhost:27017/pushAndPull`;

async function run() {
  try {
    // Connect the client to the server
    await mongoose.connect(uri);
    console.log("Connected successfully to server");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
run();
