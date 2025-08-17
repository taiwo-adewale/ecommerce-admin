"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function usePdfDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const downloadTemplate = async ({
    htmlId,
    pdfName,
  }: {
    htmlId: string;
    pdfName: string;
  }) => {
    const templateElement = document.getElementById(htmlId);

    if (!templateElement) {
      console.error("Template element not found!");
      return;
    }

    setIsLoading(true);

    try {
      const canvas = await html2canvas(templateElement, {
        logging: false,
        scale: 2,
        imageTimeout: 15000,
        useCORS: false,
        width: 794,
        height: 1123,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      pdf.addImage(
        imageData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(`${pdfName}.pdf`);
    } catch (error) {
      console.error("Failed to download pdf:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadTemplate, isLoading };
}
