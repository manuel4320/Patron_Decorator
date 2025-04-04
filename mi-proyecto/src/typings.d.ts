interface Window {
    faceLandmarksDetection: {
      load: (config: any) => Promise<any>;
      SupportedModels: {
        MediaPipeFaceMesh: string;
      };
    };
    tf: {
      setBackend: (backend: string) => Promise<void>;
      ready: () => Promise<void>;
    };
  }