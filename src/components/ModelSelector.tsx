import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const MODELS = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model, best for complex tasks',
    icon: '/tools/chatgpt.svg'
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Excellent for analysis and writing',
    icon: '/tools/claude.svg'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Great for creative content',
    icon: '/tools/gemini.svg'
  }
];

export default function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModelSelect(model.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedModel === model.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={model.icon}
                alt={model.name}
                className="w-8 h-8"
              />
              <div className="text-left">
                <h4 className="font-medium">{model.name}</h4>
                <p className="text-sm text-gray-600">{model.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 