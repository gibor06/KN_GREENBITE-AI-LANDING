# GreenBiteAI — Smart Food Rescue Platform for Campus F&B

**GreenBiteAI** là nền tảng ứng dụng trí tuệ nhân tạo (AI) giúp giải cứu thực phẩm dư thừa thông minh cho hệ sinh thái F&B xung quanh các trường đại học. Dự án giải quyết bài toán lãng phí thức ăn cuối ngày của các quán ăn, đồng thời mang đến các bữa ăn chất lượng với mức giá tiết kiệm tối ưu cho sinh viên.

---

## 🌟 Tính Năng Cốt Lõi

1. **AI Surplus Forecasting (Dự báo dư thừa bằng AI)**:
   - Dự báo tự động nguy cơ dư thừa thực phẩm cuối ngày dựa trên lịch sử đơn hàng, tồn kho, thời tiết và lịch trình sự kiện học đường của từng quán ăn.
2. **Dynamic Rescue Pricing (Định giá cứu trợ động)**:
   - AI tự động đề xuất mức giá giảm tối ưu (thường từ 25% - 30%) dựa trên số phần ăn còn lại và khung giờ đóng cửa của cửa hàng.
3. **Food Risk Score (Sàng lọc rủi ro thực phẩm)**:
   - Công cụ sàng lọc và chấm điểm an toàn ban đầu dựa trên thời gian chế biến, điều kiện bảo quản thực phẩm thực tế và lịch sử phản hồi từ người dùng.
4. **Scheduled Pickup (Hẹn giờ nhận đồ)**:
   - Sinh viên chủ động lựa chọn khung giờ nhận món phù hợp với lịch học, tránh làm quán phải lưu kho lâu hoặc quá tải giờ cao điểm.
5. **QR Verification (Xác thực bằng mã QR)**:
   - Nhận món chính xác trong 5 giây tại quầy thông qua mã QR được cấp trực tiếp trên ứng dụng sau khi chủ quán duyệt đơn.
6. **Green Impact Dashboard (Bảng giám sát tác động xanh)**:
   - Đo lường trực quan lượng phát thải khí CO2 được giảm thiểu, ngân sách tiết kiệm cho sinh viên, và doanh thu thu hồi cho các quán ăn đối tác.

---

## 🛠️ Công Nghệ Sử Dụng

- **Core**: ReactJS (Functional Components, Hooks)
- **Bundler & Build Tool**: Vite (Cấu hình tối ưu HMR cực nhanh)
- **Styling**: Tailwind CSS v4 (Cấu trúc giao diện cao cấp, bento grid, responsive mobile-first)
- **Icons**: Lucide React
- **Fonts**: Lexend (tiêu đề công nghệ), Inter (nội dung hiển thị rõ ràng ký tự Tiếng Việt)
- **Custom Features**: Tích hợp **Scroll Spy** tự động làm sáng và đồng bộ trạng thái thanh điều hướng (Navbar active state) khi cuộn trang.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu cầu hệ thống
- Đã cài đặt [Node.js](https://nodejs.org/) (Khuyên dùng phiên bản 18 trở lên)
- Đã cài đặt Trình quản lý gói `npm` (mặc định đi kèm Node.js)

### Các bước khởi động nhanh

1. **Clone repository (Tải mã nguồn về máy)**:
   ```bash
   git clone https://github.com/gibor06/GREENBITE-AI-LANDING.git
   cd GreenBite_LandingPage
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies)**:
   ```bash
   npm install
   ```

3. **Chạy dự án ở chế độ phát triển (Local Development)**:
   ```bash
   npm run dev
   ```
   Sau đó, mở trình duyệt và truy cập địa chỉ `http://localhost:5173` (hoặc cổng được hiển thị trong terminal) để trải nghiệm giao diện.

4. **Biên dịch sản phẩm (Production Build)**:
   ```bash
   npm run build
   ```
   Bản build sản phẩm sau khi tối ưu hóa sẽ được xuất ra thư mục `/dist` sẵn sàng cho việc triển khai (deploy) lên host/server.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```txt
GreenBite_LandingPage/
├── public/                # Thư mục chứa các tài nguyên tĩnh (favicon, icons)
├── src/
│   ├── assets/            # Chứa các hình ảnh, biểu trưng dùng trong UI
│   ├── pages/
│   │   └── LandingPage.jsx # File code chứa toàn bộ giao diện & logic chính của Landing Page
│   ├── App.css            # File styles tùy chỉnh bổ sung cho App
│   ├── App.jsx            # Component gốc điều phối chính hiển thị LandingPage
│   ├── index.css          # File config import Tailwind CSS v4 và Google Fonts
│   └── main.jsx           # Điểm khởi tạo ứng dụng React
├── vite.config.js         # Cấu hình plugin React và Tailwind CSS cho Vite
├── package.json           # Quản lý thư viện cài đặt và các câu lệnh chạy script
└── README.md              # Tài liệu giới thiệu dự án (Tập tin hiện tại)
```

---

## 🤝 Về Chúng Tôi

Dự án **GreenBiteAI** được phát triển và thiết kế bởi **HUIT Startup Team 2026** (Trường Đại học Công thương TP.HCM) hướng tới mô hình kinh tế tuần hoàn bền vững trong học đường.

- **Email liên hệ**: support@greenbiteai.vn
- **Bản quyền**: © 2026 GreenBiteAI. All rights reserved.
