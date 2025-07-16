import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React, { createContext, useContext, useState, useRef } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const [audioState, setAudioState] = useState({
    src: '',
    title: '',
    kand: '',
    trackIndex: 0,
    trackList: [],
    isOpen: false,
    isPlaying: false,
  });
  const audioRef = useRef(null);

  return (
    <AudioPlayerContext.Provider value={{ audioState, setAudioState, audioRef }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
