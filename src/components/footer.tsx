import { Github, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
          {/* Left side - Author info */}
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>by</span>
            <a
              href="https://usmans.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
            >
              Usman S.
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Right side - Open source info */}
          <div className="flex items-center gap-4">
            <span className="text-xs">Open Source</span>
            <a
              href="https://github.com/max-programming/whim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 transition-all duration-200 text-slate-700 dark:text-slate-300"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs font-medium">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
