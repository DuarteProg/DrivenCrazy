import dayjs from "dayjs";
import db from "../db.js";

import joi from "joi";

const pollSchema = joi.object({
  title: joi.string().required().min(1),
  expireAt: joi.date()
});

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;
  

  const validation = pollSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  try {
    if (!expireAt) {
        await db.collection("poll").insertOne({
        title,
        expireAt: dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss")
      });

      const criado = await db.collection("poll").find({title}).toArray();

      return res.status(201).send(criado);
    }


    await db.collection("poll").insertOne({
      title,
      expireAt
    });

    const criado = await db.collection("poll").find({title}).toArray();

    res.status(201).send(criado);
  } catch (error) {}
}

export async function getPoll(req, res) {

  try {
    const pollGet = await db.collection("poll").find().toArray();
        return res.send(pollGet);
  } catch (error) {
    
  }
}
