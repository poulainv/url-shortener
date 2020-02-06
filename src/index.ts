import express from 'express'
import { PORT } from './config/constants'
import { router } from './routes'

const app = express()
app.use(express.json())

app.use('', router)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
