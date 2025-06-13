import { motion } from 'framer-motion';
import { useState } from 'react';

type OutputType = 'text' | 'image' | 'website';

interface OutputPreviewProps {
  type: OutputType;
  content: string;
  isLoading: boolean;
}

export default function OutputPreview({ type, content, isLoading }: OutputPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (type) {
      case 'website':
        return (
          <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
              srcDoc={content}
              className="w-full h-full"
              title="Website Preview"
            />
          </div>
        );
      case 'image':
        return (
          <div className="relative">
            <img
              src={content}
              alt="Generated image"
              className="w-full rounded-lg"
            />
            <a
              href={content}
              download="generated-image.png"
              className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="relative">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {content}
              </pre>
            </div>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Here's what your prompt created!
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : renderContent()}
    </motion.div>
  );
} 