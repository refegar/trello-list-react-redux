## En esta parte instalamos
## npm i json-server@0.17.4 -D
## creamos la carpeta data dentro de proyecto
## y el archivo db.json
## Agregamos el siguiente code:

```js
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}

```

## agregamos el script en el package.

## esta parte va en script de package.json agregamos:
##     "server": "json-server --watch data/db.json --port8080"
## Arrancamos con --> npm run server
