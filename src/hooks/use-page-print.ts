"use client";

import { useCallback, useState } from "react";

export function usePagePrint() {
  const [isLoading, setIsLoading] = useState(false);

  const printPage = useCallback((pageUrl: string) => {
    setIsLoading(true);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pageUrl;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      if (iframe.contentWindow) {
        setIsLoading(false);
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    };

    const handleAfterPrint = () => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    if (iframe.contentWindow) {
      iframe.contentWindow.onafterprint = handleAfterPrint;
    }
  }, []);

  return { isLoading, printPage };
}
