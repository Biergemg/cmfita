import imperpreMessages from "@/messages/es-imperpre.json";
import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { ImperpreFooter } from "@/components/imperpre/Footer";
import { RollHero } from "@/components/imperpre/RollHero";
import { Method } from "@/components/imperpre/Method";
import { Consequences, Decide, Discovery, Faq, Offer, Recognition, Works } from "@/components/imperpre/Sections";
import { Valuation } from "@/components/imperpre/Valuation";
import { MobileBar } from "@/components/imperpre/MobileBar";
import { imperpreFontClass } from "@/components/imperpre/fonts";
import styles from "@/components/imperpre/imperpre.module.css";

export function ImperpreHome({ faqSchema }: { faqSchema: unknown }) {
  const faqItems = (imperpreMessages.Faq.items ?? []) as Array<{ title: string; description: string }>;
  return (
    <div className={`${styles.root} ${imperpreFontClass}`}>
      <ImperpreNavbar />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <RollHero />
        <Recognition />
        <Discovery />
        <Consequences />
        <Decide />
        <Offer />
        <Method />
        <Works />
        <Faq items={faqItems} />
        <Valuation />
      </main>
      <ImperpreFooter />
      <MobileBar />
    </div>
  );
}
