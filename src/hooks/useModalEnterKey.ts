import { useEffect } from 'react';

interface UseModalEnterKeyProps {
  isOpen: boolean;
  onEnter: () => void;
  onEscape?: () => void;
  disabled?: boolean;
}

export function useModalEnterKey({ 
  isOpen, 
  onEnter, 
  onEscape,
  disabled = false 
}: UseModalEnterKeyProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || disabled) return;

      // Check if we're in an input field
      const activeElement = document.activeElement;
      const isInputFocused = activeElement instanceof HTMLInputElement || 
                            activeElement instanceof HTMLTextAreaElement;

      // For Enter key
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        // If we're in a form input, only trigger on explicit form submission
        if (isInputFocused && activeElement?.form) {
          return;
        }
        e.preventDefault();
        onEnter();
      }
      // For Escape key
      else if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onEnter, onEscape, disabled]);
}