import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type AssetManifestEntry = {
    type: 'image' | 'gltf';
    src: string;
};

type AssetLoaderProps = {
    assets: Set<AssetManifestEntry>;
    children: React.ReactNode;
};

function loadAsset(entry: AssetManifestEntry): Promise<void> {
    switch (entry.type) {
        case 'gltf':
            useGLTF.preload(entry.src); // Safe and cached
            return new Promise((resolve) => {
                new GLTFLoader().load(entry.src, () => resolve(), undefined);
            });

        case 'image':
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = entry.src;
                img.onload = () => resolve();
                img.onerror = () => reject(new Error(`Failed to load image: ${entry.src}`));
            });

        // You can easily add more types here:
        // case 'audio':
        // case 'font':
        // etc...

        default:
            return Promise.reject(new Error(`Unknown asset type: ${entry.type}`));
    }
}

export function AssetLoader({ assets, children }: AssetLoaderProps) {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadAll = async () => {
            try {
                const tasks = Array.from(assets).map((entry) => loadAsset(entry));
                await Promise.all(tasks);

                if (!cancelled) setReady(true);
            } catch (err) {
                if (!cancelled) {
                    console.error(err);
                    setError((err as Error).message || 'Failed to load assets');
                }
            }
        };

        loadAll();

        return () => {
            cancelled = true;
        };
    }, [assets]);

    console.log({ ready, error, assets });
    if (error) {
        return (
            <div style={{ color: 'red', padding: '1rem' }}>
                <strong>Asset loading failed:</strong> {error}
            </div>
        );
    }

    if (!ready) return null;

    return <>{children}</>;
}
