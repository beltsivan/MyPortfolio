import { useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function SlideViewer({
  slides,
  title,
  onClose,
}: {
  slides: string[];
  title: string;
  onClose: () => void;
}) {
  const [fullPage, setFullPage] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 bg-black select-none"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className={cn(
          "relative w-full h-full flex flex-col",
          !fullPage && "max-w-6xl mx-auto p-3 md:p-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2 md:mb-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="text-base md:text-xl font-bold font-display text-white truncate">
              {title}
            </h3>
            <span className="text-[11px] text-brand-secondary/50 font-mono shrink-0">
              {slides.length} slide{slides.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setFullPage(!fullPage)}
              className="p-1.5 md:p-2 text-white/50 hover:text-white transition-colors"
              aria-label={fullPage ? 'Scroll view' : 'Full page view'}
            >
              {fullPage ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 md:p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Slides */}
        <div
          className={cn(
            "flex-1 flex flex-col items-center gap-5 overflow-y-auto",
            !fullPage && "rounded-xl md:rounded-2xl"
          )}
        >
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} — Slide ${i + 1}`}
              className="w-full max-w-full h-auto shadow-2xl rounded-lg"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
