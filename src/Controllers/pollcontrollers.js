import dayjs from "dayjs";
import db from "../db.js";

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;

  if (!title) {
    return res.status(422).send("Título inexistente");
  }

  try {
    if (!expireAt) {
      await db.collection("poll").insertOne({
        title,
        expireAt: dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss"),
      });

      const criado = await db.collection("poll").find({ title }).toArray();

      return res.status(201).send(criado);
    }

    await db.collection("poll").insertOne({
      title,
      expireAt,
    });

    const criado = await db.collection("poll").find({ title }).toArray();

    res.status(201).send(criado);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPoll(req, res) {
  try {
    const pollGet = await db.collection("poll").find().toArray();
    return res.send(pollGet);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
