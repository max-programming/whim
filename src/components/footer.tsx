import { ExternalLink, Github, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span>© {year} Whim</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="flex items-center gap-1">
              Built by
              <a
                href="https://usmans.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 rounded"
              >
                Usman S.
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>
              <Heart className="h-3.5 w-3.5 text-rose-500/80 ml-1" aria-hidden="true" />
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <span className="text-xs">Open source</span>
            <a
              href="https://github.com/max-programming/whim"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Whim on GitHub"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 rounded"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs font-medium underline underline-offset-4 decoration-slate-300/70 hover:decoration-current">
                View on GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}