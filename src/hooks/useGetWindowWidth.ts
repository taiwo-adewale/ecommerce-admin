"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

/**
 * Hook to retrieve and manage the debounced window width.
 * @returns The debounced window width value or null if window object is undefined.
 */
export default function useGetWindowWidth(): number | null {
  // Initialize state with current window width.
  // Check for window object because next js runs first on server and window is not defined on the server.
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  // Using the debounce hook to manage the debounced window width value
  const debouncedWidthValue = useDebounce(windowWidth, 100);

  useEffect(() => {
    // Function to handle window resize event
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener to track window resize and call handleWindowResize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup function to remove event listener when component unmounts or re-renders
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the debounced width value to be used in the component
  return debouncedWidthValue[0];
}
