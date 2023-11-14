"use client";

import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";

export default function useGetWindowWidth() {
  // Initialize state with current window width.
  // Check for window object because next js runs first on server and window is not defined on the server.
  // 1200 is just a random value and doesn't have any function than to prevent errors
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Using the debounce hook to manage the debounced window width value
  const debouncedWidthValue = useDebounce(windowWidth, 500);

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
  return debouncedWidthValue;
}
