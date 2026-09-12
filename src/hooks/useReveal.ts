import { useEffect, useRef } from "react";

/**
 * Revela o elemento quando ele entra na viewport.
 * Custo: um IntersectionObserver — sem dependência externa de animação.
 */
export function useReveal<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Revela ao entrar na viewport — ou se o usuário já passou por ela
          // numa rolagem rápida, caso em que o callback chega tarde demais.
          const alreadyPassed = entry.boundingClientRect.top <= window.innerHeight;
          if (entry.isIntersecting || alreadyPassed) {
            element.dataset.visible = "true";
            observer.disconnect();
          }
        }
      },
      // threshold 0: qualquer pixel visível já revela. Um limiar por área nunca
      // dispararia em seções mais altas que a viewport.
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}
