'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  code: string;
  language?: string;
}

export default function CodeViewer({ code, language = 'python' }: CodeViewerProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-gray-200 font-medium">Code</span>
        <span className="text-xs text-gray-400">{language}</span>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={atomDark}
        showLineNumbers={true}
        customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
} 