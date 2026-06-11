import { useState, useEffect } from "react";

export function useAssetLoader(imageUrls: string[]) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        let isCancelled = false;

        const loadImages = async () => {
            const promises = imageUrls.map((url) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = url;

                    img.onload = () => {
                        if (isCancelled) return;
                        loadedCount++;
                        setProgress(Math.round((loadedCount / imageUrls.length) * 100));
                        resolve();
                    };

                    img.onerror = () => {
                        console.error(`Failed to load asset: ${url}`);
                        resolve();
                    };
                });
            });

            await Promise.all(promises);
            if (!isCancelled) setIsLoaded(true);
        };

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, [imageUrls]);

    return { isLoaded, progress };
}