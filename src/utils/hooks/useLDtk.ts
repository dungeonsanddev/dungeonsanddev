import { CSSProperties, useEffect, useState } from 'react';

type LevelType = {
  style: CSSProperties;
  iid: string;
  pxWid: number;
  pxHei: number;
  __bgColor: string;
  layerInstances: {
    style: CSSProperties;
    iid: string;
    __gridSize: number;
    gridTiles: {
      style: CSSProperties;
      src: [number, number];
      px: [number, number];
    }[];
  }[];
};

type LDtk = LevelType[];

export const useLDtk = ({ sprite, ldtk }) => {
  const [world, setWorld] = useState<LDtk>([]);
  useEffect(() => {
    getWorld();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWorld = async () => {
    const json: { levels: LDtk } = await (await fetch(ldtk)).json();
    const world = json.levels.map((level) => ({
      ...level,
      style: {
        width: level.pxWid,
        height: level.pxHei,
        position: 'relative',
        background: level.__bgColor,
      },
      layerInstances: level.layerInstances.map((layer, i) => ({
        ...layer,
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: level.layerInstances.length - i,
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
    setWorld(world as unknown as LDtk);
  };

  return world;
};
