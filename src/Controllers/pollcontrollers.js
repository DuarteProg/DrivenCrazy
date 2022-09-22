import dayjs from "dayjs";
import db from "../db.js";
import { ObjectId } from "mongodb";
import joi from "joi";

const pollSchema = joi.object({
  title: joi.string().required().min(1),
  expireAt: joi.string().min(0),
});

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;
  // console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

  const validation = pollSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  try {
    if (!expireAt) {
    const expireAtNo = await db.collection("poll").insertOne({
        title,
        expireAt: dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss")
      });
      return res.status(201).send(expireAtNo)
    }


   const polls = await db.collection("poll").insertOne({
      title,
      expireAt
    });

    res.status(201).send(polls);
  } catch (error) {}
}

export async function getPoll(req, res) {}
