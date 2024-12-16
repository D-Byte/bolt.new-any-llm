import { useRef, useCallback, useEffect } from 'react';

export function useSnapScroll() {
  const autoScrollRef = useRef(true);
  const scrollNodeRef = useRef<HTMLDivElement>();
  const onScrollRef = useRef<() => void>();
  const observerRef = useRef<ResizeObserver>();

  const scrollToBottom = useCallback(() => {
    if (scrollNodeRef.current) {
      requestAnimationFrame(() => {
          scrollNodeRef.current?.scrollTo({
            top: scrollNodeRef.current.scrollHeight,
            behavior: 'smooth',
          });
      })
    }
  }, []);

  const messageRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      scrollNodeRef.current = node;
      if (scrollNodeRef.current) {
        observerRef.current = new ResizeObserver(() => {
          if (autoScrollRef.current && scrollNodeRef.current) {
            scrollToBottom();
          }
        });
        observerRef.current.observe(scrollNodeRef.current);
      }
    } else {
      observerRef.current?.disconnect();
      observerRef.current = undefined;
      scrollNodeRef.current = undefined;
    }
  }, [scrollToBottom]);

    useEffect(() => {
        if(scrollNodeRef.current){
            scrollToBottom()
        }
    }, [scrollToBottom])

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    console.log('scrollRef',node);
    if (node) {
      
      const onScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = node;
        const scrollTarget = scrollHeight - clientHeight;
        autoScrollRef.current = Math.abs(scrollTop - scrollTarget) <= 10;
      };

      node.addEventListener('scroll', onScroll);
      console.log('onScroll',onScroll);
      console.log('onScrollRef',onScrollRef.current);
        return () => node.removeEventListener('scroll', onScroll);
    }
  }, []);

  const scrollRefOld = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      onScrollRef.current = () => {
        const { scrollTop, scrollHeight, clientHeight } = node;
        const scrollTarget = scrollHeight - clientHeight;

        autoScrollRef.current = Math.abs(scrollTop - scrollTarget) <= 10;
      };

      node.addEventListener('scroll', onScrollRef.current);

      scrollNodeRef.current = node;
    } else {
      if (onScrollRef.current) {
        scrollNodeRef.current?.removeEventListener('scroll', onScrollRef.current);
      }

      scrollNodeRef.current = undefined;
      onScrollRef.current = undefined;
    }
  }, []);

  return [messageRef, scrollRef, scrollToBottom];
}
