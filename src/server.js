require('dotenv').config();
const { connectDB } = require("./config/db");
const { syncDatabase } = require("./models");

const app = require("./app");

// const app = express();
// app.use(express.json());

// Connect DB and Sync Models
connectDB().then(syncDatabase);
// Define Routes (Later we will add more)
// app.get("/", (req, res) => res.send("✅ Alumni Portal API Running..."));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
