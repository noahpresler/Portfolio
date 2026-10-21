import Image from "next/image";
import type { Img } from "@/lib/content";

export function BrowserFrame({ img, url, className = "", sizes }: { img: Img; url?: string; className?: string; sizes?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] bg-[#1c1c1f] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] px-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        {url && (
          <span className="mx-auto -translate-x-6 truncate rounded-md bg-white/[0.05] px-8 py-0.5 font-mono text-[10px] text-faint">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <Image src={img.path} alt={img.alt} width={img.width} height={img.height} sizes={sizes ?? "(min-width: 768px) 50vw, 90vw"} className="block h-auto w-full" />
    </div>
  );
}

export function PhoneFrame({ img, className = "", sizes }: { img: Img; className?: string; sizes?: string }) {
  return (
    <div
      className={`rounded-[2.6rem] bg-[#0d0d0f] p-[7px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.05)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2.2rem]">
        <Image src={img.path} alt={img.alt} width={img.width} height={img.height} sizes={sizes ?? "(min-width: 768px) 20vw, 45vw"} className="block h-auto w-full" />
      </div>
    </div>
  );
}
