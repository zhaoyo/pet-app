import { useCallback, useRef } from 'react';

type CryType = 'latest' | 'legacy';

export function usePikachuCry() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((type: CryType = 'latest') => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(`/sounds/pikachu-${type}.ogg`);
    audioRef.current = audio;
    audio.play().catch(() => {});
  }, []);

  return play;
}
