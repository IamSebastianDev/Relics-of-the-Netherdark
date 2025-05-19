import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Camera } from '../components/renderer/camera';
import { Lights } from '../components/renderer/lights';
import { TileRenderer } from '../components/renderer/tile-renderer';
import { Screen } from '../components/ui/screen';
import { useGrid } from '../hooks/use-grid';

export const Game = React.memo(() => {
    const grid = useGrid();

    return (
        <Screen>
            <div className="ui"></div>
            <Canvas gl={{ toneMappingExposure: 1.5 }}>
                <Camera />
                <Lights />
                {grid.toArray().map((tile) => (
                    <TileRenderer key={tile.id} {...{ ...tile, x: tile.x, y: tile.y }} />
                ))}
            </Canvas>
        </Screen>
    );
});
