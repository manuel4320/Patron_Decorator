export interface Filter {
  apply(imageData: ImageData): ImageData;
}

export class BaseFilter implements Filter {
  apply(imageData: ImageData): ImageData {
    return imageData;
  }
}

export class FilterGrayScale implements Filter {
  constructor(private wrapped: Filter) {}

  apply(imageData: ImageData): ImageData {
    const data = this.wrapped.apply(imageData).data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = avg;
    }
    return imageData;
  }
}

export class FilterInvert implements Filter {
  constructor(private wrapped: Filter) {}

  apply(imageData: ImageData): ImageData {
    const data = this.wrapped.apply(imageData).data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
    return imageData;
  }
}

export class FilterSepia implements Filter {
  constructor(private wrapped: Filter) {}

  apply(imageData: ImageData): ImageData {
    const data = this.wrapped.apply(imageData).data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      data[i+1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      data[i+2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }
    return imageData;
  }
}

export class FilterBrightness implements Filter {
  constructor(private wrapped: Filter, private level: number = 1.5) {}

  apply(imageData: ImageData): ImageData {
    const data = this.wrapped.apply(imageData).data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * this.level);
      data[i+1] = Math.min(255, data[i+1] * this.level);
      data[i+2] = Math.min(255, data[i+2] * this.level);
    }
    return imageData;
  }
}
