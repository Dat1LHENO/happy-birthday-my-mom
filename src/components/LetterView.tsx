import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { LetterData } from '../types';

interface LetterViewProps {
  letterData: LetterData;
  paperImg: string;
  photoImg: string;
  onNext: () => void;
}

export const LetterView: React.FC<LetterViewProps> = ({
  letterData,
  paperImg,
  photoImg,
  onNext,
}) => {
  const { kicker, body, signature, next } = letterData;
  const [revealedChars, setRevealedChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  const animRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const completeTyping = useCallback(() => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    setRevealedChars(body.length);
    setTypingDone(true);
  }, [body.length]);

  // Typewriter effect
  useEffect(() => {
    setRevealedChars(0);
    setTypingDone(false);

    const totalLen = body.length;
    if (totalLen === 0) {
      setTypingDone(true);
      return;
    }

    const startTime = performance.now();
    // chars per second (smooth reading speed)
    const cps = Math.max(38, totalLen / 36);

    const tick = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const count = Math.min(totalLen, Math.floor(elapsedSec * cps));
      setRevealedChars(count);

      if (count >= totalLen) {
        completeTyping();
      } else {
        animRef.current = requestAnimationFrame(tick);
      }
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [body, completeTyping]);

  // Scroll to bottom as text expands
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (typingDone) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      return;
    }

    const cur = cursorRef.current;
    if (!cur) return;
    const parentRect = el.getBoundingClientRect();
    const curRect = cur.getBoundingClientRect();
    const threshold = parentRect.bottom - 40;

    if (curRect.bottom > threshold) {
      el.scrollTop += curRect.bottom - threshold;
    }
  }, [revealedChars, typingDone]);

  return (
    <section
      className="lovegift-fade-up lovegift-scroll-soft relative flex max-h-[calc(100dvh-3rem)] w-full max-w-md flex-col items-center overflow-y-auto overscroll-contain px-1 text-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '28rem',
      }}
    >
      <p className="lovegift-kicker">{kicker}</p>

      {/* Parchment Container */}
      <div
        className="lovegift-letter-paper"
        style={{ backgroundImage: `url(${paperImg})` }}
        onClick={completeTyping}
        title="Nhấp để hiển thị toàn bộ thư"
      >
        {/* Taped Polaroid Photo */}
        <div
          style={{
            position: 'absolute',
            top: '-86px',
            right: 0,
            zIndex: 20,
            width: '76px',
            transform: 'rotate(6deg)',
            borderRadius: '3px',
            backgroundColor: '#fbf7ee',
            padding: '6px 6px 14px 6px',
            boxShadow: '0 10px 22px rgba(0,0,0,0.4)',
          }}
        >
          {/* Tape */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-3deg)',
              width: '44px',
              height: '16px',
              borderRadius: '1px',
              backgroundColor: 'rgba(230, 217, 189, 0.75)',
            }}
          />
          <img
            src={photoImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              display: 'block',
              aspectRatio: '3 / 4',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Scrollable Letter Content */}
        <div
          ref={scrollRef}
          className="lovegift-letter-scroll"
          style={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            padding: '2.5rem 2rem 2.2rem 2rem',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              minHeight: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Ghost text for layout calculation + typed text overlay */}
            <p
              className="font-hand font-semibold text-[#4a3527]"
              style={{
                position: 'relative',
                whiteSpace: 'pre-line',
                fontSize: 'clamp(15px, 4vw, 17px)',
                lineHeight: '1.65',
                color: '#4a3527',
              }}
            >
              <span style={{ visibility: 'hidden' }}>{body}</span>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {body.slice(0, revealedChars)}
                <span
                  ref={cursorRef}
                  style={{ display: 'inline-block', width: 0, verticalAlign: 'baseline' }}
                />
              </span>
            </p>

            {/* Signature */}
            <p
              className="font-hand font-semibold text-[#4a3527]"
              style={{
                marginTop: '1.25rem',
                alignSelf: 'flex-end',
                fontSize: 'clamp(15px, 4vw, 18px)',
                color: '#4a3527',
                transition: 'opacity 0.7s ease',
                opacity: typingDone ? 1 : 0,
              }}
            >
              {signature}
            </p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div
        style={{
          marginTop: '2rem',
          transition: 'opacity 0.7s ease',
          opacity: typingDone ? 1 : 0,
          pointerEvents: typingDone ? 'auto' : 'none',
        }}
      >
        <button type="button" onClick={onNext} className="btn-gold-pill">
          {next}
        </button>
      </div>
    </section>
  );
};
