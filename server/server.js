const app = require('./app.js');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Instapix'));
app.get('/api/hello', (req, res) => res.send({ express: 'Hello From Express' }));

app.listen(port, () => console.log(`Listening on port ${port}`));