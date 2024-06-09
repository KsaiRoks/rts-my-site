import Math3D from "./Math3D";
import Point from "./entities/Point";
import Light from "./entities/Light";
import Polygon, { EDistance } from "./entities/Polygon";
import Cone from "./surfaces/Cone";
import Cube from "./surfaces/Cube";
import Ellipsoid from "./surfaces/Ellipsoid";
import EllipticalCylinder from "./surfaces/EllipticalCylinder";
import EllipticalParaboloid from "./surfaces/EllipticalParaboloid";
import HyperbolicCylinder from "./surfaces/HyperbolicCylinder";
import HyperbolicParaboloid from "./surfaces/HyperbolicParaboloid";
import KleinBottle from "./surfaces/KleinBottle";
import ParabolicCylinder from "./surfaces/ParabolicCylinder";
import SingleLineHyperboloid from "./surfaces/SingleStripHyperboloid";
import Sphere from "./surfaces/Sphere";
import Thor from "./surfaces/Thor";
import TwoLineHyperboloid from "./surfaces/TwoLineHyperboloid";

export {
    Point, Light, Polygon, EDistance, Cone, Cube, Ellipsoid, EllipticalCylinder, EllipticalParaboloid, HyperbolicCylinder, HyperbolicParaboloid,
    KleinBottle, ParabolicCylinder, SingleLineHyperboloid, Sphere, Thor, TwoLineHyperboloid
};
export default Math3D;