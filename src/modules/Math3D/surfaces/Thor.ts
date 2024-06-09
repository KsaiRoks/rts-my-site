import { Point, Edge, Polygon, Surface } from "../entities";

class Thor extends Surface {
    constructor(
        count: number = 20,
        R: number = 12,
        r: number = 6,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super()
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []
        const da: number = Math.PI * 2 / count;
        for (let phi = 0; phi < Math.PI * 2; phi += da) { //psi => -Pi ... Pi //phi => 0 ... 2Pi
            for (let psi = -Math.PI; psi < Math.PI; psi += da) {
                const x = center.x + (R + r * Math.cos(psi)) * Math.cos(phi);
                const y = center.y + (R + r * Math.cos(psi)) * Math.sin(phi);
                const z = center.z + r * Math.sin(psi);
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
        edges.push(new Edge(count ** 2 - count, count ** 2 - 1))

        for (let i = 0; i < points.length; i++) {
            if (points[i + count + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + count + 1,
                    i + count
                ], color));
            } else if (points[i + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    (i + 1) % count,
                    i % count
                ], color));
            }
        }
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default Thor;