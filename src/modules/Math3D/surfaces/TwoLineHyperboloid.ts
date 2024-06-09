import { Point, Edge, Polygon, Surface } from "../entities";

class TwoLineHyperboloid extends Surface {
    constructor(
        count: number = 20,
        a: number = 15,
        b: number = 15,
        c: number = 15,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []

        const dt = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    center.x + a * Math.sinh(i) * Math.cos(j) / 10,
                    center.y + b * Math.cosh(i) * Math.sin(j) / 10,
                    center.z + c * Math.cosh(i) / 10,
                ));
            }
        }
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    center.x - a * Math.sinh(i) * Math.cos(j) / 10,
                    center.y - b * Math.cosh(i) * Math.sin(j) / 10,
                    center.z - c * Math.cosh(i) / 10,
                ));
            }
        }

        for (let i = 0; i < points.length; i++) {
            //вдоль
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if (i + 1 >= count && (i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
        }

        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + 1 + count,
                    i + count
                ], color
                ));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([
                    i,
                    i + 1 - count,
                    i + 1,
                    i + count
                ], color
                ));
            }
        }

        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + 1 + count,
                    i + count
                ], color
                ));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([
                    i,
                    i + 1 - count,
                    i + 1,
                    i + count
                ], color
                ));
            }
        }
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default TwoLineHyperboloid;