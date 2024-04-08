# Documentación de la API

## Descripción
Esta API proporciona acceso a datos utilizando el RUT (Rol Único Tributario) como identificador. Permite obtener información relacionada con el usuario correspondiente al RUT especificado.

## Endpoints

### Obtener datos de un usuario por RUT

GET /api/:rut
#### Parámetros de ruta
`rut`: El RUT del usuario del cual se desea obtener información. Se puede incluir un número adicional separado por un guión (Ejemplo: `12345678-9`).

GET /api/12345678-9
#### Respuestas
- 200 OK: Se devuelve un objeto JSON con los datos del usuario encontrado.
- 400 Bad Request: Si no se encuentra ningún usuario correspondiente al RUT proporcionado.
- 500 Internal Server Error: Si ocurre algún error interno del servidor durante la búsqueda de datos.
## Uso sin la API

Si tu backend esta hecho con node y prefieres utilizar la API sin realizar llamadas directas desde tu frontend, puedes descargar el archivo [getData.js](./getData.js) y copiarlo en tu backend. Solo llama a la función getData() y pasar el rut como parámetro del mismo formato que se mostró antes.

## Ejemplo de uso

### Obtener datos de un usuario

```javascript
fetch('https://tne-api.fly.dev/api/<span>rut</span>')
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
```
## Respuesta
```Json
{
    "observaciones": "",
    "apellidoPaterno": "apellidoPaterno",
    "primerNombre": "primerNombre",
    "tneFolio": "numero de folio",
    "tnePeriodo": "",
    "tneTipo": "SUPERIOR, MEDIA, BÁSICA",
    "tneEstado": "estado de la tarjeta",
    "lugarOficina": "",
    "nota": "",
    "soliPeriodo": "",
    "soliProceso": "",
    "soliFech": "fecha de la solicitud",
    "soliTipo": "SUPERIOR, MEDIA, BÁSICA",
    "soliEstado": "estado de la solicitud"
}
```
