import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const logSchema = new mongoose.Schema({
    service: String,
    level: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});
const Log = mongoose.model('Log', logSchema);

app.post('/logs', async (req, res) => {
    try {
        const doc = await Log.create(req.body);
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

app.get('/logs', async (req, res) => {
    const { service, level } = req.query;
    const filter: any = {};
    if (service) filter.service = service;
    if (level) filter.level = level;
    const records = await Log.find(filter)
        .sort({ timestamp: -1 })
        .limit(100);
    res.json(records);
});

const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI!)
    .then(() => app.listen(port, () =>
        console.log(`Backend listening on ${port}`)))
    .catch(console.error);