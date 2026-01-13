import Image from 'next/image';

interface ServiceDividerProps {
  imageName: string;
  alt?: string;
}

export function ServiceDivider({ imageName, alt = 'Decorative divider' }: ServiceDividerProps) {
  return (
    <div className="relative w-full max-w-xs mx-auto my-8">
      <Image
        src={`/${imageName}`}
        alt={alt}
        width={250}
        height={250}
        className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  );
}
