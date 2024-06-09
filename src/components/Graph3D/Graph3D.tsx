import { useEffect } from "react";
import useGraph, { TWIN3D, Graph } from '../../modules/Graph';
import Math3D, {
    Point, Light, Polygon, EDistance, Cone, Cube, Ellipsoid, EllipticalCylinder, EllipticalParaboloid, HyperbolicCylinder, HyperbolicParaboloid,
    KleinBottle, ParabolicCylinder, SingleLineHyperboloid, Sphere, Thor, TwoLineHyperboloid
} from "../../modules/Math3D";
import Surface from "../../modules/Math3D/entities/Surface";
import Checkbox3D from "./Checkbox3D/Checkbox3D";

export enum ECustom {
    showPoints = 'showPoints',
    showEdges = 'showEdges',
    showPolygons = 'showPolygons',
    animationOn = 'animationOn',
}

const Graph3D = () => {
    const WIN: TWIN3D = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        CENTER: new Point(0, 0, -40),
        CAMERA: new Point(0, 0, -50)
    }
    let graph: Graph | null = null;
    const [getGraph, cancelGraph] = useGraph(renderScene);
    const LIGHT = new Light(-40, 15, 0, 1500);
    const math3D = new Math3D({ WIN });
    let scene: Surface[] = [new Cube()];

    let canMove = false;
    const custom = {
        [ECustom.showPoints]: true,
        [ECustom.showEdges]: true,
        [ECustom.showPolygons]: true,
        [ECustom.animationOn]: false,
    }
    let dx = 0;
    let dy = 0;

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousedown() {
        canMove = true;
    }

    // надо как-то поменять
    function mousemove(event: MouseEvent) {
        const gradus = Math.PI / 180 / 4;
        if (canMove) {
            scene.forEach(surface =>
                surface.points.forEach(point => {
                    const T1 = math3D.rotateOy((dx - event.offsetX) * gradus);
                    const T2 = math3D.rotateOx((dy - event.offsetY) * gradus);
                    const T = math3D.getTransform(T1, T2);
                    math3D.transform(T, point);
                })
            );
        }
        dx = event.offsetX;
        dy = event.offsetY;
    }

    function wheel(event: WheelEvent) {
        event.preventDefault();
        const delta = (event.deltaY > 0) ? 1.1 : 0.9;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface =>
            surface.points.forEach(point =>
                math3D.transform(matrix, point)
            )
        );
    }

    function renderScene(FPS: number): void {
        if (!graph) {
            return;
        }
        graph.clear();
        if (custom.showPolygons) {
            const polygons: Polygon[] = [];
            scene.forEach((surface, index) => {
                math3D.calcDistance(surface, WIN.CAMERA, EDistance.distance);
                math3D.calcDistance(surface, LIGHT, EDistance.lumen);
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygons.push(polygon);
                });
            });
            math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const points = polygon.points.map(index =>
                    new Point(
                        math3D.xs(scene[polygon.index].points[index]),
                        math3D.ys(scene[polygon.index].points[index])
                    )
                );
                const lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }

        if (custom.showPoints) {
            scene.forEach(surface =>
                surface.points.forEach(point => {
                    graph && graph.point(
                        math3D.xs(point),
                        math3D.ys(point),
                        '#000000'
                    );
                })
            );
        }

        if (custom.showEdges) {
            scene.forEach(surface =>
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    graph && graph.line(
                        math3D.xs(point1), math3D.ys(point1),
                        math3D.xs(point2), math3D.ys(point2),
                        '#000000');
                })
            );
        }
    }

    const changeValue = (flag: ECustom, value: boolean) => {
        custom[flag] = value;
    }

    const changeScene = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case 'Cone': scene = [new Cone()]; break;
            case 'Cube': scene = [new Cube()]; break;
            case 'Ellipsoid': scene = [new Ellipsoid()]; break;
            case 'EllipticalCylinder': scene = [new EllipticalCylinder()]; break;
            case 'EllipticalParaboloid': scene = [new EllipticalParaboloid()]; break;
            case 'HyperbolicCylinder': scene = [new HyperbolicCylinder()]; break;
            case 'HyperbolicParaboloid': scene = [new HyperbolicParaboloid()]; break;
            case 'KleinBottle': scene = [new KleinBottle()]; break;
            case 'ParabolicCylinder': scene = [new ParabolicCylinder()]; break;
            case 'SingleLineHyperboloid': scene = [new SingleLineHyperboloid()]; break;
            case 'Sphera': scene = [new Sphere()]; break;
            case 'Thor': scene = [new Thor()]; break;
            case 'TwoLineHyperboloid': scene = [new TwoLineHyperboloid()]; break;
        }
    }

    useEffect(() => {
        graph = getGraph({
            WIN,
            id: 'graph3DCanvas',
            width: 700,
            height: 700,
            callbacks: {
                wheel,
                mousemove,
                mouseup,
                mousedown,
                mouseleave,
            },
        });

        const interval = setInterval(() => {
            if (custom.animationOn) {
                scene.forEach(surface => surface.doAnimation(math3D));
            }
        }, 50);

        return () => {
            clearInterval(interval);
            cancelGraph();
        }
    });

    return (<div>
        <div className="graph3D">
            <canvas id='graph3DCanvas' />
        </div>
        <div className="checkbox">
            <Checkbox3D
                text="точки"
                id="points"
                custom={ECustom.showPoints}
                customValue={custom[ECustom.showPoints]}
                changeValue={changeValue}
            />
            <Checkbox3D
                text="рёбра"
                id="edges"
                custom={ECustom.showEdges}
                customValue={custom[ECustom.showEdges]}
                changeValue={changeValue}
            />
            <Checkbox3D
                text="полигоны"
                id="polygons"
                custom={ECustom.showPolygons}
                customValue={custom[ECustom.showPolygons]}
                changeValue={changeValue}
            />
            <Checkbox3D
                text="анимация"
                id="animation"
                custom={ECustom.animationOn}
                customValue={custom[ECustom.animationOn]}
                changeValue={changeValue}
            />
        </div>
        <div className="selectFigures">
            <select onChange={changeScene}>
                <option value="Cube">Куб</option>
                <option value="Sphera">Сфера</option>
                <option value="Cone">Конус</option>
                <option value="Thor">Бублик</option>
                <option value="Ellipsoid">Эллипсоид</option>
                <option value="EllipticalCylinder">Эллиптический цилиндр</option>
                <option value="EllipticalParaboloid">Эллиптический параболоид</option>
                <option value="HyperbolicCylinder">Гиперболический цилиндр</option>
                <option value="HyperbolicParaboloid">Гиперболический параболоид</option>
                <option value="KleinBottle">Бутылка Клейна</option>
                <option value="ParabolicCylinder">Параболический цилиндр</option>
                <option value="SingleLineHyperboloid">Однополосной гиперболоид</option>
                <option value="TwoLineHyperboloid">Двуполосной гиперболоид</option>
            </select>
        </div>
    </div>);
}

export default Graph3D;