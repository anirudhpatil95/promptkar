import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="PromptKar Logo"
          width={32}
          height={32}
          className="dark:invert"
        />
        <h1 className="text-xl font-bold">PromptKar</h1>
      </div>

      <nav className="flex items-center gap-6">
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300">
            About
          </Link>
          <Link href="/help" className="hover:text-gray-600 dark:hover:text-gray-300">
            Help
          </Link>
        </div>

        <button
          onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
          className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </nav>
    </header>
  );
} 