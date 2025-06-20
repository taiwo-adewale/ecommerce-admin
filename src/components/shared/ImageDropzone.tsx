"use client";

import { useCallback, useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XCircle, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";

const ImageDropzone = forwardRef<
  HTMLDivElement,
  {
    previewImage?: string;
    onFileAccepted: (file: File) => void;
  }
>(function ImageDropzone({ previewImage, onFileAccepted }, ref) {
  const [preview, setPreview] = useState<string | undefined>(previewImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        onFileAccepted(file);
      }
    },
    [onFileAccepted]
  );

  const removePreview = () => {
    setPreview(undefined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full" ref={ref}>
      <div
        {...getRootProps({
          className: cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 cursor-pointer",
            isDragActive
              ? "border-primary/80 bg-black/10 dark:bg-white/10"
              : "border-input"
          ),
        })}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-2">
          <UploadCloud className="size-10 text-primary" />

          <p className="text-sm text-foreground/80">
            Drag your images or click here
          </p>

          <p className="text-xs italic text-muted-foreground">
            (Only *.jpeg, *.webp and *.png images will be accepted)
          </p>
        </div>
      </div>

      {preview && (
        <div className="size-28 p-2 rounded-md relative border border-input mt-4">
          <Image
            src={preview}
            alt="Preview"
            width={96}
            height={96}
            className="size-full object-cover"
          />

          <button
            onClick={removePreview}
            className="absolute -top-2 -right-2 text-red-500"
          >
            <XCircle className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
});

export default ImageDropzone;
