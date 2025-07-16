-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT,
  image TEXT,
  keywords TEXT[]
);

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user' -- user | admin
);

-- Dữ liệu mẫu
INSERT INTO products (name, price, image, keywords)
VALUES 
  ('Bút chì', '150,000đ', '/image/butchip333.jpg', ARRAY['pencil', 'stationery']),
  ('Bấm ghim', '150,000đ', '/image/bamkim206.jpg', ARRAY['stapler', 'office']),
  ('Màng bọc', '150,000đ', '/image/mangbong.jpg', ARRAY['plastic wrap', 'film', 'wrap']),
  ('Pin', '50,000đ', '/image/pin2a.jpg', ARRAY['battery', 'AA', 'power']),
  ('Giấy Kraft', '80,000đ', '/image/giaykraft.jpg', ARRAY['kraft', 'paper', 'brown']);
