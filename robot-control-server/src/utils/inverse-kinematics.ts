/**
 * The horizontal line is the x axis, positive direction is front (head)
 * The vertical line is the y axis, positive direction is down (feet)
 */

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
const radiansToDegrees = (radians: number) => (radians / Math.PI) * 180;

/**
 *
 * @param a First side
 * @param b Second side
 * @param theta The angle between a and b
 */
const calculateThirdSide = (a: number, b: number, theta: number) => {
  const thirdSideSquare =
    Math.pow(a, 2) +
    Math.pow(b, 2) -
    2 * a * b * Math.cos(degreesToRadians(theta));
  return Math.sqrt(thirdSideSquare);
};

/**
 *
 * @param a The opposite side of the target angle
 * @param b One side of the target angle
 * @param c The other side of the target angle
 */
const calculateAngleFromSides = (a: number, b: number, c: number) => {
  const cosineA =
    (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c);
  return radiansToDegrees(Math.acos(cosineA));
};

/**
 * @param upperLength Length of the upper leg
 * @param lowerLength Length of the lower leg
 * @param upperAngle The angle between the upper leg and the x axis
 * @param lowerAngle The angle between the upper leg and the lower leg
 */
export const convertAngleToCoordinate = ({
  upperLength,
  lowerLength,
  upperAngle,
  lowerAngle,
}: {
  upperLength: number;
  lowerLength: number;
  upperAngle: number;
  lowerAngle: number;
}) => {
  const thirdSideLength = calculateThirdSide(
    upperLength,
    lowerLength,
    lowerAngle
  );
  const angleBetweenThirdSideAndUpperLeg = calculateAngleFromSides(
    lowerLength,
    upperLength,
    thirdSideLength
  );
  const angleBetweenThirdSideAndX = degreesToRadians(
    upperAngle - angleBetweenThirdSideAndUpperLeg
  );
  const x = thirdSideLength * Math.cos(angleBetweenThirdSideAndX);
  const y = thirdSideLength * Math.sin(angleBetweenThirdSideAndX);

  return { x, y };
};

/**
 *
 * @param upperLength Length of the upper leg
 * @param lowerLength Length of the lower leg
 * @param x The x coordinate of the lower leg tip
 * @param y The y coordinate of the feet tip
 */
export const convertCoordinateToAngle = ({
  upperLength,
  lowerLength,
  x,
  y,
}: {
  upperLength: number;
  lowerLength: number;
  x: number;
  y: number;
}) => {
  const isXNegative = x < 0;
  const xToUse = Math.abs(x)
  const thirdSideLength = calculateThirdSide(xToUse, y, 90);
  const angleBetweenThirdSideAndX = radiansToDegrees(Math.atan(y / xToUse));
  const lowerAngle = calculateAngleFromSides(
    thirdSideLength,
    lowerLength,
    upperLength
  );
  const angleBetweenThirdSideAndUpperLeg = calculateAngleFromSides(
    lowerLength,
    upperLength,
    thirdSideLength
  );

  const upperAngle = !isXNegative ?
    angleBetweenThirdSideAndX + angleBetweenThirdSideAndUpperLeg :
    180 - angleBetweenThirdSideAndX + angleBetweenThirdSideAndUpperLeg;

  return { upperAngle, lowerAngle };
};
