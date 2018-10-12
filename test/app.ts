import express from 'express'
import swaggerNodeTools from '../src'
import bodyParser from 'body-parser'

const app = express()

const openApiDoc = __dirname + '/../openapi.yml'

app.use(bodyParser.json())

app.use(swaggerNodeTools(openApiDoc))

app.post('/', (req: express.Request, res: express.Response) => {
  res.status(200).send({ this: 'works' })
})

app.listen(3000)

export default app
