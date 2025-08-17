import { useEffect, useState } from "react";

/**
 * Custom hook to track component mount state.
 * @returns The current mount state of the component.
 */
export default function useGetMountStatus(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Update the 'mounted' state to true when the component mounts
    setMounted(true);
  }, []);

  return mounted;
}
