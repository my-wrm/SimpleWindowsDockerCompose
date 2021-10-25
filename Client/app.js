const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send(`Hello World! read from server: ${process.env.SERVER_HOST}`)
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