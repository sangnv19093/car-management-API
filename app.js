// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const carRoutes = require('./routes/carRoutes');



dotenv.config();

const app = express();

const carApiRoutes = require('./routes/api/carApiRoutes');
// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch(err => console.error('Không thể kết nối MongoDB:', err));

// Thiết lập EJS
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes
app.use('/cars', carRoutes);

// Mount API routes
app.use('/api/cars', carApiRoutes);

// Route gốc
app.get('/', (req, res) => {
    res.redirect('/cars');
});

// Lắng nghe cổng
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
