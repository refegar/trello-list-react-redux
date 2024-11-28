export async function fetchAsync(metodo, url, body = null) {
    const endpoint = url;
  
    // Configuración de la solicitud
    const config = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.sesion}`, // Asegúrate de que 'sesion' esté correctamente almacenado
      },
    };
  
    // Agrega el cuerpo solo si el método es `POST` o `PUT`
    if (metodo === 'POST' || metodo === 'PUT') {
      config.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(endpoint, config);
  
      if (!response.ok) {
        if (response.status === 401) {
          // Manejo específico del error 401
          localStorage.removeItem('sesion'); // Elimina el token si es necesario
          window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
          return; // Detiene la ejecución
        }
        throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
      }
  
      // Verificar si la respuesta tiene contenido JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json(); // Analiza como JSON si el contenido es JSON
      } else {
        return null; // Si no es JSON, devuelve null
      }
    } catch (error) {
      console.error(`Error al realizar la solicitud: ${error.message}`);
      throw new Error(`Error al realizar la solicitud: ${error.message}`);
    }
  }
  