export function MdxContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 text-base leading-8 text-industrial-300 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:text-steel-light [&_h2]:uppercase [&_h2]:tracking-wide [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:text-steel-light [&_h3]:uppercase [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_p]:text-industrial-300">
      {children}
    </div>
  );
}
