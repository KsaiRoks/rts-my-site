import { Point, Edge, Polygon, Surface } from "../entities";

class Cone extends Surface {
    constructor(
        count: number = 16,
        h: number = 15,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super()
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []
        const da: number = Math.PI * 2 / count;

        for (let phi = 0; phi < h; phi += da) {
            for (let psi = 0; psi < Math.PI * 2; psi += da) {
                const x = center.x + phi * Math.cos(psi);
                const y = center.y + phi * Math.sin(psi)
                const z = center.z + h - phi

                points.push(new Point(x, y, -z));
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
        this.center = center
    }
}
export default Cone;
