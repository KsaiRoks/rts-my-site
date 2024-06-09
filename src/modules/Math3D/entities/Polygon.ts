import Point from "./Point";

export type TRGB = {
    r: number;
    g: number;
    b: number;
}

export enum EDistance {
    distance = 'distance',
    lumen = 'lumen',
}

class Polygon {
    points: number[];
    color: TRGB;
    index: number;
    center: Point;
    [EDistance.distance]: number;
    [EDistance.lumen]: number;
    R: number;
    visibility: boolean;


    constructor(points: number[] = [], color: string = '#000000') {
        this.points = points; // ссылки на номера точек поверхности 
        this.color = this.hexToRgb(color);
        this.distance = 0;
        this.lumen = 1;
        this.index = 0;
        this.center = new Point();
        this.R = 1;
        this.visibility = true;
    }

    hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {
            r: 0,
            g: 0,
            b: 0
        };
    }

    rgbToHex(r: number, g: number, b: number) {
        return `rgb(${r}, ${g}, ${b})`
    }
}
export default Polygon;