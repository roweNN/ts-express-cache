import { createServer } from '@app'
import http from 'http'
//import { connect } from '@config/mongoose'

const startServer = async () => {
  const PORT = process.env.PORT || 3000
  const app = await createServer()
  //await connect()
  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  })
}

startServer()