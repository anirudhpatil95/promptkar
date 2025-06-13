interface PromptOptimizationResult {
  optimizedPrompt: string;
  type: 'text' | 'image' | 'website';
  confidence: number;
}

const PROMPT_TYPES = {
  text: ['write', 'create', 'generate', 'compose', 'draft', 'summarize', 'explain', 'describe'],
  image: ['create image', 'generate image', 'design', 'draw', 'illustrate', 'visualize', 'picture'],
  website: ['create website', 'build website', 'design website', 'landing page', 'web page', 'web design']
};

const PROMPT_ENHANCERS = {
  clarity: [
    'Be specific about your requirements',
    'Include relevant context',
    'Specify the desired format',
    'Mention any constraints or preferences'
  ],
  structure: [
    'Start with a clear objective',
    'Break down complex requests',
    'Use bullet points for multiple requirements',
    'End with expected output format'
  ],
  context: [
    'Include target audience',
    'Specify industry or domain',
    'Mention any brand guidelines',
    'Add relevant cultural context'
  ]
};

export function optimizePrompt(input: string, language: 'en' | 'hi'): PromptOptimizationResult {
  // Convert Hindi to English if needed
  const prompt = language === 'hi' ? translateToEnglish(input) : input.toLowerCase();
  
  // Determine prompt type
  const type = determinePromptType(prompt);
  
  // Enhance the prompt
  const enhancedPrompt = enhancePrompt(prompt, type);
  
  // Calculate confidence score
  const confidence = calculateConfidence(enhancedPrompt, type);
  
  return {
    optimizedPrompt: enhancedPrompt,
    type,
    confidence
  };
}

function determinePromptType(prompt: string): 'text' | 'image' | 'website' {
  let maxMatches = 0;
  let determinedType: 'text' | 'image' | 'website' = 'text';
  
  Object.entries(PROMPT_TYPES).forEach(([type, keywords]) => {
    const matches = keywords.filter(keyword => prompt.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      determinedType = type as 'text' | 'image' | 'website';
    }
  });
  
  return determinedType;
}

function enhancePrompt(prompt: string, type: 'text' | 'image' | 'website'): string {
  let enhanced = prompt;
  
  // Add clarity enhancers
  if (!hasClarityEnhancers(prompt)) {
    enhanced += `\n\nPlease ensure to:\n${PROMPT_ENHANCERS.clarity[0]}`;
  }
  
  // Add structure enhancers
  if (!hasStructureEnhancers(prompt)) {
    enhanced += `\n\nStructure your response with:\n${PROMPT_ENHANCERS.structure[0]}`;
  }
  
  // Add context enhancers
  if (!hasContextEnhancers(prompt)) {
    enhanced += `\n\nConsider the following context:\n${PROMPT_ENHANCERS.context[0]}`;
  }
  
  // Add type-specific enhancements
  switch (type) {
    case 'image':
      enhanced += '\n\nPlease include details about:\n- Image style and mood\n- Color scheme\n- Composition preferences';
      break;
    case 'website':
      enhanced += '\n\nPlease specify:\n- Target audience\n- Key features\n- Design preferences\n- Content structure';
      break;
    case 'text':
      enhanced += '\n\nPlease consider:\n- Tone and style\n- Length requirements\n- Key points to cover';
      break;
  }
  
  return enhanced;
}

function hasClarityEnhancers(prompt: string): boolean {
  return PROMPT_ENHANCERS.clarity.some(enhancer => 
    prompt.toLowerCase().includes(enhancer.toLowerCase())
  );
}

function hasStructureEnhancers(prompt: string): boolean {
  return PROMPT_ENHANCERS.structure.some(enhancer => 
    prompt.toLowerCase().includes(enhancer.toLowerCase())
  );
}

function hasContextEnhancers(prompt: string): boolean {
  return PROMPT_ENHANCERS.context.some(enhancer => 
    prompt.toLowerCase().includes(enhancer.toLowerCase())
  );
}

function calculateConfidence(prompt: string, type: 'text' | 'image' | 'website'): number {
  let score = 0;
  
  // Base score for having a prompt
  score += 0.3;
  
  // Score for prompt length (longer prompts tend to be more specific)
  score += Math.min(prompt.length / 500, 0.3);
  
  // Score for having type-specific keywords
  const typeKeywords = PROMPT_TYPES[type];
  const keywordMatches = typeKeywords.filter(keyword => prompt.includes(keyword)).length;
  score += (keywordMatches / typeKeywords.length) * 0.2;
  
  // Score for having enhancers
  if (hasClarityEnhancers(prompt)) score += 0.1;
  if (hasStructureEnhancers(prompt)) score += 0.1;
  if (hasContextEnhancers(prompt)) score += 0.1;
  
  return Math.min(score, 1);
}

// Placeholder for Hindi to English translation
function translateToEnglish(hindiPrompt: string): string {
  // TODO: Implement actual translation logic
  return hindiPrompt;
} 