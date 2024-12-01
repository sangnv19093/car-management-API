// controllers/carController.js
const Car = require('../models/Car');

// Lấy danh sách xe
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.render('cars/index', { cars });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy danh sách xe');
    }
};

// Hiển thị form thêm xe mới
exports.showNewForm = (req, res) => {
    res.render('cars/new');
};

// Thêm xe mới
exports.createCar = async (req, res) => {
    try {
        const { name, manufacturer, year, price, description } = req.body;
        const newCar = new Car({ name, manufacturer, year, price, description });
        await newCar.save();
        res.redirect('/cars');
    } catch (err) {
        res.status(500).send('Lỗi khi thêm xe mới');
    }
};

// Hiển thị chi tiết xe
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Không tìm thấy xe');
        }
        res.render('cars/show', { car });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy thông tin xe');
    }
};

// Hiển thị form chỉnh sửa xe
exports.showEditForm = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Không tìm thấy xe');
        }
        res.render('cars/edit', { car });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy thông tin xe để chỉnh sửa');
    }
};

// Cập nhật thông tin xe
exports.updateCar = async (req, res) => {
    try {
        const { name, manufacturer, year, price, description } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
            name,
            manufacturer,
            year,
            price,
            description
        }, { new: true, runValidators: true });

        if (!updatedCar) {
            return res.status(404).send('Không tìm thấy xe để cập nhật');
        }

        res.redirect(`/cars/${updatedCar._id}`);
    } catch (err) {
        res.status(500).send('Lỗi khi cập nhật thông tin xe');
    }
};

// Xóa xe
exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).send('Không tìm thấy xe để xóa');
        }
        res.redirect('/cars');
    } catch (err) {
        res.status(500).send('Lỗi khi xóa xe');
    }
};

// API: Lấy danh sách xe
exports.getAllCarsApi = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách xe' });
    }
};

// API: Thêm xe mới
exports.createCarApi = async (req, res) => {
    try {
        const { name, manufacturer, year, price, description } = req.body;
        const newCar = new Car({ name, manufacturer, year, price, description });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: 'Lỗi khi thêm xe mới', error: err });
    }
};

// API: Lấy chi tiết xe
exports.getCarByIdApi = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Không tìm thấy xe' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin xe' });
    }
};

// API: Cập nhật xe
exports.updateCarApi = async (req, res) => {
    try {
        const { name, manufacturer, year, price, description } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, {
            name,
            manufacturer,
            year,
            price,
            description
        }, { new: true, runValidators: true });

        if (!updatedCar) {
            return res.status(404).json({ message: 'Không tìm thấy xe để cập nhật' });
        }

        res.json(updatedCar);
    } catch (err) {
        res.status(400).json({ message: 'Lỗi khi cập nhật thông tin xe', error: err });
    }
};

// API: Xóa xe
exports.deleteCarApi = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Không tìm thấy xe để xóa' });
        }
        res.json({ message: 'Xe đã được xóa thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa xe' });
    }
};
