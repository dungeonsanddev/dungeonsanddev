import { useEffect, useState } from 'react';
import { World } from 'ldtk';

export const useLDtk = ({ sprite, ldtk }) => {
  const [world, setWorld] = useState<any>();
  useEffect(() => {
    getWorld();
  }, []);

  const getWorld = async () => {
    const json = await (await fetch(ldtk)).json();
    const world: World = json.levels.map((level) => ({
      ...level,
      style: {
        width: level.pxWid,
        height: level.pxHei,
        position: 'relative',
        background: level.__bgColor,
      },
      layerInstances: (level.layerInstances || []).map((layer, i) => ({
        ...layer,
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: (level.layerInstances || []).length - i,
        },
        gridTiles: layer.gridTiles.map((tile) => ({
          ...tile,

          style: {
            width: layer.__gridSize,
            height: layer.__gridSize,
            position: 'absolute',
            backgroundPositionX: -tile.src[0],
            backgroundPositionY: -tile.src[1],
            left: tile.px[0],
            top: tile.px[1],
            imageRendering: 'pixelated',
            backgroundImage: `url('${sprite}')`,
          },
        })),
      })),
    }));
    setWorld(world);
  };

  return world;
};
