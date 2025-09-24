import React, { useState, useEffect } from 'react';
import Spinner from '../../components/common/Spinner';
import '../../components/admin/AdminCRUD.css';

const API_URL = 'http://localhost:5000/api/content';

/**
 * صفحة إدارة المحتوى العام — نسخة مدمجة ومنظفة
 * - دمجنا منطق الجلب، التحرير، الحفظ، وإلغاء التعديل.
 * - أضفنا دعمًا متسقًا للغات الثلاث (ar, en, no) لكل من:
 *   • فيديو ترحيبي (رابط واحد)
 *   • نبذة عنا في الصفحة الرئيسية (العنوان + النص)
 *   • صفحة من نحن (المقدمة/قصتنا، رؤيتنا، رسالتنا)
 * - عرض "وضع القراءة" يُظهر كل اللغات، وليس العربية فقط.
 */
const PagesManagerPage = () => {
  const [content, setContent] = useState(null);
  const [editingSection, setEditingSection] = useState(null); // 'video' | 'homeAbout' | 'aboutPage' | null
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setContent(data || {});
      } catch (err) {
        console.error('Failed to fetch content:', err);
      }
    };
    fetchContent();
  }, []);

  const handleEdit = (section) => setEditingSection(section);
  const handleCancel = () => setEditingSection(null);

  // تحديث عميق لأي مسار (path) داخل كائن المحتوى
  const handleChange = (e, ...path) => {
    const { value } = e.target;
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev ?? {}));
      let current = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('authToken');
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(content ?? {}),
      });
      setEditingSection(null);
      setMessage('تم حفظ التغييرات بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save content:', err);
      setMessage('تعذر الحفظ. حاول مرة أخرى.');
      setTimeout(() => setMessage(''), 4000);
    } finally {
      setSaving(false);
    }
  };

  if (!content) return (
    <div className="admin-page">
      <Spinner />
    </div>
  );

  // عناصر UI مساعدة
  const ActionButtons = (
    <div>
      <button onClick={handleSave} className="save-btn" disabled={saving}>
        {saving ? 'جاري الحفظ...' : 'حفظ'}
      </button>
      <button onClick={handleCancel} className="cancel-btn">إلغاء</button>
    </div>
  );

  const LangBlock = ({ title, obj, pathPrefix }) => (
    <>
      <div className="form-group">
        <label>{title} (عربي)</label>
        <textarea
          rows="4"
          value={obj?.ar || ''}
          onChange={(e) => handleChange(e, ...pathPrefix, 'ar')}
        />
      </div>
      <div className="form-group">
        <label>{title} (إنجليزي)</label>
        <textarea
          rows="4"
          value={obj?.en || ''}
          onChange={(e) => handleChange(e, ...pathPrefix, 'en')}
        />
      </div>
      <div className="form-group">
        <label>{title} (نرويجي)</label>
        <textarea
          rows="4"
          value={obj?.no || ''}
          onChange={(e) => handleChange(e, ...pathPrefix, 'no')}
        />
      </div>
    </>
  );

  const ReadonlyLangs = ({ label, obj }) => (
    <div className="readonly-lang-grid">
      <div>
        <h5>{label} — عربي</h5>
        <p className="display-text">{obj?.ar || '...'}</p>
      </div>
      <div>
        <h5>{label} — English</h5>
        <p className="display-text">{obj?.en || '...'}</p>
      </div>
      <div>
        <h5>{label} — Norsk</h5>
        <p className="display-text">{obj?.no || '...'}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <h1>إدارة المحتوى العام</h1>
      {message && <p className="success-message">{message}</p>}

      {/* قسم الفيديو الترحيبي */}
      <div className="editor-section">
        <div className="section-header">
          <h3>الصفحة الرئيسية: الفيديو الترحيبي</h3>
          {editingSection !== 'video' ? (
            <button onClick={() => handleEdit('video')} className="edit-btn">تعديل</button>
          ) : (
            ActionButtons
          )}
        </div>
        {editingSection === 'video' ? (
          <div className="form-group">
            <label>رابط يوتيوب</label>
            <input
              type="url"
              value={content?.welcomeVideoUrl || ''}
              onChange={(e) => handleChange(e, 'welcomeVideoUrl')}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        ) : (
          <p className="display-text">{content?.welcomeVideoUrl || 'لا يوجد رابط'}</p>
        )}
      </div>

      {/* قسم نبذة عنا في الرئيسية */}
      <div className="editor-section">
        <div className="section-header">
          <h3>الصفحة الرئيسية: نبذة عنا</h3>
          {editingSection !== 'homeAbout' ? (
            <button onClick={() => handleEdit('homeAbout')} className="edit-btn">تعديل</button>
          ) : (
            ActionButtons
          )}
        </div>
        {editingSection === 'homeAbout' ? (
          <>
            {/* العناوين */}
            <div className="form-group">
              <label>العنوان (عربي)</label>
              <input
                type="text"
                value={content?.homeAboutSnippet?.title?.ar || ''}
                onChange={(e) => handleChange(e, 'homeAboutSnippet', 'title', 'ar')}
              />
            </div>
            <div className="form-group">
              <label>العنوان (إنجليزي)</label>
              <input
                type="text"
                value={content?.homeAboutSnippet?.title?.en || ''}
                onChange={(e) => handleChange(e, 'homeAboutSnippet', 'title', 'en')}
              />
            </div>
            <div className="form-group">
              <label>العنوان (نرويجي)</label>
              <input
                type="text"
                value={content?.homeAboutSnippet?.title?.no || ''}
                onChange={(e) => handleChange(e, 'homeAboutSnippet', 'title', 'no')}
              />
            </div>
            <hr />
            {/* النصوص */}
            <LangBlock
              title="النص"
              obj={content?.homeAboutSnippet?.text}
              pathPrefix={[
                'homeAboutSnippet',
                'text',
              ]}
            />
          </>
        ) : (
          <div>
            <ReadonlyLangs label="العنوان" obj={content?.homeAboutSnippet?.title} />
            <ReadonlyLangs label="النص" obj={content?.homeAboutSnippet?.text} />
          </div>
        )}
      </div>

      {/* قسم صفحة من نحن */}
      <div className="editor-section">
        <div className="section-header">
          <h3>صفحة "من نحن"</h3>
          {editingSection !== 'aboutPage' ? (
            <button onClick={() => handleEdit('aboutPage')} className="edit-btn">تعديل</button>
          ) : (
            ActionButtons
          )}
        </div>

        {editingSection === 'aboutPage' ? (
          <>
            {/* المقدمة (قصتنا) */}
            <h4>المقدمة (قصتنا)</h4>
            <LangBlock
              title="النص"
              obj={content?.aboutPage?.introduction?.text}
              pathPrefix={[
                'aboutPage',
                'introduction',
                'text',
              ]}
            />
            <hr />

            {/* رؤيتنا */}
            <h4>رؤيتنا</h4>
            <LangBlock
              title="النص"
              obj={content?.aboutPage?.vision?.text}
              pathPrefix={[
                'aboutPage',
                'vision',
                'text',
              ]}
            />
            <hr />

            {/* رسالتنا */}
            <h4>رسالتنا</h4>
            <LangBlock
              title="النص"
              obj={content?.aboutPage?.mission?.text}
              pathPrefix={[
                'aboutPage',
                'mission',
                'text',
              ]}
            />
          </>
        ) : (
          <div>
            <h4>المقدمة (قصتنا)</h4>
            <ReadonlyLangs label="النص" obj={content?.aboutPage?.introduction?.text} />
            <br />
            <h4>رؤيتنا</h4>
            <ReadonlyLangs label="النص" obj={content?.aboutPage?.vision?.text} />
            <br />
            <h4>رسالتنا</h4>
            <ReadonlyLangs label="النص" obj={content?.aboutPage?.mission?.text} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesManagerPage;
