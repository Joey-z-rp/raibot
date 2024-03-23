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

  private flowColor() {
    this.isOn = true;
    let offset = 0;

    const render = () => {
      if (!this.isOn) return this.controller.clear();

      const pixels = new Uint32Array(this.numOfLeds);
      offset++;

      for (let i = 0; i < this.numOfLeds; i++) {
        pixels[i] = piixelModule.colorwheel(
          (i * this.numOfLeds + offset) % 255
        );
      }

      this.controller.render(pixels);

      setTimeout(render, 100);
    };
    render();
  }

  private breathColor(color: number) {
    this.isOn = true;
    const step = 0.1;
    let brightness = 0.1;
    let direction = 1;
    const pixels = new Uint32Array(this.numOfLeds).fill(
      piixelModule.colorwheel(color)
    );

    const render = () => {
      if (!this.isOn) return this.controller.clear();

      brightness += step;
      if (brightness >= 1 || brightness <= 0.1) {
        direction *= -1;
      }
      this.controller.render({ pixels, brightness });

      setTimeout(render, 100);
    };
    render();
  }

  private turnOff() {
    this.isOn = false;
    this.controller.clear();
  }

  render(action: RenderLedAction) {
    switch (action) {
      case "FLOW_COLOR":
        return this.flowColor();
      case "BREATH_GREEN":
        return this.breathColor(100);
      case "OFF":
        return this.turnOff();
    }
  }
}
