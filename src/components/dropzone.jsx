"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from "@/lib/utils";

/**
 * Dropzone component for file uploads with drag and drop
 */
export default function Dropzone({ onFileDrop }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFileDrop(acceptedFiles);
  }, [onFileDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-input p-8 rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[200px]
        ${isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-gray-700 hover:border-indigo-500/50'}`}
    >
      <input {...getInputProps()} />
      <div className="text-center flex flex-col items-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col items-center">
          <p className="text-base text-gray-400 mb-2">
            {isDragActive
              ? 'Drop the images here'
              : 'Drag and drop images here, or click to select files'}
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, JPEG up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
} 