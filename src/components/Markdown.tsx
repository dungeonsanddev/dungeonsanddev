import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import rangeParser from 'parse-numeric-range';

import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

export const Markdown = ({ children }) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents: object = {
    code({ node, className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;
      const code = children.map((c) => c.slice(0, -1));
      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, '');
          const strlineNumbers = RE?.test(metadata)
            ? (RE?.exec(metadata) || [])[1]
            : '0';
          const highlightLines = rangeParser(strlineNumbers as string);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? 'highlight' : null;
          return { data };
        } else {
          return {};
        }
      };

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <code className="p-1 text-white bg-gray-900 rounded">{children}</code>
      );
    },
    h1: (props) => <h1 className="text-6xl font-bold" {...props} />,
    h2: (props) => <h2 className="mt-4 text-4xl font-bold" {...props} />,
    h3: (props) => <h3 className="mt-4 text-2xl font-bold" {...props} />,
    p: (props) => <p {...props} />,
    ul: (props) => <ul className="ml-8 list-disc" {...props} />,
  };
  return (
    <ReactMarkdown components={MarkdownComponents}>{children}</ReactMarkdown>
  );
};
