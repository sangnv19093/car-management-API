// routes/api/carApiRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../../controllers/carController');

// GET /api/cars - Lấy danh sách xe
router.get('/', carController.getAllCarsApi);

// POST /api/cars - Thêm xe mới
router.post('/', carController.createCarApi);

// GET /api/cars/:id - Lấy chi tiết xe
router.get('/:id', carController.getCarByIdApi);

// PUT /api/cars/:id - Cập nhật xe
router.put('/:id', carController.updateCarApi);

// DELETE /api/cars/:id - Xóa xe
router.delete('/:id', carController.deleteCarApi);

module.exports = router;
