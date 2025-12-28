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
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-background/70 hover:text-background transition-colors z-10"
        aria-label="Chiudi"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Title */}
      {title && (
        <div className="absolute top-6 left-6 z-10">
          <p className="font-display text-background/90 text-lg">{title}</p>
          <p className="font-body text-background/50 text-sm mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 p-3 text-background/70 hover:text-background transition-colors hover:bg-background/10 rounded-full"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 p-3 text-background/70 hover:text-background transition-colors hover:bg-background/10 rounded-full"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image */}
      <div 
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${title || 'Immagine'} ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain animate-scale-in"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'bg-background w-6' 
                  : 'bg-background/40 hover:bg-background/60'
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
