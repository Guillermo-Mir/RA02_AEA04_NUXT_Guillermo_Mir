export default defineEventHandler((event) => {
  // 1. Obtenemos de dónde viene la petición (ej. http://localhost:9000)
  const origin = getRequestHeader(event, 'origin');
  
  // 2. Si hay un origen, le damos permiso exacto a ese origen
  if (origin) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
    });
  }

  // 3. Si es la petición fantasma (OPTIONS) del navegador, respondemos OK y cortamos aquí
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    return send(event, ''); // Enviamos respuesta vacía pero exitosa
  }
});