import express from "express"
import swaggerNodeTools from "../src"

const app = express()


const openApiDoc = __dirname + '/../openapi.yml'

app.use(swaggerNodeTools(openApiDoc))

app.post("/", (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send({ this: "works" })
})

export default app
