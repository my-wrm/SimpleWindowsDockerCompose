const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send(`[Client] Hello World! read from server: ${process.env.SERVER_HOST}`)
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
    const result = await axios.get(`${process.env.SERVER_HOST}/WeatherForecast`);
    res.send(JSON.stringify(result.data));
  } catch (e){
    res.send("Something error");
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});