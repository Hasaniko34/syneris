import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language: string;
  value: string;
  classNameWrapper?: string;
}

export function CodeBlock({ language, value, classNameWrapper }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative group rounded-md overflow-hidden my-4', classNameWrapper)}>
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-800 text-zinc-300">
        <div className="text-xs uppercase font-mono">{language || 'code'}</div>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded-md text-zinc-300 hover:bg-zinc-700"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language || 'typescript'}
        style={vscDarkPlus}
        customStyle={{ 
          margin: 0, 
          background: '#1e1e1e', 
          padding: '1rem',
          fontSize: '0.9rem',
          borderRadius: '0 0 0.375rem 0.375rem'
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
} 