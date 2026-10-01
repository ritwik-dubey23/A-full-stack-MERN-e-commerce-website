require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)));
