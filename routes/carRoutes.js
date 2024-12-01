// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// GET /cars - Lấy danh sách xe
router.get('/', carController.getAllCars);

// GET /cars/new - Hiển thị form thêm xe mới
router.get('/new', carController.showNewForm);

// POST /cars - Thêm xe mới
router.post('/', carController.createCar);

// GET /cars/:id - Hiển thị chi tiết xe
router.get('/:id', carController.getCarById);

// GET /cars/:id/edit - Hiển thị form chỉnh sửa xe
router.get('/:id/edit', carController.showEditForm);

// PUT /cars/:id - Cập nhật thông tin xe
router.put('/:id', carController.updateCar);

// DELETE /cars/:id - Xóa xe
router.delete('/:id', carController.deleteCar);

module.exports = router;
