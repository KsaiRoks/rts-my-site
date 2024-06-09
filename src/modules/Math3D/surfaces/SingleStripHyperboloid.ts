import { Point, Edge, Polygon, Surface } from "../entities"

class SingleLineHyperboloid extends Surface {
    constructor(
        count: number = 24,
        a: number = 5,
        b: number = 5,
        c: number = 5,
        color: string = '#ffff00',
        center: Point = new Point()
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = []
        const du: number = Math.PI / count;
        const dv: number = 2 * Math.PI / count;

        // Верхняя полоса гиперболоида
        for (let u = -Math.PI / 2; u <= Math.PI / 2; u += du) {
            for (let v = -Math.PI; v <= Math.PI; v += dv) {
                const x = center.x + a * Math.cosh(u) * Math.cos(v);
                const y = center.y + b * Math.cosh(u) * Math.sin(v);
                const z = center.z + c * Math.sinh(u);

                points.push(new Point(x, y, z));
            }
        }

        // Нижняя полоса гиперболоида
        for (let u = -Math.PI / 2; u <= Math.PI / 2; u += du) {
            for (let v = -Math.PI; v <= Math.PI; v += dv) {
                const x = center.x + a * Math.cosh(u) * Math.cos(v);
                const y = center.y + b * Math.cosh(u) * Math.sin(v);
                const z = center.z + -c * Math.sinh(u);

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
export default SingleLineHyperboloid;