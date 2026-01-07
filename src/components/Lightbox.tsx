import { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

      {/* Main content - vertical layout */}
      <div 
        className="min-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 pt-16 relative min-h-[60vh]">
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img
            src={images[currentIndex]}
            alt={`${title || 'Immagine'} ${currentIndex + 1}`}
            loading="lazy"
            decoding="async"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            className="max-w-3xl w-full max-h-[70vh] object-contain select-none pointer-events-none"
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 py-4">
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

        {/* Info section - horizontal below image */}
        {(title || description || author || collaborators) && (
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12">
              {/* Left column - metadata */}
              <div className="space-y-2">
                {title && (
                  <h3 className="font-body text-base font-medium text-foreground">{title}</h3>
                )}
                <p className="font-body text-sm text-muted-foreground">
                  {currentIndex + 1} / {images.length}
                </p>
                {author && (
                  <p className="font-body text-sm text-muted-foreground mt-4">
                    Autore: {author}
                  </p>
                )}
                {collaborators && (
                  <p className="font-body text-sm text-muted-foreground">
                    In collaborazione con {collaborators}
                  </p>
                )}
              </div>

              {/* Right column - description */}
              {description && (
                <div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
