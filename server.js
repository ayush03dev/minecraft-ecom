import express from 'express';
import routes from './routes/index.js';
import connectDB from './config/db.js';
import expressWs from 'express-ws';
import path from 'path';

const app = express();
const wss = expressWs(app);
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.use('/api/package', routes.package);
app.use('/api/category', routes.category);
app.use('/api/transaction', routes.payment);
app.use('/api/minecraft', routes.minecraft);

app.ws('/', (ws, req) => {
    global.mcSocket = ws;
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
} 

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});


