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
  description?: string;
  author?: string;
  collaborators?: string;
  onIndexChange?: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, isOpen, onClose, onPrev, onNext, title, description, author, collaborators, onIndexChange }: LightboxProps) => {
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
      className="fixed inset-0 z-50 bg-background animate-fade-in overflow-auto"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth z-20"
        aria-label="Chiudi"
      >
        Chiudi
      </button>

      {/* Main content - side by side on desktop */}
      <div 
        className="min-h-full flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left sidebar - Info */}
        {(title || description || author || collaborators) && (
          <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 md:pt-20 flex-shrink-0 order-2 md:order-1">
            {title && (
              <h3 className="font-body text-sm text-foreground mb-2">{title}</h3>
            )}
            <p className="font-body text-xs text-muted-foreground mb-4">
              {currentIndex + 1} / {images.length}
            </p>
            {author && (
              <p className="font-body text-xs text-muted-foreground mt-4">
                Autore: {author}
              </p>
            )}
            {collaborators && (
              <p className="font-body text-xs text-muted-foreground mt-1">
                In collaborazione con {collaborators}
              </p>
            )}
            {description && (
              <p className="font-body text-xs text-muted-foreground mt-4 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Right side - Image */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 md:pt-20 order-1 md:order-2 relative min-h-[50vh] md:min-h-screen">
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img
            src={images[currentIndex]}
            alt={`${title || 'Immagine'} ${currentIndex + 1}`}
            className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain"
          />

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); onIndexChange?.(idx); }}
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
      </div>
    </div>
  );
};

export default Lightbox;
