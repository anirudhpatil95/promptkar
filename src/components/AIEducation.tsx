import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationCard {
  title: string;
  content: string;
  example: string;
}

const EDUCATION_CARDS: EducationCard[] = [
  {
    title: 'What is a Prompt?',
    content: "A prompt is like giving instructions to AI. It's how you tell AI what you want it to do, just like you would tell a friend.",
    example: '🎨 Want to design an invite? Say: "Create a birthday invite for a 5-year-old girl."'
  },
  {
    title: 'What is GPT?',
    content: "GPT (Generative Pre-trained Transformer) is a type of AI that can understand and generate human-like text. It's like having a very smart friend who can help you write, create, and solve problems.",
    example: '🌐 Want a website for chai lovers? Say: "Landing page for a desi chai café."'
  },
  {
    title: 'How do I use AI for my idea?',
    content: "Start by describing your idea in simple terms. AI can help you create content, design, code, and more. Just tell it what you want!",
    example: '📱 Need a social media post? Say: "Create an Instagram post for my new samosa shop."'
  }
];

export default function AIEducation() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 p-6">
      <h2 className="text-2xl font-bold text-center mb-8">AI Made Easy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDUCATION_CARDS.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              className="w-full p-6 text-left"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {card.content}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {card.example}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    expandedCard === index ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 