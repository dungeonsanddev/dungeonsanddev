import { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const Markdown: FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <h1 className="text-6xl font-bold" {...props} />,
        h2: (props) => <h2 className="mt-4 text-4xl font-bold" {...props} />,
        h3: (props) => <h3 className="mt-4 text-2xl font-bold" {...props} />,
        p: (props) => <p {...props} />,
        ul: (props) => <ul className="ml-8 list-disc" {...props} />,
        pre: (props) => (
          <pre className="p-4 text-white bg-gray-900 rounded" {...props} />
        ),
        /** @todo add syntax highlighting */
        code: (props) => <code className="" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
