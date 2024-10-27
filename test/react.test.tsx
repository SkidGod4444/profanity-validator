import { renderHook, act, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Profanity } from '../src/core';
import { ProfanityResolver } from '../src/resolver';

// Mock Profanity class to simulate profanity detection for testing
class MockProfanity extends Profanity {
  private forbiddenWords: string[];

  constructor(words: string[] = ['badword', 'forbidden']) {
    super();
    this.forbiddenWords = words;
  }

  async validateField(value: string): Promise<true | string> {
    const containsProfanity = this.forbiddenWords.some(word => 
      value.toLowerCase().includes(word.toLowerCase())
    );
    return containsProfanity ? 'This field contains prohibited words' : true;
  }
}

describe('ProfanityResolver Tests', () => {
  let profanity: Profanity;
  
  beforeEach(() => {
    profanity = new MockProfanity();
  });

  test('validates clean text successfully', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: 'Clean title',
      description: 'Clean description'
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        title: 'Clean title',
        description: 'Clean description'
      },
      errors: {}
    });
  });

  test('detects profanity and returns errors', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: 'Title with badword',
      description: 'Clean description'
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        description: 'Clean description'
      },
      errors: {
        title: {
          type: 'profanity',
          message: 'This field contains prohibited words'
        }
      }
    });
  });

  test('handles multiple fields with profanity', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: 'Title with badword',
      description: 'Description with forbidden content'
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {},
      errors: {
        title: {
          type: 'profanity',
          message: 'This field contains prohibited words'
        },
        description: {
          type: 'profanity',
          message: 'This field contains prohibited words'
        }
      }
    });
  });

  test('works with custom profanity words', async () => {
    const customProfanity = new MockProfanity(['custom', 'words']);
    const resolver = ProfanityResolver(customProfanity);
    const values = {
      title: 'Title with custom word',
      description: 'Clean description'
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        description: 'Clean description'
      },
      errors: {
        title: {
          type: 'profanity',
          message: 'This field contains prohibited words'
        }
      }
    });
  });

  test('handles empty values correctly', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: '',
      description: ''
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        title: '',
        description: ''
      },
      errors: {}
    });
  });

//   test('integrates with React Hook Form useForm hook', async () => {
//     const resolver = ProfanityResolver(profanity);
    
//     const { result } = renderHook(() => 
//       useForm({
//         resolver,
//         defaultValues: {
//           title: '',
//           description: ''
//         }
//       })
//     );
  
//     await act(async () => {
//       result.current.setValue('title', 'Title with badword');
//       result.current.setValue('description', 'Clean description');
//       await result.current.trigger(); // Validate entire form
//     });
  
//     await waitFor(() => {
//       // Check if any errors exist
//       const titleError = result.current.formState.errors.title;
//       console.log('Title Error:', titleError); // Log for debugging

//       expect(titleError).toMatchObject({
//         type: 'profanity',
//         message: expect.stringContaining('Inappropriate content detected')
//       });
//     });
  
//     expect(result.current.formState.isValid).toBeFalsy(); // Form should be invalid due to profanity
// });


  test('handles non-string values gracefully', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: 123,
      description: true
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        title: 123,
        description: true
      },
      errors: {}
    });
  });

  test('handles undefined and null values without errors', async () => {
    const resolver = ProfanityResolver(profanity);
    const values = {
      title: undefined,
      description: null
    };

    const result = await resolver(values);

    expect(result).toEqual({
      values: {
        title: undefined,
        description: null
      },
      errors: {}
    });
  });
});
