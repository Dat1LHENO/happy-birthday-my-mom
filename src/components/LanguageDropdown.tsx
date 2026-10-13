import React, { useEffect, useRef, useState } from 'react';
import { LOCALES } from '../data/defaultData';

interface LanguageDropdownProps {
  currentLocale: string;
  onSelectLocale: (locale: string) => void;
  languageLabel: string;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLocale,
  onSelectLocale,
  languageLabel,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeLocaleObj = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 40,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {open && (
        <div
          role="listbox"
          className="lovegift-fade-in"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '0.5rem',
            maxHeight: '52vh',
            width: '11rem',
            overflowY: 'auto',
            borderRadius: '1rem',
            border: '1px solid rgba(201, 162, 75, 0.4)',
            backgroundColor: 'rgba(26, 14, 7, 0.95)',
            padding: '0.35rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {LOCALES.map((loc) => {
            const isSelected = loc.code === currentLocale;
            return (
              <button
                key={loc.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectLocale(loc.code);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  gap: '0.6rem',
                  borderRadius: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  color: isSelected ? 'var(--color-cream)' : 'rgba(246, 234, 216, 0.85)',
                  backgroundColor: isSelected ? 'rgba(201, 162, 75, 0.2)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{loc.flag}</span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {loc.label}
                </span>
                {isSelected && <span style={{ color: '#e8cf94' }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={languageLabel}
        title={languageLabel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderRadius: '9999px',
          border: '1px solid rgba(201, 162, 75, 0.4)',
          backgroundColor: 'rgba(26, 14, 7, 0.7)',
          padding: '0.6rem 1rem',
          fontSize: '0.875rem',
          color: 'rgba(246, 234, 216, 0.9)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>
          🌐
        </span>
        <span style={{ lineHeight: 1 }}>{activeLocaleObj.flag}</span>
        <span className="hidden sm:inline" style={{ lineHeight: 1 }}>
          {activeLocaleObj.label}
        </span>
      </button>
    </div>
  );
};
