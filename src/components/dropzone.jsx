"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Dropzone component for file uploads with drag and drop
 */
export default function Dropzone({ onFileDrop, maxSize = 5, acceptedTypes = ["image/jpeg", "image/png", "image/jpg"] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  
  // Convert MB to bytes
  const maxSizeBytes = maxSize * 1024 * 1024;
  
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);
  
  const validateFile = useCallback((file) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Please upload ${acceptedTypes.map(type => type.split('/')[1]).join(', ')} files.`);
      return false;
    }
    
    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum size is ${maxSize}MB.`);
      return false;
    }
    
    setError(null);
    return true;
  }, [acceptedTypes, maxSizeBytes, maxSize]);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileDrop(file);
    }
  }, [onFileDrop, validateFile]);
  
  const handleFileChange = useCallback((e) => {
    console.log('File input change event:', e.target.files);
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file && validateFile(file)) {
      console.log('File validated, calling onFileDrop with:', file);
      onFileDrop(file);
    }
  }, [onFileDrop, validateFile]);
  
  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-72 glass-effect",
          isDragging 
            ? "border-indigo-500/40 bg-indigo-500/5 shadow-lg"
            : "border-white/10 hover:border-white/20 bg-zinc-900/20 hover:bg-zinc-900/30"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="bg-zinc-900/40 backdrop-blur-md p-3 rounded-full mb-5 border border-white/5 shadow-inner">
          <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-xl font-medium mb-2 text-white/90">Upload Image</p>
        <p className="text-sm text-gray-400 mb-3 text-center">Drag & drop or click to browse</p>
        <p className="text-xs text-gray-500 mb-5">
          {acceptedTypes.map(type => type.split('/')[1]).join(', ')} files up to {maxSize}MB
        </p>
        
        <label 
          htmlFor="file-upload" 
          className="relative group overflow-hidden bg-indigo-500 hover:bg-indigo-600 border border-white/20 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-300"
        >
          <span className="relative z-10 flex items-center">
            <svg className="w-5 h-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Select File
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleFileChange}
            onClick={(e) => {
              // Reset the input value to allow selecting the same file again
              e.target.value = null;
            }}
          />
        </label>
      </div>
      
      {error && (
        <div className="mt-3 text-sm text-red-400 flex items-center bg-red-900/10 backdrop-blur-md px-4 py-2 rounded-xl border border-red-500/20">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
} 