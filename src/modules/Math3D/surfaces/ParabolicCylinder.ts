import { Point, Edge, Polygon, Surface } from "../entities"

class ParabolicCylinder extends Surface {
    constructor(
        count: number = 15,
        a: number = 2,
        b: number = 3,
        c: number = 4,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []

        for (let i = -count / 2; i <= count / 2; i++) {
            for (let j = -count / 2; j <= count / 2; j++) {
                points.push(new Point(
                    center.x + b * Math.sinh(i / Math.PI),
                    center.y + a * Math.cosh(i / Math.PI),
                    center.z + c * j / Math.PI
                ));
            }
        }


        for (let i = 0; i < points.length - 1; i++) {
            if (i % (count + 1) !== count) {
                edges.push(new Edge(i, i + 1));
            }

            if (points[i + count + 1]) {
                edges.push(new Edge(i, i + count + 1));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1 + count] && i % (count + 1) !== count) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + 2 + count,
                    i + 1 + count
                ], color));
            }
        }
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default ParabolicCylinder;