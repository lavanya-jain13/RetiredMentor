
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
  options = { threshold: 0.1, triggerOnce: true }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return [ref, isVisible] as const;
};

export const useParallax = (speed = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      // Calculate x and y position within the element (0 to 1)
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      // Calculate movement amount (px)
      const moveX = (x - 0.5) * speed * 100;
      const moveY = (y - 0.5) * speed * 100;
      
      ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);

  return ref;
};

export const useTypewriter = (
  text: string, 
  options = { delay: 50, startDelay: 0, cursor: true }
) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let charIndex = 0;
    
    // Reset state when text changes
    setDisplayText('');
    setIsTyping(true);
    charIndex = 0;
    
    // Initial delay before typing starts
    const startTyping = () => {
      timer = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayText(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, options.delay);
    };
    
    const startTimer = setTimeout(startTyping, options.startDelay);
    
    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [text, options.delay, options.startDelay]);

  return {
    text: displayText,
    isTyping,
    cursor: options.cursor && isTyping,
  };
};

// For staggered animations in lists
export const getStaggeredDelay = (
  index: number, 
  baseDelay = 100, 
  staggerAmount = 50
) => {
  return baseDelay + (index * staggerAmount);
};
