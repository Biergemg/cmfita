import Image from "next/image";

const ROW1 = [
  { src: "/gallery-grua.jpg",      alt: "Grúa izando viga en taller FITA" },
  { src: "/gallery-soldadores.jpg", alt: "Dos soldadores FITA en fabricación de bajantes" },
  { src: "/gallery-terminado.jpg",  alt: "Módulo habitacional terminado entregado por FITA" },
  { src: "/gallery-colado.jpg",     alt: "Colado de losa en obra civil FITA" },
];

const ROW2 = [
  { src: "/gallery-armazon.jpg",   alt: "Armazón estructural de acero en taller FITA" },
  { src: "/gallery-taller.jpg",    alt: "Taller FITA con grúa y logo en pared" },
  { src: "/gallery-corte.jpg",     alt: "Corte de placa con chispas en taller FITA" },
  { src: "/gallery-izaje.jpg",     alt: "Izaje de estructura tubular industrial FITA" },
];

function GalleryRow({ items, reverse }: { items: typeof ROW1; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={reverse ? "animate-marquee-right flex gap-3" : "animate-marquee-left flex gap-3"}>
        {track.map((img, i) => (
          <div key={i} className="relative h-56 w-80 shrink-0 overflow-hidden rounded-sm border border-industrial-800 md:h-64 md:w-96">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="384px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhotoGallery() {
  return (
    <section className="pause-on-hover overflow-hidden border-b border-t border-industrial-800 bg-industrial-950 py-16">
      <div className="mb-10 px-4 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-industrial-400">Trabajo documentado</p>
        <h2 className="mt-2 font-teko text-3xl uppercase tracking-wide text-steel-light md:text-4xl">
          Obra real. Sin renders.
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        <GalleryRow items={ROW1} />
        <GalleryRow items={ROW2} reverse />
      </div>
    </section>
  );
}
