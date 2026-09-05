import Image from "next/image";
import type { GalleryItem } from "@/content/cases";
import { RegMarks } from "@/components/ui/RegMarks";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Case galleries show CLEAN by default — inside a case the interface is the evidence,
 * so nothing here is dithered unless the caption says the image itself is the processed
 * derivative of the same file.
 */
export function CaseGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="wrap pt-12 lg:pt-16">
      <ul className="grid12">
        {items.map((item, i) => (
          <li
            key={item.src}
            className={
              i === 0
                ? "col-span-4 md:col-span-6 lg:col-span-12 mb-10"
                : "col-span-4 md:col-span-3 lg:col-span-6 mb-10"
            }
          >
            <Reveal>
              <figure
                className="relative"
                style={{
                  aspectRatio: item.ratio,
                  border: "1px solid var(--rule)",
                  background: "var(--paper-2)",
                }}
              >
                <Image
                  src={`/media/${item.src}.webp`}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 767px) 100vw, 90vw" : "(max-width: 767px) 100vw, 45vw"}
                  style={{ objectFit: "cover" }}
                />
                <RegMarks inset={7} />
              </figure>
              <figcaption className="nano mt-2">{item.caption}</figcaption>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
