declare module 'tesseract.js' {
  export interface TesseractResult {
    data: {
      text: string;
    };
  }

  export interface TesseractWorker {
    recognize: (image: File | string | HTMLImageElement | HTMLCanvasElement) => Promise<TesseractResult>;
    terminate: () => Promise<void>;
  }

  export function createWorker(lang?: string): Promise<TesseractWorker>;
}
