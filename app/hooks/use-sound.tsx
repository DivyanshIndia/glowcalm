import { useEffect, useRef } from "react"

export function useSound(src?: string, options?: { loop?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!src) return
    audioRef.current = new Audio(src)
    if (options?.loop) {
      audioRef.current.loop = true
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return { play, pause, stop }
}