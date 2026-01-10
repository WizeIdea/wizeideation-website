import { FC } from 'react';

type Props = {
  /** HTML string produced by remark/markdown-it */
  html: string;
};

const MarkdownRenderer: FC<Props> = ({ html }) => (
  <div
    className="prose lg:prose-xl max-w-none text-striationCharcoal"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default MarkdownRenderer;