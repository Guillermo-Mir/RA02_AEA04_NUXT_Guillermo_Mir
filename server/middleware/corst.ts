export default defineEventHandler((event) => {
  // 1. Obtenemos el origen de la petición (de dónde viene)
  const origin = getRequestHeader(event, 'origin') || '';

  // 2. Comprobamos si viene de tu IP local, localhost o capacitor
  const allowedOrigins = ['http://172.23.7.113:9500', 'http://localhost:9500', 'capacitor://localhost', 'http://localhost'];
  
  if (allowedOrigins.includes(origin)) {
    // Si es de confianza, le devolvemos su propio origen
    setResponseHeader(event, 'Access-Control-Allow-Origin', origin);
  } else if (origin.includes('172.23.7.113')) {
    // Truco extra por si el puerto cambia
    setResponseHeader(event, 'Access-Control-Allow-Origin', origin);
  }

  // 3. Cabeceras esenciales para que pasen las cookies (Credentials)
  setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  setResponseHeader(event, 'Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
  setResponseHeader(event, 'Access-Control-Allow-Credentials', 'true');

  // 4. Si es una petición de comprobación (preflight) de CORS, respondemos OK y cortamos aquí
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content';
    return 'OK';
  }
});