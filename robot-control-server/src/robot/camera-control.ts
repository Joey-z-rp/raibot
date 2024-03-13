import { StreamCamera, Codec } from "pi-camera-connect";

const VIDEO_FRAME_RATE = 20;

export class CameraControl {
  private cameraControl: StreamCamera;

  private captureTimer: NodeJS.Timeout;

  constructor() {
    this.captureTimer = null;
    this.cameraControl = new StreamCamera({
      codec: Codec.MJPEG,
    });
  }

  async captureImage(send: (data: Buffer) => void) {
    if (this.captureTimer) clearTimeout(this.captureTimer);

    await this.cameraControl.startCapture();
    const image = await this.cameraControl.takeImage();
    send(image);
    await this.cameraControl.stopCapture();
  }

  async captureVideo(send: (data: Buffer) => void) {
    if (this.captureTimer) clearTimeout(this.captureTimer);

    await this.cameraControl.startCapture();

    const capture = async () => {
      const image = await this.cameraControl.takeImage();
      send(image);
      setTimeout(capture, Math.floor(1000 / VIDEO_FRAME_RATE));
    };
    capture();
  }

  async stopCapture() {
    await this.cameraControl.stopCapture();
  }
}
