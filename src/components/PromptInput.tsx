import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { optimizePrompt } from '@/lib/promptOptimizer';

interface PromptInputProps {
  onPromptSubmit: (prompt: string, type: 'text' | 'image' | 'website') => void;
}

export default function PromptInput({ onPromptSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setPrompt(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      const { optimizedPrompt, type } = optimizePrompt(prompt, language);
      onPromptSubmit(optimizedPrompt, type);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-lg ${
              language === 'en'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-lg ${
              language === 'hi'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            हिंदी
          </button>
        </div>
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Enter your prompt here...'
                : 'अपना प्रॉम्प्ट यहाँ लिखें...'
            }
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`absolute right-4 bottom-4 p-2 rounded-full ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white`}
          >
            {isRecording ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="6" width="12" height="12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {language === 'en' ? 'Generate' : 'जनरेट करें'}
        </button>
      </form>
    </motion.div>
  );
} 