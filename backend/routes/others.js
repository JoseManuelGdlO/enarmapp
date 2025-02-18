const express = require('express');
const router = express.Router();
const configurations = require('../services/configurations');
const { verifyToken, verifyAccount } = require('../libs/headers');
var http = require('http2').constants;
const jwt = require('jsonwebtoken');

router.get('/configuration', verifyToken, verifyAccount, async function (req, res, next) {
  try {

    const code = req.query.code
    const response = await configurations.getConfigurationPerCode(code)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (!response) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/configuration-all', async function (req, res, next) {
  try {
    const response = await configurations.getConfiguration()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/configuration', async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.updateConfiguration(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/configuration-group', async function (req, res, next) {
  try {

    const group = req.query.group
    const response = await configurations.getConfigurationPerGroup(group)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/universidades', async function (req, res, next) {
  try {
    let code = http.HTTP_STATUS_OK;
    
    const response = await configurations.getUniversidades()
    if (response.length === 0) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/frases', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const response = await configurations.getFrases()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error('Error while getting phrases /others/frases', err.message);
    next(err);
  }
});

router.get('/especialidades', async function (req, res, next) {
  try {
    let code = http.HTTP_STATUS_OK;
    
    const response = await configurations.getEspecialidades()
    if (response.length === 0) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/student-type', async function (req, res, next) {
  try {
    const type = req.query.type;
    const response = await configurations.getStudnetTypes(type)
    let code = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/enarm-date', async function (req, res, next) {
  try {
    const response = await configurations.getEnarmDate()
    let code = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/subscripciones', async function (req, res, next) {
  try {
    const response = await configurations.getSubscripciones()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/subscription', async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.updateSubscriptions(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/laboratory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const response = await configurations.getLaboratories()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/laboratory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.addLaboratory(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/laboratory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.addLaboratory(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.delete('/laboratory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const id = req.query.id;
    const response = await configurations.removeLaboratory(id)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/laboratory-subcategory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.addLaboratorySubcategory(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/laboratory-subcategory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    let body = req.body;
    const response = await configurations.addLaboratorySubcategory(body)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});


router.delete('/laboratory-subcategory', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const id = req.query.id;
    const response = await configurations.removeLaboratorySubcategory(id)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/frases', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const response = await configurations.getFrases()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error('Error while getting phrases /others/frases', err.message);
    next(err);
  }
});

router.get('/especialidades', async function (req, res, next) {
  try {
    const response = await configurations.getEspecialidades()
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/user-status', verifyToken, async function (req, res, next) {
  try {
    const decoded = jwt.verify(req.token, 'secretkey');
    const userId = decoded.user.id
    const response = await configurations.changeStatusUser(req.body.status, userId)
    let codeHttp = http.HTTP_STATUS_OK;
    
    if (response.length === 0) {
      codeHttp = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(codeHttp).json({
      response
    });
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});


module.exports = router;