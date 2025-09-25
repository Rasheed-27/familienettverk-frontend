import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminCRUD.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = 'https://familienettverk-api.onrender.com/api/slides';


const SliderManagerPage = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);

  // جلب كل الشرائح (طلب عام، لا يحتاج توكن)
  const fetchSlides = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Failed to fetch slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleOpenModal = (slide = null) => {
    setCurrentSlide(slide);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSlide(null);
  };

  const handleSave = async (slideData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("غير مصرح به. الرجاء تسجيل الدخول مرة أخرى.");
      return;
    }

    const method = currentSlide ? 'PUT' : 'POST';
    const url = currentSlide ? `${API_URL}/${currentSlide._id}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(slideData),
      });

      if (!response.ok) {
        throw new Error('فشل حفظ الشريحة.');
      }
      fetchSlides();
    } catch (error) {
      console.error("Failed to save slide:", error);
    }
    handleCloseModal();
  };

  const handleDelete = async (slideId) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الشريحة؟')) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("غير مصرح به. الرجاء تسجيل الدخول مرة أخرى.");
        return;
      }
      
      try {
        await fetch(`${API_URL}/${slideId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchSlides();
      } catch (error) {
        console.error("Failed to delete slide:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>إدارة شرائح السلايدر</h1>
        <button onClick={() => handleOpenModal()} className="add-btn">إضافة شريحة جديدة</button>
      </div>
      
      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>صورة مصغرة</th>
              <th>العنوان (عربي)</th>
              <th>العنوان (إنجليزي)</th>
              <th>الترتيب</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {slides.map(slide => (
              <tr key={slide._id}>
                <td><img src={slide.imageUrl} alt={slide.title?.ar} className="thumbnail" /></td>
                <td>{slide.title?.ar}</td>
                <td>{slide.title?.en}</td>
                <td>{slide.order}</td>
                <td>
                  <button onClick={() => handleOpenModal(slide)} className="edit-btn">تعديل</button>
                  <button onClick={() => handleDelete(slide._id)} className="delete-btn">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SliderForm 
          slide={currentSlide} 
          onSave={handleSave} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

// --- مكون النموذج (Form) ---
const SliderForm = ({ slide, onSave, onClose }) => {
  const initialData = {
    title: { ar: '', en: '', no: '' },
    subtitle: { ar: '', en: '', no: '' },
    imageUrl: '',
    buttonText: { ar: '', en: '', no: '' },
    buttonLink: '',
    order: 0,
    ...slide
  };
  const [formData, setFormData] = useState(initialData);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e, lang = null, field = null) => {
    const { name, value } = e.target;
    if (lang && field) {
        setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("غير مصرح به. الرجاء تسجيل الدخول مرة أخرى.");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    setUploading(true);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadFormData,
      });
      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
      } else { throw new Error(data.message || 'Upload failed'); }
    } catch (error) {
      console.error("Upload error:", error);
      alert("فشل رفع الصورة.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{slide ? 'تعديل الشريحة' : 'إضافة شريحة جديدة'}</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>العنوان (عربي)</label>
                <input type="text" value={formData.title.ar} onChange={(e) => handleChange(e, 'ar', 'title')} required />
            </div>
            <div className="form-group">
                <label>العنوان (إنجليزي)</label>
                <input type="text" value={formData.title.en} onChange={(e) => handleChange(e, 'en', 'title')} required />
            </div>
            <div className="form-group">
                <label>العنوان (نرويجي)</label>
                <input type="text" value={formData.title.no} onChange={(e) => handleChange(e, 'no', 'title')} required />
            </div>
            <hr/>
            <div className="form-group">
                <label>النص الفرعي (عربي)</label>
                <input type="text" value={formData.subtitle.ar} onChange={(e) => handleChange(e, 'ar', 'subtitle')} />
            </div>
            <div className="form-group">
                <label>النص الفرعي (إنجليزي)</label>
                <input type="text" value={formData.subtitle.en} onChange={(e) => handleChange(e, 'en', 'subtitle')} />
            </div>
            <div className="form-group">
                <label>النص الفرعي (نرويجي)</label>
                <input type="text" value={formData.subtitle.no} onChange={(e) => handleChange(e, 'no', 'subtitle')} />
            </div>
            <hr/>
            <div className="form-group">
                <label>رفع صورة من الجهاز</label>
                <input type="file" name="image" onChange={handleFileUpload} />
                {uploading && <p>جاري رفع الصورة...</p>}
                {formData.imageUrl && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px', borderRadius: '5px' }} />
                    </div>
                )}
            </div>
           <div className="form-group">
    <label>أو أدخل رابط صورة مباشرة</label>
    <input 
        type="url" 
        name="imageUrl" 
        value={formData.imageUrl} 
        onChange={handleChange} 
        placeholder="سيتم تحديث هذا الحقل تلقائيًا عند الرفع"
        // --- تم حذف "required" من هنا ---
    />
</div>
            <div className="form-group">
                <label>الترتيب</label>
                <input type="number" name="order" value={formData.order} onChange={handleChange} />
            </div>
            <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={uploading}>
                  {uploading ? 'يرجى الانتظار...' : 'حفظ'}
                </button>
                <button type="button" onClick={onClose} className="cancel-btn">إلغاء</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SliderManagerPage;