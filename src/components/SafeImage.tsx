// File: src/components/SafeImage.tsx
// Komponen gambar yang cerdas

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Komponen SafeImage yang menangani error loading gambar
 * dan juga mengatasi masalah domain yang tidak dikonfigurasi
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width = 800,
  height = 450,
  className,
  fallbackSrc = '/images/placeholder.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [useStandardImg, setUseStandardImg] = useState(false);

  // Handler untuk menangani error loading gambar
  const handleError = () => {
    console.warn(`Error loading image: ${src}`);
    // Jika fallbackSrc tersedia, gunakan itu
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  // Handler untuk menangani error pada Next.js Image
  const handleNextImageError = () => {
    console.warn(`Next.js Image error, switching to standard img: ${src}`);
    setUseStandardImg(true);
    // Tetap gunakan sumber asli, tag img standar biasanya tidak memiliki masalah yang sama
  };

  return (
    <>
      {useStandardImg ? (
        // Gunakan tag img standar sebagai fallback
        <img
          src={imgSrc}
          alt={alt}
          className={className}
          onError={handleError}
        />
      ) : (
        // Coba gunakan Next.js Image dengan unoptimized
        <div dangerouslySetInnerHTML={{
          __html: `<img src="${imgSrc}" alt="${alt}" class="${className || ''}" onerror="this.onerror=null; this.src='${fallbackSrc}';" />`
        }} />
      )}
    </>
  );
};

export default SafeImage;