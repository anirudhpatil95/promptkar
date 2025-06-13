import { motion } from 'framer-motion';
import Image from 'next/image';

interface OutputPreviewProps {
  type: 'text' | 'image' | 'website';
  content: string;
  isLoading: boolean;
}

export default function OutputPreview({ type, content, isLoading }: OutputPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">Generated Output</h3>
      
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : type === 'image' ? (
          <div className="relative w-full aspect-square">
            <Image
              src={content}
              alt="Generated image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : type === 'website' ? (
          <div className="prose max-w-none">
            <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
              <code>{content}</code>
            </pre>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 