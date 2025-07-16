import React, { useState } from "react";
import axios from "axios";
import "./ImageSearch.css";

export default function ImageSearch({ onSearchResult }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSearch = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/image-search", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSearchResult(res.data.products || []);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm hình ảnh:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-search">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Đang tìm..." : "Tìm sản phẩm bằng ảnh"}
      </button>
    </div>
  );
}
