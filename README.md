# PromptKar - AI Prompt Generator for India

PromptKar is a sleek, AI-powered web application that helps users in India generate prompts using simple Hindi/English text or voice input. It shows output previews of what their prompt would generate—text, image, or website—and recommends tools like ChatGPT, Canva, v0.dev, etc., for next steps.

## Features

- 🌐 Bilingual Support: Hindi and English interface
- 🎤 Voice Input: Speak your prompts in Hindi or English
- 🤖 Multiple AI Models: GPT-3.5, GPT-4, Claude, Gemini, and more
- 📱 Responsive Design: Works on all devices
- 🎨 Modern UI: Built with Tailwind CSS and Framer Motion
- 💡 Smart Suggestions: Context-aware tool recommendations
- 🧑‍🏫 KarAI Chatbot: Interactive AI guide for first-time users
- 📚 AI Education: Simple explanations and examples

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenRouter API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/promptkar.git
   cd promptkar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── PromptInput.tsx
│   ├── ModelSelector.tsx
│   ├── OutputPreview.tsx
│   ├── SmartSuggestions.tsx
│   ├── KarAIChat.tsx
│   └── AIEducation.tsx
└── lib/
    └── openrouter.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenRouter](https://openrouter.ai/)
