const app = require('./app')
const connection = require('./src/db/connection')

const port = 8080

app.listen(port, async () => {
  const [result] = await connection.execute('SELECT 1')
  if(result) {
    console.log(`Conectado ${port}`)
  }
})
