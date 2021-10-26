const axios = require('axios');
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const agentOptions = {
	key: fs.readFileSync('./https/clientwebapp.key'),
	cert: fs.readFileSync('./https/clientwebapp.pem'),
  rejectUnauthorized: false,
};

app.get('/', async (req, res) => {
  res.send(`[Client] Hello World!: ${process.env.SERVER_HOST}`)
});

app.get('/call-api', async (req, res) => {
  try{
    const result = await axios.get(`http://${process.env.SERVER_HOST}/api`);
    res.send(JSON.stringify(result.data));
  } catch (e){
    res.send("Something error");
    console.error(e);
  }
});

app.get('/WeatherForecast', async (req, res) => {
  try{
    /**
     * If the service has a public SSL cert, the https.Agent usually does not need to be configured 
     * further because your operating system provides a common set of publicly trusted CA certs. 
     * This is usually the same set of CA certs your browser is configured to use 
     * and is why a default axios client can hit https://google.com with little fuss.

      If the service has a private SSL cert (self signed for testing purposes or 
        one signed by your company's private CA to protect their internal secrets), 
        the https agent must be configured to trust the private CA used to sign the server cert:

      const httpsAgent = new https.Agent({ ca: MY_CA_BUNDLE });

      where MY_CA_BUNDLE is an array of CA certs with both the server cert for the endpoint 
      you want to hit and that cert's complete cert chain in .pem format. You must include all certs 
      in the chain up to the trust root.
     */
    // https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
    // https://gist.github.com/mildronize/1bc038f065114b48638c727c8fa2e3ab
    const result = await axios.get(`https://${process.env.SERVER_HOST}/WeatherForecast`, {
      httpsAgent: https.Agent(agentOptions),
    });
    res.send(JSON.stringify(result.data));
  } catch (e){
    res.send("Something error");
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});