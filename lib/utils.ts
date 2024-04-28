import toast from "react-hot-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export async function copyToClipboard(content: string, what: string) {
  try {
    await navigator.clipboard.writeText(content);
    toast.success(`Copied ${what} to clipboard`);
  } catch {
    toast.error(`Failed to copy ${what} to clipboard`);
  }
}

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}
