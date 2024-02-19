// data.ts
export interface RoadSegment {
    id: number;
    start: string;
    end: string;
    distance: number;
  }
  
  export const roadSegments: RoadSegment[] = [
    { id: 1, start: "A", end: "B", distance: 10 },
    { id: 2, start: "B", end: "C", distance: 15 },
    // Define more road segments...
  ];
  