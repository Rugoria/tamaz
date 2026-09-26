import { gallery } from "@/content/site";
import { ImageSlot } from "./image-slot/ImageSlot";
import { SectionHead } from "./SectionHead";
import styles from "./StudioGallery.module.css";

export function StudioGallery() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} />
        <div className={`${styles.mosaic} reveal`}>
          {gallery.images.map((img, i) => (
            <ImageSlot
              key={img.src}
              {...img}
              className={i === 0 ? `${styles.tile} ${styles.big}` : styles.tile}
              sizes={i === 0 ? "(max-width: 760px) 100vw, 600px" : "(max-width: 760px) 50vw, 300px"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
