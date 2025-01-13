interface MapboxConfig {
  apiKey: string;
  defaultCenter: [number, number];
  defaultZoom: number;
}

class MapboxService {
  private static instance: MapboxService;
  private config: MapboxConfig;

  private constructor() {
    this.validateEnvironment();
    this.config = {
      apiKey: import.meta.env.VITE_MAPBOX_API_KEY || '',
      defaultCenter: [-58.443832, -14.235004],
      defaultZoom: 3,
    };
  }

  private validateEnvironment(): void {
    if (!import.meta.env.VITE_MAPBOX_API_KEY) {
      console.error('Mapbox API key is missing');
      return;
    }
  }

  public static getInstance(): MapboxService {
    if (!MapboxService.instance) {
      MapboxService.instance = new MapboxService();
    }
    return MapboxService.instance;
  }

  public getConfig(): MapboxConfig {
    return this.config;
  }

  public getApiKey(): string {
    return this.config.apiKey;
  }
}

export default MapboxService;
