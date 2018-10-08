import express from "express"
import swaggerNodeTools from "../src/validator"

const app = express()

app.use(swaggerNodeTools)

app.post("/", (req: express.Request, res: express.Response) => {
  res.status(200).send({ this: "works" })
})

export default app
