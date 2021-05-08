// puedo concatenar y hacer el server en una sola línea. Se puede copiar y crear varios servidores en diferentes puertos:
/*require('http').createServer((req, res) => res.end('conectado1!')).listen(8080);
require('http').createServer((req, res) => res.end('conectado2!')).listen(8081);*/

const http = require('http');
const app_port = process.env.app_port || 8080;

//newdate no refresca si lo pongo acá adentro directamente porque se crea una sola vez, por eso hago funcion:
//con los backtick puedo evitar concatenar con + 
const getWebPage = () =>
    `
        <h1 style="color: maroon"> 
            La hora actual es <span style="color:purple"> ${new Date().toLocaleString()} </span>
        </h1>
    `;

http.createServer((req, res) => {
    //el text/plain dice que lo que va a llegar al navegador va a ser texto plano
    /* res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.write('Hello World \nfrom Cloudnode\n');*/
    console.log(req.url, 'req'); //si pongo el req solo van a aparecer muchisimos datos, con el url solo me dice la petición esa en particular, que es el favicon.
    // console.log('llego request frontend') //aparece 2 veces porque la primera es la petición del favicon
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(getWebPage()) // en vez de poner todo como abajo, puedo tenerlo arriba en una const
    res.end();
}).listen(app_port, err => {
    if (!err) console.log('Web server running at http://localhost' + ':' + app_port);
});