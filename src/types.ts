export interface ProfanityConfig {
    customWords?: string[];
    heat?: number;
    excludeFields?: string[];
  }
  
  export interface ValidationError {
    field: string;
    message: React.ReactNode | string;
    detectedWords: string[];
  }
  
  export type FormValues = Record<string, string>;