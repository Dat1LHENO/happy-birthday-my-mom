import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CardContent, CardImages, CardStage } from './types';
import { CONTENTS, DEFAULT_IMAGES, parseQueryParams } from './data/defaultData';
import { OpeningReel } from './components/OpeningReel';
import { CakeCandle } from './components/CakeCandle';
import { PoeticBeats } from './components/PoeticBeats';
import { WishPicker } from './components/WishPicker';
import { HeartMosaic } from './components/HeartMosaic';
import { LetterView } from './components/LetterView';
import { FinalCard } from './components/FinalCard';
import { StarlightSky } from './components/StarlightSky';
import { PetalRain } from './components/PetalRain';
import { CustomizeModal } from './components/CustomizeModal';

export function App() {
  const [locale] = useState('vi');
  const [stage, setStage] = useState<CardStage>('opening');
  const [selectedWishIdx, setSelectedWishIdx] = useState<number | null>(null);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioStartedRef = useRef(false);

  // Candle intro state
  const [candleLit, setCandleLit] = useState(false);
  const [candleHolding, setCandleHolding] = useState(false);
  const [candleProgress, setCandleProgress] = useState(0);
  const [candleExtinguished, setCandleExtinguished] = useState(false);

  const holdStartRef = useRef(0);
  const candleRafRef = useRef<number | null>(null);

  // Images and Custom Content
  const [images, setImages] = useState<CardImages>(DEFAULT_IMAGES);
  const [customOverride, setCustomOverride] = useState<Partial<CardContent>>({});
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Load URL query params on startup
  useEffect(() => {
    const params = parseQueryParams();
    if (Object.keys(params).length > 0) {
      const { customImages, ...contentOverrides } = params;
      if (customImages && customImages.length > 0) {
        setImages((prev) => ({
          ...prev,
          girls: customImages,
          letterPhoto: customImages[0],
        }));
      }
      setCustomOverride(contentOverrides);
    }
  }, []);

  // Merge default content with language and custom overrides
  const content = useMemo<CardContent>(() => {
    const base = CONTENTS[locale] || CONTENTS.vi;
    return {
      ...base,
      ...customOverride,
      opening: {
        ...base.opening,
        ...(customOverride.opening || {}),
      },
      intro: {
        ...base.intro,
        ...(customOverride.intro || {}),
      },
      wish: {
        ...base.wish,
        ...(customOverride.wish || {}),
      },
      heart: {
        ...base.heart,
        ...(customOverride.heart || {}),
      },
      letter: {
        ...base.letter,
        ...(customOverride.letter || {}),
      },
      final: {
        ...base.final,
        ...(customOverride.final || {}),
      },
      starlight: {
        ...base.starlight,
        ...(customOverride.starlight || {}),
      },
      ui: base.ui,
    };
  }, [locale, customOverride]);

  // Audio start on first touch
  const handleStartAudio = useCallback(() => {
    if (audioStartedRef.current) return;
    const audio = audioRef.current;
    if (audio) {
      audioStartedRef.current = true;
      audio.volume = 0.65;
      audio
        .play()
        .catch(() => {
          audioStartedRef.current = false;
        });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioStartedRef.current) {
      handleStartAudio();
    }
    const audio = audioRef.current;
    if (audio) {
      const nextMuted = !isMuted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Candle lighting timer in 'intro' stage
  useEffect(() => {
    if (stage !== 'intro' || candleLit) return;
    const timer = window.setTimeout(() => setCandleLit(true), 1850);
    return () => window.clearTimeout(timer);
  }, [stage, candleLit]);

  const stopCandleRaf = useCallback(() => {
    if (candleRafRef.current !== null) {
      cancelAnimationFrame(candleRafRef.current);
      candleRafRef.current = null;
    }
  }, []);

  // Hold to blow out candle
  const handleCandleHoldStart = () => {
    if (!candleLit || candleExtinguished || candleHolding) return;
    setCandleHolding(true);
    holdStartRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - holdStartRef.current) / 2600;
      const prog = Math.min(1, elapsed);
      setCandleProgress(prog);

      if (prog >= 1) {
        stopCandleRaf();
        setCandleHolding(false);
        setCandleExtinguished(true);
        window.setTimeout(() => setStage('beats'), 1600);
      } else {
        candleRafRef.current = requestAnimationFrame(tick);
      }
    };

    candleRafRef.current = requestAnimationFrame(tick);
  };

  const handleCandleHoldEnd = () => {
    if (candleExtinguished) return;
    stopCandleRaf();
    setCandleHolding(false);
    setCandleProgress(0);
  };

  // Reset entire experience
  const handleRestart = () => {
    stopCandleRaf();
    setCandleLit(false);
    setCandleHolding(false);
    setCandleProgress(0);
    setCandleExtinguished(false);
    setSelectedWishIdx(null);
    setStage('opening');
  };

  const showPetals = stage === 'heart' || stage === 'final';

  return (
    <main
      className="lovegift-stage-bg lovegift-no-select"
      onPointerDown={handleStartAudio}
    >
      {/* Background Audio */}
      <audio ref={audioRef} src="/music/birthday.mp3" loop preload="auto" />

      {/* Audio Mute/Unmute Toggle Button */}
      <button
        type="button"
        onClick={toggleMute}
        className="audio-trigger-btn"
        aria-label={isMuted ? content.ui.musicOn : content.ui.musicOff}
        title={isMuted ? content.ui.musicOn : content.ui.musicOff}
      >
        {isMuted ? '🔇' : '🎵'}
      </button>

      {/* Customize Card Button */}
      {/* <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsCustomizeOpen(true);
        }}
        className="customize-trigger-btn"
      >
        <span>✨</span>
        <span>{content.ui.customizeBtn}</span>
      </button> */}

      {/* Floating Petals on Heart & Final stages */}
      {showPetals && <PetalRain petals={images.petals} />}

      {/* Language Switcher */}
      {/* <LanguageDropdown
        currentLocale={locale}
        onSelectLocale={setLocale}
        languageLabel={content.ui.languageLabel}
      /> */}

      {/* Stage 1: Opening Reel */}
      {stage === 'opening' && (
        <OpeningReel
          data={content.opening}
          ui={content.ui}
          onDone={() => setStage('intro')}
        />
      )}

      {/* Stage 2: Birthday Cake & Candle Blow Out */}
      {stage === 'intro' && (
        <section
          className="relative flex w-full max-w-md flex-col items-center"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '28rem',
          }}
        >
          {/* Top Garland Bunting */}
          <img
            src={images.garland}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none select-none"
            style={{
              position: 'relative',
              zIndex: 0,
              width: 'min(680px, 150vw)',
              maxWidth: 'none',
              opacity: candleExtinguished ? 0 : 1,
              transition: 'opacity 0.8s ease',
            }}
          />

          {/* Dim Overlays */}
          <div
            aria-hidden="true"
            style={{
              pointerEvents: 'none',
              position: 'fixed',
              inset: 0,
              zIndex: 10,
              backgroundColor: '#000',
              opacity: 0.62 * (!candleLit ? 1 : 0),
              transition: 'opacity 1.1s ease',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              pointerEvents: 'none',
              position: 'fixed',
              inset: 0,
              zIndex: 20,
              backgroundColor: '#000',
              opacity: candleProgress,
              transition: candleHolding ? 'none' : 'opacity 0.6s ease',
            }}
          />

          {/* Interactive Cake & Candle */}
          <div
            className="cursor-pointer"
            style={{
              position: 'relative',
              zIndex: 30,
              marginTop: '0.75rem',
              touchAction: 'none',
            }}
            onPointerDown={handleCandleHoldStart}
            onPointerUp={handleCandleHoldEnd}
            onPointerLeave={handleCandleHoldEnd}
            onPointerCancel={handleCandleHoldEnd}
            onMouseDown={handleCandleHoldStart}
            onMouseUp={handleCandleHoldEnd}
            onTouchStart={handleCandleHoldStart}
            onTouchEnd={handleCandleHoldEnd}
          >
            <CakeCandle
              cakeImg={images.cake}
              progress={candleProgress}
              holding={candleHolding}
              extinguished={candleExtinguished}
              lit={candleLit}
            />
          </div>

          {/* Text Guidance */}
          <div
            style={{
              position: 'relative',
              zIndex: 30,
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: 1 - 0.85 * candleProgress,
              transition: candleHolding ? 'none' : 'opacity 0.6s ease',
            }}
          >
            <p
              className="font-serif text-cream"
              style={{ fontSize: 'clamp(22px, 5.5vw, 26px)' }}
            >
              {content.intro.line1}
            </p>
            <p
              style={{
                marginTop: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'rgba(246, 234, 216, 0.75)',
              }}
            >
              {content.intro.line2}
            </p>

            {candleLit ? (
              candleHolding ? (
                <p
                  className="font-script"
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '1.2rem',
                    color: 'rgba(246, 234, 216, 0.95)',
                  }}
                >
                  {content.intro.holdingHint}
                </p>
              ) : (
                <>
                  <p
                    style={{
                      marginTop: '1.25rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: 'rgba(246, 234, 216, 0.85)',
                    }}
                  >
                    {content.intro.idleHint}
                  </p>
                  {!candleExtinguished && (
                    <button
                      type="button"
                      onClick={() => {
                        setCandleHolding(false);
                        setCandleExtinguished(true);
                        window.setTimeout(() => setStage('beats'), 1600);
                      }}
                      style={{
                        marginTop: '0.75rem',
                        background: 'rgba(201, 162, 75, 0.15)',
                        border: '1px solid rgba(201, 162, 75, 0.4)',
                        color: '#ffe6a6',
                        borderRadius: '9999px',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      💨 Hoặc nhấp vào đây để thổi tắt nến
                    </button>
                  )}
                </>
              )
            ) : (
              <p
                className="font-script"
                style={{
                  marginTop: '1.25rem',
                  fontSize: '1.15rem',
                  color: 'rgba(246, 234, 216, 0.8)',
                }}
              >
                {content.intro.lightingHint}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Stage 3: Poetic Beats & Blackout */}
      {stage === 'beats' && (
        <PoeticBeats
          beats={content.beats}
          blackoutCaption={content.blackoutCaption}
          onDone={() => setStage('wish')}
        />
      )}

      {/* Stage 4: Wish Picker */}
      {stage === 'wish' && (
        <WishPicker
          wishData={content.wish}
          wishTagImg={images.wishTag}
          onSelectWish={(idx) => {
            setSelectedWishIdx(idx);
            setStage('heart');
          }}
        />
      )}

      {/* Stage 5: Heart Mosaic */}
      {stage === 'heart' && (
        <HeartMosaic
          data={content.heart}
          ui={content.ui}
          photos={images.girls}
          onNext={() => setStage('letter')}
        />
      )}

      {/* Stage 6: Handwritten Letter */}
      {stage === 'letter' && (
        <LetterView
          letterData={content.letter}
          paperImg={images.paper}
          photoImg={images.letterPhoto}
          onNext={() => setStage('final')}
        />
      )}

      {/* Stage 7: Final Golden Card */}
      {stage === 'final' && (
        <FinalCard
          finalData={content.final}
          onSendToSky={() => setStage('starlight')}
          onRepeat={handleRestart}
        />
      )}

      {/* Stage 8: Starlight Night Sky */}
      {stage === 'starlight' && (
        <StarlightSky
          starlightData={content.starlight}
          selectedWishText={
            selectedWishIdx !== null
              ? content.wish.options[selectedWishIdx]
              : ''
          }
          onBackToCard={() => setStage('final')}
          onRepeat={handleRestart}
        />
      )}

      {/* Customization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        content={content}
        photos={images.girls}
        onSave={(newContent, newPhotos) => {
          setCustomOverride(newContent);
          setImages((prev) => ({
            ...prev,
            girls: newPhotos,
            letterPhoto: newPhotos[0],
          }));
        }}
      />
    </main>
  );
}

export default App;
