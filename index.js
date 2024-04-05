const express = require('express');
const parseInfo = require('./parseInfo');
const app = express();
const port = process.env.PORT || 3000;
const  { Agent, setGlobalDispatcher } = require('undici')

const agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})

setGlobalDispatcher(agent)

async function getData(rut, numb) {
  const response = await fetch( `https://sistema.tne.cl/reposiciones/estado_tarjeta_alumno/tneEmitidas/${rut}/${numb}/0.5`);
  const data = await response.text()
  const result = parseInfo(data)
  return result
  }


app.get('/:rut/:numb', async (req, res) => {
  try {
    const rut = req.params.rut;
    const numb = req.params.numb;
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
  res.json({
     message: 'API TNE',
      endpoints: {
        info: '/:rut/:numb',
      }
     });
})

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
