const reqApiKeyMatch = (req, res, next) => {
    const reqApiKey = req.header('api-key');
  
    if (typeof reqApiKey === 'string' && uuidv4.test(reqApiKey.trim())) {
      const envKey = 'KEY_' + reqApiKey.trim().replace(/-/g, '_')
      if (Object.keys(process.env).indexOf(envKey) > -1) {
  
        // Attach prepared axios headers on this specific req.
        Object.assign(req, {
          xummAuthHeaders: {
            headers: {
              'API-Key': reqApiKey.trim(),
              'API-Secret': process.env[envKey]
            }
          }
        })
        return next()
      }
    }
      console.log('Invalid or missing req API key header')
      res.status(403).json({
        msg: 'Preflight error, missing API key header or invalid',
        error: true
    })
  }
  
