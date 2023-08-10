import { useState } from "react";

export function useRerender() {
  const [, setFlag] = useState(false);

  return () => setFlag((flag) => !flag);
}
