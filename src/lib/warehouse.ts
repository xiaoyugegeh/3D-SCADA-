// 仓库 3D 场景常量

export const WAREHOUSE = {
  floors: 5,
  floorHeight: 8,
  width: 60,
  depth: 40,
  shelfRows: 6,
  shelfCols: 10,
  aisleWidth: 4,
};

export function floorY(floor: number) {
  return (floor - 1) * WAREHOUSE.floorHeight;
}

export function getFloorVisibility(selectedFloor: 'all' | number, floor: number): boolean {
  return selectedFloor === 'all' || selectedFloor === floor;
}
