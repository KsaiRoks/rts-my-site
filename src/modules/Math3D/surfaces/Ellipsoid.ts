import { Surface, Point, Edge, Polygon } from "../entities";

class Ellipsoid extends Surface {
    constructor(
        count: number = 30,
        rX: number = 20,
        rY: number = 15,
        rZ: number = 8,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];
        const da: number = Math.PI * 2 / count;

        for (let phi = 0; phi < Math.PI * 2; phi += da) { //psi => 0 ... Pi //phi => 0 ... 2Pi
            for (let psi = 0; psi < Math.PI * 2; psi += da) {
                const x = center.x + rX * Math.sin(phi) * Math.cos(psi);
                const y = center.y + rY * Math.sin(phi) * Math.sin(psi);
                const z = center.z + rZ * Math.cos(phi);
                points.push(new Point(x, z, y));
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
            } else {
                edges.push(new Edge(i, i % count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + count + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + count + 1,
                    i + count
                ], color));
            }
        }
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default Ellipsoid;