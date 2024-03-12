import { Gpio as GpioClass } from "pigpio";

class MockGpio {
  digitalWrite() {
    console.info("Digital write GPIO pin")
  }
  trigger() {
    console.info("Trigger GPIO pin")
  }
  on() { }
  removeAllListeners() { }
}

const Gpio = process.platform === "darwin" ? MockGpio : require("pigpio").Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6 / 34321;

export class UltrasonicControl {
  private triggerPin: GpioClass;

  private echoPin: GpioClass;

  private lastMeasurementResult: number;

  constructor() {
    this.triggerPin = new Gpio(27, { mode: Gpio.OUTPUT });
    this.echoPin = new Gpio(22, { mode: Gpio.INPUT, alert: true });
    this.lastMeasurementResult = 0;
  }

  getDistance() {
    this.triggerPin.digitalWrite(0); // Make sure trigger is low

    return new Promise<number>((res) => {
      let startTick: number;

      this.echoPin.on("alert", (level, tick) => {
        if (level == 1) {
          startTick = tick;
        } else {
          this.echoPin.removeAllListeners();

          const endTick = tick;
          const diff = endTick - startTick;
          this.lastMeasurementResult = Math.round(diff / 2 / MICROSECDONDS_PER_CM * 10) / 10;
          res(this.lastMeasurementResult);
        }
      });

      this.triggerPin.trigger(15, 1);
    });
  }

  get lastResult() {
    return this.lastMeasurementResult;
  }
}
