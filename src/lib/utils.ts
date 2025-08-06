import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractSourceFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    let hostname = urlObj.hostname;
    
    // Remove 'www.' prefix if present
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }
    
    // Extract main domain name (remove TLD)
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      return parts[0];
    }
    
    return hostname;
  } catch (error) {
    // If URL parsing fails, return original string or empty
    return '';
  }
}
