import { useEffect } from 'react';

interface AssetConfig {
  images?: string[];
  videos?: string[];
}

export const usePreloadAssets = (assets: AssetConfig) => {
  useEffect(() => {
    // Precarregar imagens
    if (assets.images) {
      assets.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }

    // Precarregar vídeos
    if (assets.videos) {
      assets.videos.forEach((src) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
      });
    }
  }, [assets]);
};

export default usePreloadAssets;
