export default function SkeletonBlock({ className = "", rounded = "rounded-xl" }: { className?: string; rounded?: string }){
  return <div className={`${rounded} animate-pulse bg-white/10 ${className}`} />
}
