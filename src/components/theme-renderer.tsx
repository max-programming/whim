import { ReactNode } from "react";

interface ThemeRenderProps {
  children: ReactNode;
}

export default function ThemeRender({ children }: ThemeRenderProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
  {/* Base background */}
  <div className="absolute inset-0 -z-20 bg-white dark:bg-black" />

  {/* Light mode gradient - more visible */}
  <div
    className="absolute inset-0 -z-10 dark:hidden"
    style={{
      background: `
        radial-gradient(125% 125% at 50% 100%, 
          transparent 30%, 
          rgb(99 102 241 / 0.08) 70%,
          rgb(139 92 246 / 0.12) 100%
        )
      `,
    }}
  />

  {/* Dark mode gradient */}
  <div
    className="absolute inset-0 -z-10 hidden dark:block"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 100%, transparent 40%, #010133 100%)",
    }}
  />

  {/* Noise texture overlay */}
  <div 
    className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.02]" 
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }}
  />

  <div className="relative z-0">{children}</div>
</div>
  );
}
