import { motion } from 'framer-motion';
import Image from 'next/image';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const MODELS = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model, best for complex tasks',
    icon: '/models/gpt4.svg'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Advanced reasoning and analysis',
    icon: '/models/claude.svg'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s latest AI model',
    icon: '/models/gemini.svg'
  }
];

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">Select AI Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MODELS.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border transition-colors ${
              selectedModel === model.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src={model.icon}
                  alt={model.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <h4 className="font-medium">{model.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {model.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 