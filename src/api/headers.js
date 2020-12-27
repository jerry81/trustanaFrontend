
function getConfig(contentType, password) {
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType || 'application/json',
        'decryption-token': password,
      },
    }
    return config
  }
  
  export { getConfig }
  