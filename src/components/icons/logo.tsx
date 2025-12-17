import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path 
        d="M6 26V6H12V23C12 24.6569 13.3431 26 15 26H6Z" 
        fill="currentColor" 
      />
      <path 
        d="M19 6H26V26H20V9C20 7.34315 18.6569 6 17 6H19Z" 
        fill="currentColor" 
        fillOpacity="0.8"
      />
    </svg>
    <span className="font-headline text-xl font-bold tracking-tight">
      Dezx Leather
    </span>
  </div>
);