"use client";

import { useCallback, useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XCircle, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";

export const ImageDropzone = forwardRef<
  HTMLDivElement,
  {
    previewImage?: string;
    onFileAccepted: (file: File) => void;
    onFileRemoved: () => void;
  }
>(function ImageDropzone({ previewImage, onFileAccepted, onFileRemoved }, ref) {
  const [preview, setPreview] = useState<string | undefined>(previewImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (preview) URL.revokeObjectURL(preview);

        setPreview(URL.createObjectURL(file));
        onFileAccepted(file);
      }
    },
    [onFileAccepted, preview]
  );

  const removePreview = () => {
    if (preview) URL.revokeObjectURL(preview);

    setPreview(undefined);
    onFileRemoved();
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
    <div className="w-full">
      <div
        {...getRootProps({
          className: cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 ring-offset-background",
            isDragActive
              ? "border-primary/80 bg-black/10 dark:bg-white/10"
              : "border-input"
          ),
          ref: ref,
        })}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-2 pointer-events-none">
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
