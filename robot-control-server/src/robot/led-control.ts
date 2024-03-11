import { Ws281xAPI } from "piixel";
import { RenderLedAction } from "../command-interface";

const piixelModule: {
  ws281x: Ws281xAPI;
  colorwheel: (pos: number) => number;
} =
  process.platform === "darwin"
    ? {
        ws281x: { configure: () => {}, render: () => {} },
        colorwheel: () => {},
      }
    : require("piixel");

export class LedControl {
  private controller: Ws281xAPI;

  private numOfLeds: number;

  private isOn: boolean;

  constructor() {
    this.numOfLeds = 7;
    this.isOn = false;
    this.controller = piixelModule.ws281x;
    this.controller.configure({
      gpio: 18,
      leds: this.numOfLeds,
      resetOnExit: true,
    });
  }

  flowColor() {
    this.isOn = true;
    let offset = 0;

    const render = () => {
      const pixels = new Uint32Array(this.numOfLeds);
      offset++;

      for (let i = 0; i < this.numOfLeds; i++) {
        pixels[i] = piixelModule.colorwheel(
          (i * this.numOfLeds + offset) % 255
        );
      }

      this.controller.render(pixels);

      if (this.isOn) setTimeout(render, 20);
    };
    render();
  }

  turnOff() {
    this.isOn = false;
  }

  render(action: RenderLedAction) {
    switch (action) {
      case "FLOW_COLOR":
        return this.flowColor();
      case "OFF":
        return this.turnOff();
    }
  }
}
