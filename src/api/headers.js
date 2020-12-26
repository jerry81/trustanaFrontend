
function getConfig(contentType) {
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType || 'application/json',
      },
    }
    return config
  }
  
  export { getConfig }
  