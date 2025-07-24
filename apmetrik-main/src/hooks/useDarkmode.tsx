import { useEffect, useState } from "react"

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => setIsDark(mediaQuery.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return {
    value: isDark,
    toggle: () => setIsDark((prev) => !prev),
  }
}
