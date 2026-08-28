const express = require("express");
// const mongoose = require("mongoose");
const redis = require("redis")
const { Pool} = require("pg")


PORT = process.env.PORT || 4000;
const app = express();
const pg_data = 'postgresql://root:example@postgres:5432'
const client = redis.createClient({url: "redis://redis:6379"})

const pg_main = new Pool({connectionString: pg_data})

client.connect()
client.on("connect", () => console.log("connected"))

client.on("error", (err) => console.log("Redis Client Error", err))
// const BD_USER = "root";
// const BD_PASSWORD = "example";
// const BD_PORT ="27017" ;
// const BD_HOST = "mongo";

pg_main.connect()

// mongoose.connect(`mongodb://${BD_USER}:${BD_PASSWORD}@${BD_HOST}:${BD_PORT}`);



app.get('/' , async (req ,res)=>{
   await client.set("hussam" , "hussam...")
    res.send('<h1>Wellcome to AWS test , by hussam </h1>')
})
app.get('/data' , async (req ,res)=>{
   const data = await client.get("hussam")
   res.send(data)
})

app.listen(PORT ,  () =>console.log(`this app rinder in port : ${PORT}`))

// const express = require("express");
// const mongoose = require("mongoose");
// const redis = require("redis");

// const PORT = process.env.PORT || 4000;
// const app = express();

// const client = redis.createClient({
//   url: "redis://redis:6379",
// });

// client.on("error", (err) => {
//   console.error("Redis Client Error:", err);
// });

// client.connect()
//   .then(() => {
//     console.log("Redis connected");

//     app.listen(PORT, () => {
//       console.log(`App running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Redis connection failed:", err);
//   });

// mongoose
//   .connect("mongodb://root:example@mongo:27017/?authSource=admin")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection failed:", err));

// app.get("/", async (req, res) => {
//   await client.set("hussam", "hussam...");
//   res.send("<h1>Hello Omar</h1>");
// });

// app.get("/data", async (req, res) => {
//   const data = await client.get("hussam");
//   res.send(data || "No data found");
// });