const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Lấy phần mở rộng của file
    const ext = file.mimetype.split('/')[1];

    // Chỉ cho phép các định dạng ảnh cụ thể
    const allowedFormats = ['jpg', 'jpeg', 'png', 'svg'];
    if (!allowedFormats.includes(ext)) {
      throw new Error('File format not supported');
    }

    return {
      folder: 'images', // Tên thư mục bạn muốn lưu trữ trên Cloudinary
      format: ext, // Định dạng file, giữ nguyên định dạng gốc của file
      public_id: file.originalname.split('.')[0], // Tên file không bao gồm phần mở rộng
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
