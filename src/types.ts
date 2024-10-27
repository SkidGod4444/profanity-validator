export interface ProfanityConfig {
    customWords?: string[];
    apiEndpoint?: string;
    apiHeaders?: Record<string, string>;
    skipApi?: boolean;
    excludeFields?: string[];
  }
  
  export interface ValidationError {
    field: string;
    message: string;
    detectedWords: string[];
  }
  
  export type FormValues = Record<string, string>;