import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Hypergen | Revolutionary AI for the Next Generation',
  description: 'Hypergen delivers state-of-the-art artificial intelligence solutions that transform industries through neural architecture search, multimodal reasoning, and emergent capabilities.',
  keywords: ['AI', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks', 'hypergen', 'multimodal AI', 'generative AI'],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
} 