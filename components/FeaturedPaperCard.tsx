import Link from 'next/link';
import { FC } from 'react';

interface FeaturedPaperCardProps {
  slug: string;
  title: string;
  excerpt: string;
  DOI?: string;
  DocID?: string;
}

export const FeaturedPaperCard: FC<FeaturedPaperCardProps> = ({
  slug,
  title,
  excerpt,
  DOI,
  DocID,
}) => {
  return (
    <Link href={`/papers/${slug}`} className="block group">
      <div className="border border-dpmOlive bg-[#F5F5F5] p-3 hover:border-burntOchre hover:shadow-md transition-all">
        {/* DOI Link */}
        {DOI && (
          <div className="mb-1">
            <span className="font-mono text-xs text-burntOchre">
              DOI: {DOI}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-serif-primary text-base text-striationCharcoal font-normal mb-1 group-hover:text-burntOchre transition-colors line-clamp-1">
          {title}
        </h3>
        
        {/* Excerpt */}
        <p className="font-serif-body text-sm text-gray-600 italic leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};
