export interface UpLoadImageInterface {
  stream: ReadableStream;
  base64: string;
  path: string;
}

export interface UpdateImageInterface {
  originName: string;
  stream: ReadableStream;
  base64: string;
  path: string;
}
