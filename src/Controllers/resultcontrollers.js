import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function createVote(req, res) {
  const { id } = req.params;

  try {
    const thereIs = await db
      .collection("choice")
      .findOne({ _id: ObjectId(id) });
    if (!thereIs) {
      return res.status(404).send("Opção inexistente");
    }

    const expiration = await db
      .collection("poll")
      .findOne({ _id: ObjectId(thereIs.pollId) });
    if (dayjs(expiration.expireAt).isBefore(dayjs())) {
      return res.status(403).send("Enquete expirada");
    }
    await db.collection("vote").insertOne({
      createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      choiceId: ObjectId(id),
    });
    res.status(201).send(`voto feito em ${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getResult(req, res) {
  const { id } = req.params;
  let mostvoted = 0;
  let title = "";


  try {
    const choice = await db
      .collection("choice")
      .find({ pollId: ObjectId(id) })
      .toArray();
    const poll = await db.collection("poll").findOne({ _id: ObjectId(id) });
    if (!poll) {
      return res.status(404).send("Opção inexistente");
    }

    
    for (let i = 0; i < choice.length; i++) {
      const vote = await db
        .collection("vote")
        .find({ choiceId: choice[i]._id })
        .toArray();

      if (vote.length > mostvoted) {
        title = choice[i].title;
        mostvoted = vote.length;
      }
    }
    res.status(200).send({
      ...poll,
      result: {
        title: title,
        votes: mostvoted,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
