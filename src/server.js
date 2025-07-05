import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, join} from "path";
import {MongoClient, ServerApiVersion} from "mongodb";
import OpenAI from "openai";


// Gets absolute path of the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env')});
const uri = `mongodb+srv://arunavpm6:${process.env.MONGO_PASSWORD}@cluster0.7mp8khi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const OPEN_AI_API_KEY = process.env.OPEN_API_KEY;

const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverApi: ServerApiVersion.v1
});

const openai = new OpenAI({
   apiKey: OPEN_AI_API_KEY,
})

await client.connect();
console.log("MongoDB is connected");

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json({limit: '100mb'}));
console.log("server recieves request");

app.get("/members", async (req, res) => {
   try {
      const db = client.db("BNI-USERS");
      const membersCollection = db.collection("Members");
      const members = await membersCollection.find({}).toArray();
      console.log(members)
      res.send(members);
   }
   catch (error) {
      console.error("Error fetching members:", error)
      res.status(500).json({message: "Internal Server Error"})
   }
})

app.post("/members", async (req, res) => {
   try {
      const db = client.db("BNI-USERS");
      const membersCollection = db.collection("Members");
      const currentPage = req.body.pageNumber;
      const searchWord = req.body.searchTerm;
      console.log("searchWord: " + searchWord)
      const numSkippedEntries = (currentPage - 1) * 10;
      let memberResults = [];
      let numberOfEntries = 0;

      if (searchWord === "") { // fetch from all data if keyword isn't present (reset)
         memberResults = await membersCollection.find({}).skip(numSkippedEntries).limit(10).toArray()
         numberOfEntries = await membersCollection.countDocuments();
      }
      else { // perform filter query
         const queryFilter = {"Name": searchWord}
         numberOfEntries = await membersCollection.countDocuments(queryFilter);
         console.log("number of entries: " + numberOfEntries)
         memberResults = await membersCollection.find(queryFilter).skip(numSkippedEntries).limit(10).toArray();
         console.log("memberResults: " + memberResults)
      }

      const resultJSON = {numEntries : numberOfEntries, memberQueryResult: memberResults};
      res.json(resultJSON);
   }
   catch (error) { 
      console.error("Error fetching members:", error)
      res.status(500).json({message: "Internal Server Error"})
   }
})

app.post("/visitor-search", async (req, res) => {
   try {
      const visitorsCollection = client.db("BNI-USERS").collection("Visitors")
      const searchWord = req.body.searchWord;
      const visitorQuery = searchWord === "" ? {} : {"Name": searchWord}
      const visitorQueryResult = await visitorsCollection.find(visitorQuery).toArray()
      res.json(visitorQueryResult);
      console.log(visitors)
   }
   catch (error) {
      console.error("Error fetching visitors:", error)
      res.status(500)
   }
})

app.post("/visitors", async (req, res) => {
   try {
      const visitorsCollection = client.db("BNI-USERS").collection("Visitors")
      const newVisitor = req.body;
      console.log("visitor:" + newVisitor);
      const result = await visitorsCollection.insertOne(newVisitor)
      console.log(result)
      res.send(result)
   }
   catch (error) {
      console.error("Error adding visitor:", error)
      res.status(500)
   }
})

app.post("/gpt", async (req, res) => {
   try {
      const { prompt } = req.body;

      const response = await openai.responses.create({
         model: 'gpt-3.5-turbo',
         input: `Given this text: ${prompt}, can you extract the information in this format - name, company, phone-number, email
         with no other words`,
         max_output_tokens: 50,
      });

      const aiResponse = response.output[0].content[0].text;
      console.log(aiResponse);
   }
   catch (error) {
      console.log("Error fetching to chat-gpt API", error);
   }
})

process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
})

app.listen(port, () => {
   console.log(`Server listening on ${port}`);
});