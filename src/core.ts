import { ProfanityConfig } from "./types";

export class Profanity {
    private config: ProfanityConfig;
  
    constructor(config: ProfanityConfig = {}) {
      this.config = {
        apiEndpoint: 'https://vector.profanity.dev',
        apiHeaders: { 'Content-Type': 'application/json' },
        skipApi: false,
        excludeFields: [],
        ...config
      };
    }
  
    private async checkApi(text: string): Promise<{ isProfane: boolean; words: string[] }> {
      if (this.config.skipApi) return { isProfane: false, words: [] };
      
      try {
        const response = await fetch(this.config.apiEndpoint!, {
          method: 'POST',
          headers: {
            ...this.config.apiHeaders,
          },
          body: JSON.stringify({ message: text }),
        });
  
        if (!response.ok) {
          throw new Error('API request failed');
        }
  
        const data = await response.json();
        return {
          isProfane: data.hasProfanity,
          words: data.profaneWords || []
        };
      } catch (error) {
        console.error('API check failed:', error);
        return { isProfane: false, words: [] };
      }
    }
  
    private checkCustomWords(text: string): { isProfane: boolean; words: string[] } {
      if (!this.config.customWords?.length) return { isProfane: false, words: [] };
      
      const lowerText = text.toLowerCase();
      const detectedWords = this.config.customWords.filter(word => 
        lowerText.includes(word.toLowerCase())
      );
  
      return {
        isProfane: detectedWords.length > 0,
        words: detectedWords
      };
    }
  
    async validateField(value: string): Promise<true | string> {
      if (typeof value !== 'string') return true;
  
      const customCheck = this.checkCustomWords(value);
      const apiCheck = await this.checkApi(value);
  
      const detectedWords = Array.from(new Set([
        ...customCheck.words,
        ...apiCheck.words
      ]));
  
      if (customCheck.isProfane || apiCheck.isProfane) {
        return `Inappropriate content detected: ${detectedWords.join(', ')}`;
      }
  
      return true;
    }
  
    createValidator(fieldName: string) {
      if (this.config.excludeFields?.includes(fieldName)) {
        return undefined;
      }
  
      return async (value: string) => {
        const result = await this.validateField(value);
        return result === true ? true : result;
      };
    }
  }
  