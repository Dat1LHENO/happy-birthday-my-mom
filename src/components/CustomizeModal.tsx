import React, { useState } from 'react';
import type { CardContent } from '../types';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: CardContent;
  photos: string[];
  onSave: (newContent: CardContent, newPhotos: string[]) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  content,
  photos,
  onSave,
}) => {
  const [receiverName, setReceiverName] = useState(content.receiverName);
  const [senderName, setSenderName] = useState(content.senderName);
  const [day, setDay] = useState(content.opening.day);
  const [month, setMonth] = useState(content.opening.month);
  const [letterBody, setLetterBody] = useState(content.letter.body);
  const [photoList, setPhotoList] = useState<string[]>(photos);
  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImgs: string[] = [];
    let processed = 0;

    Array.from(files).slice(0, 4).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImgs.push(event.target.result as string);
        }
        processed++;
        if (processed === Math.min(files.length, 4)) {
          setPhotoList([...newImgs, ...photoList].slice(0, 6));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    const updated: CardContent = {
      ...content,
      receiverName,
      senderName,
      opening: {
        ...content.opening,
        greeting: `Happy Birthday ${receiverName}`,
        day: Number(day),
        month: Number(month),
      },
      letter: {
        ...content.letter,
        body: letterBody,
        signature: `— ${senderName} ❤️`,
      },
      final: {
        ...content.final,
        title: `Chúc Mừng Sinh Nhật ${receiverName}`,
        from: `từ ${senderName}`,
      },
      heart: {
        ...content.heart,
        title: `Chúc Mừng Sinh Nhật ${receiverName}.`,
      },
    };

    onSave(updated, photoList);
    onClose();
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('receiverName', receiverName);
    url.searchParams.set('senderName', senderName);
    url.searchParams.set('day', String(day));
    url.searchParams.set('month', String(month));
    url.searchParams.set('letter', letterBody);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <div
      className="lovegift-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '1rem',
      }}
    >
      <div
        className="lovegift-lightbox-in"
        style={{
          width: 'min(94vw, 480px)',
          maxHeight: '88vh',
          overflowY: 'auto',
          backgroundColor: '#1f1017',
          border: '1px solid rgba(201, 162, 75, 0.45)',
          borderRadius: '1.25rem',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3
            className="font-serif"
            style={{ fontSize: '1.35rem', color: '#f4d68a' }}
          >
            🌸 Tùy Chỉnh Thiệp Tặng Mẹ
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(246, 234, 216, 0.6)',
              fontSize: '1.25rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'rgba(246, 234, 216, 0.7)', marginTop: '0.25rem' }}>
          Bạn có thể thay đổi ngày sinh, tên xưng hô, ảnh của Mẹ và lời nhắn gửi yêu thương!
        </p>

        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Names */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Tên gọi Mẹ:</label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="VD: Mẹ yêu, Mẹ Lan..."
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(201, 162, 75, 0.3)',
                  color: 'var(--color-cream)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Tên của bạn:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="VD: Con, Con gái út..."
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(201, 162, 75, 0.3)',
                  color: 'var(--color-cream)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          </div>

          {/* Birthday Day & Month */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Ngày sinh nhật:</label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(201, 162, 75, 0.3)',
                  color: 'var(--color-cream)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>Tháng sinh:</label>
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(201, 162, 75, 0.3)',
                  color: 'var(--color-cream)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          </div>

          {/* Photos of Mom */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>
              Ảnh kỷ niệm về Mẹ (tối đa 4 ảnh):
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {photoList.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    width: '54px',
                    height: '54px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid rgba(201, 162, 75, 0.4)',
                    flexShrink: 0,
                  }}
                >
                  <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <label
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px dashed rgba(201, 162, 75, 0.5)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: 'var(--color-cream)',
                backgroundColor: 'rgba(201, 162, 75, 0.1)',
              }}
            >
              📷 Tải ảnh của Mẹ từ máy
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Letter Message */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>
              Bức thư gửi gắm đến Mẹ:
            </label>
            <textarea
              rows={6}
              value={letterBody}
              onChange={(e) => setLetterBody(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(201, 162, 75, 0.3)',
                color: 'var(--color-cream)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                resize: 'vertical',
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <button
            type="button"
            onClick={handleSave}
            className="btn-gold-glow"
            style={{ width: '100%', padding: '0.65rem' }}
          >
            Lưu & Áp Dụng Ngay ✨
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            style={{
              padding: '0.55rem',
              borderRadius: '9999px',
              border: '1px solid rgba(246, 234, 216, 0.3)',
              backgroundColor: 'transparent',
              color: 'var(--color-cream)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            {copyFeedback ? '✓ Đã sao chép link!' : '🔗 Sao chép link gửi cho Mẹ'}
          </button>
        </div>
      </div>
    </div>
  );
};
