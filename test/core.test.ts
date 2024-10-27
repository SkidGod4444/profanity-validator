import { Profanity } from '../src/core';
import { ProfanityResolver } from '../src/resolver';

describe('Profanity', () => {
  let profanity: Profanity;

  beforeEach(() => {
    profanity = new Profanity({
      customWords: ['badword'],
      skipApi: true
    });
  });

  test('validates text without profanity', async () => {
    const result = await profanity.validateField('hello world');
    expect(result).toBe(true);
  });

  test('ProfanityResolver should detect profanity correctly', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = { title: 'Title with badword', description: 'Clean description' };
    
    const result = await resolver(values);
  
    console.log("Resolver Output:", result);
  
    expect(result.errors).toHaveProperty('title');
    expect(result.errors.title).toEqual({
      type: 'profanity',
      message: 'Inappropriate content detected: badword'
    });
  });
  
  test('detects custom profanity words', async () => {
    const result = await profanity.validateField('hello badword');
    expect(typeof result).toBe('string');
    expect(result).toContain('badword');
  });
});