import { useEffect, useCallback, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Touch gesture state
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialZoomLevel, setInitialZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        if (isZoomed) {
          setIsZoomed(false);
          setZoomLevel(1);
          setPosition({ x: 0, y: 0 });
        } else {
          onClose();
        }
        break;
      case 'ArrowLeft':
        if (!isZoomed) onPrev();
        break;
      case 'ArrowRight':
        if (!isZoomed) onNext();
        break;
    }
  }, [isOpen, onClose, onPrev, onNext, isZoomed]);

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

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newZoom = Math.min(zoomLevel + 0.5, 4);
    setZoomLevel(newZoom);
    if (newZoom > 1) setIsZoomed(true);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newZoom = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoom);
    if (newZoom === 1) {
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate distance between two touch points
  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Get center point between two touches
  const getTouchCenter = (touch1: React.Touch, touch2: React.Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialPinchDistance(distance);
      setInitialZoomLevel(zoomLevel);
    } else if (e.touches.length === 1 && isZoomed) {
      // Single finger pan start
      setIsDragging(true);
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      // Pinch gesture
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialPinchDistance;
      const newZoom = Math.min(Math.max(initialZoomLevel * scale, 1), 4);
      
      setZoomLevel(newZoom);
      setIsZoomed(newZoom > 1);
      
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging && isZoomed && touchStart) {
      // Single finger pan
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setInitialPinchDistance(null);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
      setTouchStart(null);
    }
  };

  // Fullscreen functionality
  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!document.fullscreenElement) {
      try {
        await lightboxRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen error:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Exit fullscreen error:', err);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      ref={lightboxRef}
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

      {/* Zoom controls */}
      <div className="fixed top-6 left-6 flex gap-2 z-20">
        <button
          onClick={handleZoomOut}
          className={`p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border transition-smooth ${zoomLevel === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}
          disabled={zoomLevel === 1}
          aria-label="Riduci zoom"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomIn}
          className={`p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border transition-smooth ${zoomLevel === 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}
          disabled={zoomLevel === 4}
          aria-label="Aumenta zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        {isZoomed && (
          <span className="flex items-center px-2 font-body text-xs text-muted-foreground">
            {Math.round(zoomLevel * 100)}%
          </span>
        )}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border transition-smooth hover:bg-muted"
          aria-label={isFullscreen ? "Esci da schermo intero" : "Schermo intero"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      {/* Main content - vertical layout */}
      <div 
        className="min-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div 
          ref={imageContainerRef}
          className={`flex-1 flex items-center justify-center p-4 md:p-8 pt-16 relative min-h-[60vh] ${isZoomed ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation arrows */}
          {images.length > 1 && !isZoomed && (
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
            onClick={toggleZoom}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            className="max-w-3xl w-full max-h-[70vh] object-contain select-none pointer-events-auto"
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && !isZoomed && (
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
        {(title || description || author || collaborators) && !isZoomed && (
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
