const app = require('./app');
const { PORT = 3001 } = process.env;

app.listen(3001, () => {
    console.log(`SERVER. App listening on port ${PORT}`);
});