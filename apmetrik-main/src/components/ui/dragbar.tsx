import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DragBar: A transparent Electron drag region.
 * Place this at the top of your window to allow custom window dragging.
 */
const DragBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-0 left-0 w-full h-4 z-50",
      className
    )}
    style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    {...props}
  />
))

DragBar.displayName = "DragBar"

export { DragBar }
