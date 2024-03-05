import * as i2cBus from "i2c-bus";
import Pca9685Driver from "pca9685";

const options = {
  i2c: i2cBus.openSync(1), // The servo driver board is connected to I2C bus 1
  address: 0x40,
  frequency: 50,
  debug: false,
};

let isInitialised = false;

const driver = new Pca9685Driver(options, (err) => {
  if (err) {
    console.error("Error initialising servo driver");
    throw err;
  }
  isInitialised = true;
  console.info("Servo driver initialised");
});

const angleToDutyCycle = (angle: number) => {
  if (angle < 0 || angle > 180) return 0;

  const minAngle = 0;
  const maxAngle = 180;
  const minDutyCycle = 0.026;
  const maxDutyCycle = 0.134;

  const percentage = (angle - minAngle) / (maxAngle - minAngle);
  const dutyCycle = minDutyCycle + percentage * (maxDutyCycle - minDutyCycle);

  return Math.round(dutyCycle * 1000) / 1000;
};

// Channel: 0 to 15, angle: 0 to 180
export const rotateServo = (channel: number, angle: number) =>
  driver.setDutyCycle(channel, angleToDutyCycle(angle));
