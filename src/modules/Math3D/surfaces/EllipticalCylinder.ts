import { Point, Edge, Polygon, Surface } from "../entities";

class EllipticalCylinder extends Surface {
    constructor(
        count: number = 40,
        a: number = 14,
        b: number = 10,
        height: number = 15,
        center: Point = new Point()
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []
        const da: number = Math.PI * 4 / count;

        for (let phi = -Math.PI * 2; phi < Math.PI * 2; phi += da) {
            for (let psi = -Math.PI * 2; psi < Math.PI * 2; psi += da) {
                const x = center.x + a * Math.cos(phi);
                const y = center.y + b * Math.sin(phi);
                const z = center.y + height * Math.sin(psi);

                points.push(new Point(x, y, z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            } 
        }


        for (let i = 0; i < points.length; i++) {
            if (points[i + count + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + count + 1,
                    i + count
                ], '#ffff00'));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default EllipticalCylinder;