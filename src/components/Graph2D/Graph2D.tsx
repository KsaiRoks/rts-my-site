import React, { useEffect } from "react";
import useGraph from "../../modules/Graph/useGraph";
import Graph from "../../modules/Graph/Graph";
import UI2D from "./UI2D/UI2D";

export type TF = (x: number) => number;

export type TFunction = {
    f: TF,
    color: string,
    width: number,
}

const Graph2D: React.FC = () => {

    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }

    let graph: Graph | null = null;
    const [getGraph, cancelGraph] = useGraph(render);

    const funcs: TFunction[] = [];
    let canMove: boolean = false;
    let useInterpolation: boolean = false;
    let points: { x: number; y: number }[] = [];

    const wheel = (event: WheelEvent) => {
        const ZOOM_STEP: number = 0.2;
        const delta = (event.deltaY > 0) ? ZOOM_STEP : -ZOOM_STEP;
        if (WIN.WIDTH + delta > 0) {
            WIN.WIDTH += delta;
            WIN.HEIGHT += delta;
            WIN.LEFT -= delta / 2;
            WIN.BOTTOM -= delta / 2;
        }
    };

    const mouseup = () => {
        canMove = false;
    };

    const mouseleave = () => {
        canMove = false;
    };

    const mousedown = () => {
        canMove = true;
    };

    const mousemove = (event: MouseEvent) => {
        if (canMove && graph) {
            WIN.LEFT -= graph.sx(event.movementX);
            WIN.BOTTOM -= graph.sy(event.movementY);
        }
    };

    const printOXY = (): void => {
        if (!graph) {
            return;
        }
        // влево
        for (let i = 1; i < WIN.WIDTH - WIN.LEFT; i++) {
            graph.line(-i, WIN.BOTTOM, -i, WIN.HEIGHT + WIN.BOTTOM, 'gray');
            graph.line(-i, -0.2, -i, 0.2, 'black', 3);

        }
        // вправо
        for (let i = 1; i < WIN.LEFT + WIN.WIDTH; i++) {
            graph.line(i, WIN.BOTTOM + WIN.HEIGHT, i, WIN.BOTTOM, 'gray');
            graph.line(i, -0.2, i, 0.2, 'black', 3);
        }
        // вверх
        for (let i = 1; i < WIN.HEIGHT + WIN.BOTTOM; i++) {
            graph.line(WIN.LEFT + WIN.WIDTH, i, WIN.LEFT, i, 'gray');
            graph.line(-0.2, i, 0.2, i, 'black', 3);

        }
        // вниз
        for (let i = 1; i < WIN.HEIGHT - WIN.BOTTOM; i++) {
            graph.line(WIN.LEFT + WIN.WIDTH, -i, WIN.LEFT, -i, 'gray');
            graph.line(-0.2, -i, 0.2, -i, 'black', 3);

        }

        graph.line(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0, 'black');
        graph.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, 'black');

        //стрелка на оси Х
        graph.line(WIN.LEFT + WIN.WIDTH, 0, WIN.LEFT + WIN.WIDTH - 0.2, -0.2, 'black')
        graph.line(WIN.LEFT + WIN.WIDTH, 0, WIN.LEFT + WIN.WIDTH - 0.2, 0.2, 'black')

        //стрелка на оси У
        graph.line(0, WIN.BOTTOM + WIN.HEIGHT, - 0.2, WIN.BOTTOM + WIN.HEIGHT - 0.2, 'black')
        graph.line(0, WIN.HEIGHT + WIN.BOTTOM, 0.2, WIN.BOTTOM + WIN.HEIGHT - 0.2, 'black')
    };

    const printFunction = (f: TF, color: string, strWidth: number, n = 200): void => {
        if (!graph) {
            return;
        }
        let x = WIN.LEFT;
        const dx = WIN.WIDTH / n;
        while (x <= WIN.WIDTH + WIN.LEFT) {
            graph.line(
                x,
                f(x),
                x + dx,
                f(x + dx),
                color,
                strWidth,
            );
            x += dx;
        };
    };

    const printFunctionText = (f: TF): void => {
        if (!graph) {
            return;
        }
        let text = f.toString();
        text = text.substr(text.indexOf('return'), text.length)
            .replaceAll('return', '')
            .replaceAll('\n', '')
            .replaceAll(' ', '')
            .replaceAll(';}', '')
            .replaceAll('}', '')
            .replaceAll(';', '')
            .replaceAll('Math.', '');
        graph.text(3, 3, 'y = ' + text, "17px arial", 'black');
    };

    const interpolation = () => {
        useInterpolation = true;
        const buttons = ['Удалить точки', 'Удалить последнюю точку'];
        buttons.forEach((buttonText, index) => {
            const button = document.createElement('button');
            button.id = index === 0 ? 'delInterpol' : 'delOnePoint';
            button.innerHTML = buttonText;
        });
    };

    function render(FPS: number): void {
        if (!graph) {
            return;
        }
        graph.clear();
        printOXY();
        funcs.forEach(func =>
            func && printFunction(func.f, func.color, func.width)
        );
    };

    function getZero(f: TF, a: number, b: number, eps = 0.0001): number | null | undefined {
        if (f(a) * f(b) > 0) { return null; }
        if (Math.abs(f(a) - f(b)) <= eps) {
            return (a + b) / 2;
        }
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return getZero(f, a, half, eps);
        }
        if (f(half) * f(b) <= 0) {
            return getZero(f, half, b, eps);
        }
    };

    useEffect(() => {
        graph = getGraph({
            WIN,
            id: 'canvas',
            width: 600,
            height: 600,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        return () => {
            cancelGraph();
        }
    });

    return (<div>
        <div className="graph2D">
            <canvas id='canvas' width='300' height='300' />
        </div>
        <div className="funcButton">
            <UI2D funcs={funcs} />
        </div>
    </div>);
}

export default Graph2D;