import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {createPoll, getPoll} from "./src/Controllers/pollcontrollers.js"
import {createChoice, getChoice} from "./src/Controllers/choicecontrollers.js"
import {createVote, getResult} from "./src/Controllers/resultcontrollers.js"

// import routesHome from './src/Routes/RoutesHome.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(json());


//ROTAS:
server.post('/poll', createPoll)
server.get('/poll', getPoll)
server.post('/choice', createChoice)
server.get('/poll/:id/choice', getChoice)
server.post('/choice/:id/vote', createVote)
server.get('/poll/:id/result', getResult)



//Rotas Menu
// server.use(routesHome);


server.listen(PORT, () => {
    console.log(`Servidor funcionandona na porta ${PORT}`);
  });
  