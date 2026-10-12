import { useCallback, useEffect, useRef, useState } from "react";

export const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/Nighty3098/SkyFall/main/install.sh | bash";

/** Copy the install command to the clipboard and expose a `copied` flag. */
export function useCopyInstallCommand(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), resetAfter);
    } catch {
      /* clipboard unavailable */
    }
  }, [resetAfter]);

  return { copied, copy };
}
