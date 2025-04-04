import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Filter, BaseFilter, FilterGrayScale, FilterInvert, FilterSepia, FilterBrightness } from './filters';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  context!: CanvasRenderingContext2D;
  activeFilter: BaseFilter | null = null;


  private filterConstructors = {
    grayscale: (base: Filter) => new FilterGrayScale(base),
    invert: (base: Filter) => new FilterInvert(base),
    sepia: (base: Filter) => new FilterSepia(base),
    brightness: (base: Filter) => new FilterBrightness(base, 1.5),
    none: (base: Filter) => base,
  };

  ngAfterViewInit() {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;

      video.srcObject = stream;
      video.play();

      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        this.updateCanvas();
      });
    });
  }

  updateCanvas() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = this.context;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (this.activeFilter) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const filteredData = this.activeFilter.apply(imageData);
      ctx.putImageData(filteredData, 0, 0);
    }
    
    requestAnimationFrame(() => this.updateCanvas());
  }

  applyFilter(type: 'grayscale' | 'sepia' | 'brightness' | 'invert' | 'none') {
    const baseFilter = {
      apply: (imgData: ImageData) => imgData
    };
  
    this.activeFilter = this.filterConstructors[type](baseFilter);
  }
}  