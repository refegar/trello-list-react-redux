export async function FetchSesion(metodo,token, url, body = null) {
    const endpoint = url;
    
    // Configuración de la solicitud
    const config = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    
    // Agrega el cuerpo solo si el método es `POST` o `PUT`
    if (metodo === 'POST' || metodo === 'PUT') {
        config.body = JSON.stringify(body);
    }
  
    try {
        const response = await fetch(endpoint, config);
  
        if (!response.ok) {
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
        throw new Error(`Error al realizar la solicitud: ${error.message}`);
    }
  }