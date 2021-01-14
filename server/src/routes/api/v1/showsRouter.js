import express from "express"
import objection from "objection"
const { ValidationError } = objection
import Show from "../../../models/Show.js"

import cleanUserInput from "../../../services/cleanUserInput.js"

const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.query()
    return res.status(200).json({ shows: shows })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

showsRouter.get("/:id", async (req, res) => {
  let id = req.params.id
  try {
    const shows = await Show.query().findById(id)
    return res.status(200).json({ show: shows })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

showsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const newShow = await Show.query().insertAndFetch(formInput)
    return res.status(201).json({ newShow: newShow })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default showsRouter
