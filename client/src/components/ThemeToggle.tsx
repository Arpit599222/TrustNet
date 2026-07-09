import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme';

interface ThemeToggleProps {
  /** Optional size variant. */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Reusable light/dark mode toggle. Uses the global ThemeProvider.
 */
export default function ThemeToggle({ size = 'md', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const padding = size === 'sm' ? 'py-1.5 px-2.5' : 'py-2 px-3';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`skeuo-icon-btn ${padding} rounded-full flex items-center gap-1.5 ${
        size === 'sm' ? 'text-[10px]' : 'text-xs'
      } font-bold text-slate-600 dark:text-slate-300 cursor-pointer transition ${className}`}
    >
      {isDark ? (
        <Sun className={`${iconSize} text-amber-500`} />
      ) : (
        <Moon className={`${iconSize} text-blue-700`} />
      )}
      <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
