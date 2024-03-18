import { StreamCamera, Codec } from "../utils/camera-lib";

const VIDEO_FRAME_RATE = 20;

export class CameraControl {
  private cameraControl: StreamCamera;

  private captureTimer: NodeJS.Timeout;

  constructor() {
    this.captureTimer = null;
    this.cameraControl = new StreamCamera({
      width: 1280,
      height: 720,
      codec: Codec.MJPEG,
    });
  }

  async captureImage() {
    if (this.captureTimer) clearTimeout(this.captureTimer);
    if (!this.cameraControl.isCapturing)
      await this.cameraControl.startCapture();
    const image = await this.cameraControl.takeImage();
    return image;
  }

  async captureVideo(send: (data: Buffer) => void) {
    if (this.captureTimer) clearTimeout(this.captureTimer);
    if (!this.cameraControl.isCapturing)
      await this.cameraControl.startCapture();

    const capture = async () => {
      const image = await this.cameraControl.takeImage();
      send(image);
      this.captureTimer = setTimeout(
        capture,
        Math.floor(1000 / VIDEO_FRAME_RATE)
      );
    };
    capture();
  }

  async stopCapture() {
    if (this.captureTimer) clearTimeout(this.captureTimer);
    await this.cameraControl.stopCapture();
  }
}
