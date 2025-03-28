import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names with Tailwind CSS merge capabilities
 * @param  {...any} inputs - Class names to be combined
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Downloads a file from a URL
 * @param {string} url - URL of the file to download
 * @param {string} filename - Name to save the file as
 */
export async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download the image');
  }
} 