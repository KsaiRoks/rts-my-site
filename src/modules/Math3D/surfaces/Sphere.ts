import { Point, Edge, Polygon, Surface } from "../entities";

class Sphere extends Surface {
    constructor(
        count: number = 10,
        r: number = 20,
        color: string = '#ffff00',
        center: Point = new Point(),
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];
        const da = Math.PI * 2 / count;
        for (let phi = 0; phi < Math.PI * 2; phi += da) { //psi => 0 ... 2Pi //phi => 0 ... Pi
            for (let psi = 0; psi < 2 * Math.PI; psi += da) {
                const x = center.x + r * Math.sin(phi) * Math.cos(psi);
                const y = center.y + r * Math.sin(phi) * Math.sin(psi);
                const z = center.z + r * Math.cos(phi);
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
export default Sphere