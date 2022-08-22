const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.listen(80, () => console.log('Server started on port 80 http://localhost'));

app.get('/api/rsi', (req, res) => {
    axios.get("https://api.bitapi.pro/v1/market/oscillator").then(response => {
        let data = [];
        let names = [];
        let y = 1 ;
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i]?.rsi) {
                data.push({
                    x: y,
                    y: response.data[i]?.rsi,
                    label: response.data[i]?.symbol
                });
                names.push(response.data[i]?.symbol);
                y++;
            }   
        }
        res.send({xy: data, names: names});
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/views/index.html');
})