import { Ws281xAPI } from "piixel";
import { RenderLedAction } from "../command-interface";
import { isMacOs } from "../utils/platform";

const piixelModule: {
  ws281x: Ws281xAPI;
  colorwheel: (pos: number) => number;
} = isMacOs()
    ? {
      ws281x: { configure: () => { }, render: () => { } },
      colorwheel: () => { },
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

  private getColor(position: number, dimFactor: number) {
    const originalColor = piixelModule.colorwheel(position);

    const r = (originalColor >> 16) & 0xff;
    const g = (originalColor >> 8) & 0xff;
    const b = originalColor & 0xff;

    const dimmedR = Math.round(r * dimFactor);
    const dimmedG = Math.round(g * dimFactor);
    const dimmedB = Math.round(b * dimFactor);

    return (dimmedR << 16) | (dimmedG << 8) | dimmedB;
  }

  private flowColor() {
    this.isOn = true;
    let offset = 0;

    const render = () => {
      if (!this.isOn) return this.controller.clear();

      const pixels = new Uint32Array(this.numOfLeds);

      for (let i = 0; i < this.numOfLeds; i++) {
        const index = (i + offset) % this.numOfLeds;
        const brightness = index === 0 ? 1 : (index - 1) / this.numOfLeds;
        pixels[i] = this.getColor(
          (i + offset) % 255,
          brightness
        );
      }

      this.controller.render(pixels);
      offset++;

      setTimeout(render, 100);
    };
    render();
  }

  private breathColor(color: number) {
    this.isOn = true;
    const step = 0.025;
    let brightness = 0.3;
    let direction = 1;
    const pixels = new Uint32Array(this.numOfLeds).fill(
      piixelModule.colorwheel(color)
    );

    const render = () => {
      if (!this.isOn) return this.controller.clear();

      brightness = Math.round((brightness + step * direction) * 1000) / 1000;
      if (brightness >= 0.8 || brightness <= 0.3) {
        direction *= -1;
      }
      this.controller.render({ pixels, brightness });

      setTimeout(render, 50);
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
      case "BREATH_BLUE":
        return this.breathColor(200);
      case "OFF":
        return this.turnOff();
    }
  }
}
