interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithOpenRouter(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://promptkar.com',
        'X-Title': 'PromptKar'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that generates high-quality content based on user prompts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateImageWithOpenRouter(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://promptkar.com',
        'X-Title': 'PromptKar'
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function generateWebsiteWithOpenRouter(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://promptkar.com',
        'X-Title': 'PromptKar'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a web development expert that generates HTML, CSS, and JavaScript code for websites based on user requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating website:', error);
    throw error;
  }
} 