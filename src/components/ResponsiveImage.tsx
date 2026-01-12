import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
  draggable?: boolean;
}

// Generate srcset for responsive images
const generateSrcSet = (src: string): string => {
  // For imported images, vite-imagetools handles optimization
  // We create srcset with width descriptors
  const widths = [400, 800, 1200, 1600];
  
  return widths
    .map((w) => {
      // Add width parameter for vite-imagetools
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}w=${w}&format=webp ${w}w`;
    })
    .join(', ');
};

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  onContextMenu,
  draggable = false,
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(src)}
        sizes={sizes}
      />
      {/* Fallback img */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={draggable}
        onContextMenu={onContextMenu}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 select-none pointer-events-none`}
      />
    </picture>
  );
};

export default ResponsiveImage;
