import { ProfanityConfig } from "./types";
export class Profanity {
    private config: ProfanityConfig;
  
    constructor(config: ProfanityConfig = {}) {
      this.config = {
        excludeFields: [],
        heat: 0.909,
        ...config
      };
    }
  
    private async checkApi(text: string): Promise<{ isProfane: boolean; words: string[] }> {
      
      try {
        if(text.length == 0 || text === "") return {
          isProfane: false,
          words: [
          ],
        }; else {
          const response = await fetch('https://vector.profanity.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
          });
    
          if (!response.ok) {
            throw new Error('API request failed');
          }
    
          const data = await response.json();
  
          let hasProfanity = false;
          let profaneWords = [];
  
          if(data){
            if(this.config.heat! <= data.score) {
              hasProfanity = data.isProfanity;
              profaneWords = Array.isArray(data.flaggedFor) ? data.flaggedFor : [data.flaggedFor];
            } else {
              hasProfanity = false;
              profaneWords = [];
            }
          }
  
          return {
            isProfane: hasProfanity,
            words: profaneWords,
          };
        }
      } catch (error) {
        console.error('API check failed:', error);
        return { isProfane: false, words: [] };
      }
    }
  
    private checkCustomWords(text: string): { isProfane: boolean; words: string[] } {
      if (!this.config.customWords?.length) return { isProfane: false, words: [] };
    
      const lowerText = text.toLowerCase();
      const customWordsSet = new Set(this.config.customWords.map(word => word.toLowerCase()));
      const detectedWords = Array.from(customWordsSet).filter(word => lowerText.includes(word));
    
      return {
        isProfane: detectedWords.length > 0,
        words: detectedWords
      };
    }

    async validateField(value: string): Promise<{ isValid: boolean; message?: string }> {
      if (typeof value !== 'string') {
        throw new Error("Field value must be a string");
      }

      if (value === '' || value.length == 0) {
        return { isValid: true, message: 'Value is empty' };
      } else {
        try {
          const customCheck = this.checkCustomWords(value);
          const apiCheck = await this.checkApi(value);
      
          const detectedWords = Array.from(new Set([
            ...customCheck.words,
            ...apiCheck.words
          ]));
      
          if (customCheck.isProfane || apiCheck.isProfane) {
            return { isValid: false, message: `Content flagged for: ${detectedWords.join(', ')}` };
          }
      
          return { isValid: true, message: undefined };
        } catch (error) {
          console.error('Error during profanity validation:', error);
          return { isValid: false, message: 'An error occurred while validating the field' };
        }
      }
    }
    
  
    createValidator(fieldName: string) {
      if (this.config.excludeFields?.includes(fieldName)) {
        return undefined;
      }
      return async (value: string) => {
        const result = await this.validateField(value);
        return result;
      };
    }
  }