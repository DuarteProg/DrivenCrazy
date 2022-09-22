import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createPoll, getPoll} from "./src/Controllers/pollcontrollers.js"

// import routesHome from './src/Routes/RoutesHome.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(json());


//ROTAS:
server.post('/poll', createPoll)
server.get('/poll', getPoll)
// server.post('/choice', createChoice)
// server.get('/poll', getChoice)
// server.post('/poll', createVote)
// server.get('/poll', getResult)



//Rotas Menu
// server.use(routesHome);


server.listen(PORT, () => {
    console.log(`Servidor funcionandona na porta ${PORT}`);
  });
  