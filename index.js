const express = require('express');
const getData = require('./getData');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const  { Agent, setGlobalDispatcher } = require('undici')

const agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})

setGlobalDispatcher(agent)



app.get('/api/:rut', async (req, res) => {
  try {
    const [rut, numb]= (req.params.rut).split('-');
    
    const result = await getData(rut, numb);
    if (result === null) {
      res.status(400).json({ error: 'Usuario no encontrado' });
    } else {
      res.json( result );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  const htmlResponse = fs.readFileSync('./index.html', 'utf8');
  res.send(htmlResponse);
})

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
