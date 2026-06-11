import Image from "next/image";

type GalleryItem = { src: string; alt: string; label: string };

const ROW1: GalleryItem[] = [
  { src: "/gallery-grua.jpg",       alt: "Grúa izando viga en taller FITA",                label: "Izaje estructural" },
  { src: "/gallery-soldadores.jpg", alt: "Dos soldadores FITA en fabricación de bajantes",  label: "Fabricación de bajantes" },
  { src: "/gallery-terminado.jpg",  alt: "Módulo habitacional terminado entregado por FITA", label: "Módulo terminado" },
  { src: "/gallery-colado.jpg",     alt: "Colado de losa en obra civil FITA",               label: "Obra civil" },
];

const ROW2: GalleryItem[] = [
  { src: "/gallery-armazon.jpg",    alt: "Armazón estructural de acero en taller FITA",    label: "Armazón estructural" },
  { src: "/gallery-taller.jpg",     alt: "Taller FITA con grúa y logo en pared",           label: "Taller FITA" },
  { src: "/gallery-corte.jpg",      alt: "Corte de placa con chispas en taller FITA",      label: "Corte CNC" },
  { src: "/gallery-izaje.jpg",      alt: "Izaje de estructura tubular industrial FITA",    label: "Izaje tubular" },
];

function GalleryCard({ img }: { img: GalleryItem }) {
  return (
    <div className="group relative h-64 w-[440px] shrink-0 overflow-hidden rounded-sm border border-white/[0.06] md:h-[280px] md:w-[520px]">
      {/* Photo */}
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover brightness-[0.78] transition-[transform,filter] duration-700 ease-out group-hover:brightness-[0.92] group-hover:scale-[1.06]"
        sizes="520px"
      />
      {/* Permanent bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-60" />
      {/* Copper accent bar — grows on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-signal-copper to-signal-amber transition-all duration-500 ease-out group-hover:w-full" />
      {/* Label — slides up from bottom on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="translate-y-1 text-[10px] uppercase tracking-[0.26em] text-steel-light/50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {img.label}
        </p>
      </div>
      {/* Corner accent top-left */}
      <div className="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function GalleryRow({ items, reverse }: { items: GalleryItem[]; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className="gallery-fade-mask overflow-hidden">
      <div className={`flex gap-4 ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
        {track.map((img, i) => (
          <GalleryCard key={i} img={img} />
        ))}
      </div>
    </div>
  );
}

export function PhotoGallery() {
  return (
    <section className="pause-on-hover relative overflow-hidden border-b border-t border-industrial-800 bg-industrial-950 py-20">
      {/* Radial copper glow — top center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(249,115,22,0.055),transparent)]" />
      {/* Grid texture overlay */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.025]" />

      <div className="relative mb-14 px-4 text-center md:px-8">
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-signal-copper" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-signal-copper">Trabajo documentado</p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-signal-copper" />
        </div>
        <h2 className="font-teko text-4xl uppercase tracking-wide text-steel-light md:text-5xl lg:text-[3.5rem]">
          Obra real. Sin renders.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-industrial-400">
          Fabricación estructural, izaje, obra civil y módulos entregados — capturados en campo.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <GalleryRow items={ROW1} />
        <GalleryRow items={ROW2} reverse />
      </div>
    </section>
  );
}
