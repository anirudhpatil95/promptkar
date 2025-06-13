'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';
import ModelSelector from '@/components/ModelSelector';
import OutputPreview from '@/components/OutputPreview';
import SmartSuggestions from '@/components/SmartSuggestions';
import KarAIChat from '@/components/KarAIChat';
import AIEducation from '@/components/AIEducation';
import {
  generateWithOpenRouter,
  generateImageWithOpenRouter,
  generateWebsiteWithOpenRouter
} from '@/lib/openrouter';

export default function Home() {
  const [outputType, setOutputType] = useState<'text' | 'image' | 'website' | null>(null);
  const [outputContent, setOutputContent] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePromptSubmit = async (prompt: string, type: 'text' | 'image' | 'website') => {
    setIsLoading(true);
    setError(null);
    setOutputType(type);
    setOutputContent('Processing your request...');

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error('OpenRouter API key not found');
      }

      let content: string;
      switch (type) {
        case 'image':
          content = await generateImageWithOpenRouter(prompt, selectedModel, apiKey);
          break;
        case 'website':
          content = await generateWebsiteWithOpenRouter(prompt, selectedModel, apiKey);
          break;
        default:
          content = await generateWithOpenRouter(prompt, selectedModel, apiKey);
      }

      setOutputContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutputContent('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <PromptInput onPromptSubmit={handlePromptSubmit} />
        
        <div className="mt-8">
          <ModelSelector
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
          />
        </div>
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        
        {outputType && outputContent && (
          <>
            <div className="mt-8">
              <OutputPreview
                type={outputType}
                content={outputContent}
                isLoading={isLoading}
              />
            </div>
            
            <div className="mt-8">
              <SmartSuggestions
                promptType={outputType}
                content={outputContent}
              />
            </div>
          </>
        )}
        
        <div className="mt-16">
          <AIEducation />
        </div>
      </div>
      
      <div className="mt-16">
        <KarAIChat />
      </div>
      
      <footer className="mt-16 py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <a href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy
            </a>
            <a
              href="https://instagram.com/promptkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/promptkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
