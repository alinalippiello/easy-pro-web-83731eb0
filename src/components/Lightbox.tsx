import { useEffect, useCallback, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, Grid, X } from 'lucide-react';

interface LightboxProps {
  images: string[];
  captions?: string[];
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
  overlayImage?: string;
  overlayImageIndices?: number[];
}

const Lightbox = ({ images, captions, currentIndex, isOpen, onClose, onPrev, onNext, title, description, author, collaborators, onIndexChange, overlayImage, overlayImageIndices }: LightboxProps) => {
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
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number; time: number } | null>(null);

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

  // Reset zoom and close grid when changing images
  useEffect(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setShowThumbnailGrid(false);
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
      setSwipeStart(null);
    } else if (e.touches.length === 1) {
      if (isZoomed) {
        // Single finger pan start when zoomed
        setIsDragging(true);
        setTouchStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y
        });
      } else {
        // Track swipe start for navigation
        setSwipeStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now()
        });
      }
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
      // Single finger pan when zoomed
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
      // Check for horizontal swipe to navigate
      if (swipeStart && !isZoomed && images.length > 1) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - swipeStart.x;
        const deltaY = touch.clientY - swipeStart.y;
        const deltaTime = Date.now() - swipeStart.time;
        
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
        
        if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance && deltaTime < maxSwipeTime) {
          if (deltaX > 0) {
            onPrev();
          } else {
            onNext();
          }
        }
      }
      
      setIsDragging(false);
      setTouchStart(null);
      setSwipeStart(null);
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

  const toggleThumbnailGrid = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowThumbnailGrid(!showThumbnailGrid);
  };

  const handleThumbnailClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange?.(idx);
    setShowThumbnailGrid(false);
  };

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
        {images.length > 1 && (
          <button
            onClick={toggleThumbnailGrid}
            className={`p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border transition-smooth hover:bg-muted ${showThumbnailGrid ? 'bg-muted' : ''}`}
            aria-label={showThumbnailGrid ? "Chiudi griglia" : "Mostra griglia miniature"}
          >
            {showThumbnailGrid ? <X className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main content - vertical layout */}
      <div 
        className="min-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail Grid Overlay */}
        {showThumbnailGrid && (
          <div 
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-sm overflow-auto pt-16 pb-8 px-4 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleThumbnailClick(idx, e)}
                    className={`relative aspect-square overflow-hidden rounded-md transition-all hover:opacity-100 ${
                      idx === currentIndex 
                        ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background opacity-100' 
                        : 'opacity-70 hover:ring-1 hover:ring-muted-foreground'
                    }`}
                    aria-label={`Vai all'immagine ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-background/80 backdrop-blur-sm text-xs px-1.5 py-0.5 rounded font-body">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
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

          <div className="flex flex-col items-center">
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
              className="max-w-4xl w-full max-h-[65vh] object-contain select-none pointer-events-auto"
            />
            {captions && captions[currentIndex] && (
              <p className="mt-3 font-body text-sm text-muted-foreground text-center">
                {captions[currentIndex]}
              </p>
            )}
          </div>
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
