import { motion } from 'framer-motion';
import Image from 'next/image';

interface SmartSuggestionsProps {
  promptType: 'text' | 'image' | 'website';
  content: string;
}

const TOOLS = {
  text: [
    {
      name: 'ChatGPT',
      description: 'Perfect for text generation and editing',
      icon: '/tools/chatgpt.svg',
      link: 'https://chat.openai.com'
    },
    {
      name: 'Claude',
      description: 'Great for analysis and writing',
      icon: '/tools/claude.svg',
      link: 'https://claude.ai'
    }
  ],
  image: [
    {
      name: 'Canva',
      description: 'Create beautiful designs with AI',
      icon: '/tools/canva.svg',
      link: 'https://canva.com'
    },
    {
      name: 'DALL-E',
      description: 'Generate images from text',
      icon: '/tools/chatgpt.svg',
      link: 'https://openai.com/dall-e-2'
    }
  ],
  website: [
    {
      name: 'v0.dev',
      description: 'Generate React components',
      icon: '/tools/v0.svg',
      link: 'https://v0.dev'
    },
    {
      name: 'Lovable.dev',
      description: 'Create landing pages with AI',
      icon: '/tools/lovable.svg',
      link: 'https://lovable.dev'
    }
  ]
};

export default function SmartSuggestions({ promptType, content }: SmartSuggestionsProps) {
  const tools = TOOLS[promptType] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">Recommended Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <motion.a
            key={tool.name}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-8 h-8"
              />
              <div>
                <h4 className="font-medium">{tool.name}</h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
} 