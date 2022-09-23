import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import db from "../db.js";
// import joi from "joi";

// const titleSchema = joi.object({ title: joi.string().required().min(1) });

export async function createChoice(req, res) {
  const { title, pollId } = req.body;

//   const validation = titleSchema.validate(req.body, { abortEarly: false });
//   if (validation.error) {
//     const erros = validation.error.details.map((detail) => detail.message);
//     res.status(422).send(erros);
//     return;
//   }
if(!title){
  return res.status(422).send("Título inexistente");
};

  try {
      const findId = await db.collection("poll").findOne({ _id: ObjectId(pollId) });
      if (!findId) {
        return res.status(404).send("Enquete inexistente");
      };


    const choice = await db.collection("choice").findOne({ title });
    if (choice) {
      return res.status(409).send("Esse Titulo já existe");
    }

    if ((dayjs(findId.expireAt).isBefore(dayjs()))) {
        return res.status(403).send('Enquete expirou!');
    };

await db.collection("choice").insertOne({title: title, pollId: pollId})
const send =  await db.collection("choice").find({title}).toArray()
    res.status(201).send(send)
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getChoice(req, res) {

    const {id} = req.params;
  

    try {
    const poll = await db.collection("poll").findOne({_id: ObjectId(id)})
if(!poll){
    return res.status(404).send("Enquete não existe");
}

const choice = await db.collection("choice").find({pollId: id}).toArray();
res.status(200).send(choice)


    } catch (error) {
      res.status(500).send(error.message);
    }
    
}
