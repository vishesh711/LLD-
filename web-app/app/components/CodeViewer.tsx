'use client';

import { useEffect, useState } from 'react';
import type { Prism as PrismType } from 'react-syntax-highlighter';
import type { CSSProperties } from 'react';

interface CodeViewerProps {
  code: string;
  language?: string;
}

type SyntaxHighlighterType = typeof PrismType;
type StyleType = { [key: string]: CSSProperties };

export default function CodeViewer({ code, language = 'python' }: CodeViewerProps) {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<SyntaxHighlighterType | null>(null);
  const [theme, setTheme] = useState<StyleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadDependencies() {
      try {
        // Import both modules in parallel
        const [highlighterModule, themeModule] = await Promise.all([
          import('react-syntax-highlighter'),
          import('react-syntax-highlighter/dist/cjs/styles/prism')
        ]);
        
        setSyntaxHighlighter(highlighterModule.Prism);
        setTheme(themeModule.atomDark);
      } catch (error) {
        console.error('Failed to load syntax highlighter:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDependencies();
  }, []);
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-gray-200 font-medium">Code</span>
        <span className="text-xs text-gray-400">{language}</span>
      </div>
      
      {isLoading ? (
        // Loading placeholder
        <div className="bg-gray-800 animate-pulse rounded-b-lg h-40 w-full"></div>
      ) : SyntaxHighlighter && theme ? (
        // Render syntax highlighter if loaded successfully
        <SyntaxHighlighter
          language={language}
          style={theme}
          showLineNumbers={true}
          customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        // Fallback to plain pre/code if loading failed
        <div className="p-4 text-white">
          <pre className="whitespace-pre-wrap overflow-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
} 