import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

const Lightbox = ({ images, currentIndex, isOpen, onClose, onPrev, onNext, title }: LightboxProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrev();
        break;
      case 'ArrowRight':
        onNext();
        break;
    }
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth z-10"
        aria-label="Chiudi"
      >
        Chiudi
      </button>

      {/* Title */}
      {title && (
        <div className="absolute top-6 left-6 z-10">
          <p className="font-body text-sm text-foreground">{title}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 p-3 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 p-3 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image */}
      <div 
        className="max-w-[85vw] max-h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${title || 'Immagine'} ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'bg-foreground w-4' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Vai all'immagine ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
