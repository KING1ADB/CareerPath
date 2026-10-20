import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showTagline = true,
  size = "md",
  className,
  linkTo = "/",
}) => {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-navy-950 via-slate-900 to-teal-900 p-2 text-white shadow-md transition-transform duration-200 group-hover:scale-105">
        <Compass className={cn("text-teal-400 transition-transform duration-300 group-hover:rotate-45", iconSizes[size])} />
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={cn("font-bold tracking-tight text-navy-950", textSizes[size])}>
            Career<span className="text-teal-600">Path</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
            Discover • Plan • Grow
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg">{content}</Link>;
  }

  return content;
};
