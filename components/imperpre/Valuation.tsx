"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { buildValuationMessage, isOutOfScope, missingAnswers, valuation, valuationUrl } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { trackWhatsappClick } from "@/lib/analytics";
import { contactEmail, contactPhone } from "@/lib/site";

type Choice = { name: string; prefix: string; legend: string; options: readonly string[]; value?: string; set: (v: string) => void };

function Choices({ c }: { c: Choice }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{c.legend}</legend>
      <div className={styles.seg}>
        {c.options.map((o, i) => (
          <span key={o} className={styles.opt}>
            <input type="radio" name={c.name} id={`${c.prefix}-${i}`} checked={c.value === o} onChange={() => c.set(o)} />
            <label htmlFor={`${c.prefix}-${i}`}>{o}</label>
          </span>
        ))}
      </div>
    </fieldset>
  );
}

// Solicitud de revisión con calificación breve: escuela privada, municipio, losa de concreto, superficie y goteras.
// El director ve el mensaje antes de enviarlo; si falta una respuesta, se indica cuál y no se abre WhatsApp.
export function Valuation() {
  const [school, setSchool] = useState("");
  const [who, setWho] = useState("");
  const [schoolType, setSchoolType] = useState<string>();
  const [municipality, setMunicipality] = useState<string>();
  const [roof, setRoof] = useState<string>();
  const [size, setSize] = useState<string>();
  const [active, setActive] = useState<string>();
  const [tried, setTried] = useState(false);
  const errRef = useRef<HTMLDivElement>(null);

  const input = { school: school.trim(), who: who.trim(), schoolType, municipality, roof, size, active };
  const message = buildValuationMessage(input);
  const missing = missingAnswers(input);
  const outOfScope = isOutOfScope(input);

  const choices: Choice[] = [
    { name: "imp-type", prefix: "imp-t", legend: "La escuela es", options: valuation.schoolTypes, value: schoolType, set: setSchoolType },
    { name: "imp-mun", prefix: "imp-m", legend: "¿Dónde está?", options: valuation.municipalities, value: municipality, set: setMunicipality },
    { name: "imp-roof", prefix: "imp-r", legend: "Tipo de azotea", options: valuation.roofs, value: roof, set: setRoof },
    { name: "imp-size", prefix: "imp-z", legend: "Superficie aproximada de la azotea", options: valuation.sizes, value: size, set: setSize },
    { name: "imp-active", prefix: "imp-a", legend: "¿Hay goteras?", options: valuation.active, value: active, set: setActive },
  ];

  const onSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (missing.length) {
      e.preventDefault();
      setTried(true);
      requestAnimationFrame(() => errRef.current?.focus());
      return;
    }
    trackWhatsappClick("valoracion");
  };

  return (
    <section id="valoracion" className={`${styles.valuation} ${styles.granule}`} aria-labelledby="imp-valoracion">
      <form className={styles.label} onSubmit={(e) => e.preventDefault()} noValidate>
        <div>
          <div className={styles.lhead}>
            <Image src="/imperpre/fita-emblema-negro-sobre-blanco.png" alt="" width={96} height={96} />
            <span>
              Imperpre
              <br />
              Operado por FITA
            </span>
          </div>
          <h2 id="imp-valoracion" className={styles.h2}>
            {valuation.title}
          </h2>
          <p className={styles.lead} style={{ marginBottom: 24 }}>
            {valuation.intro}
          </p>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="imp-school">Escuela</label>
              <input
                id="imp-school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                autoComplete="organization"
                placeholder="Nombre del plantel"
                aria-invalid={tried && !school.trim() ? true : undefined}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="imp-who">
                Tu nombre y cargo <small className={styles.optional}>(opcional)</small>
              </label>
              <input id="imp-who" value={who} onChange={(e) => setWho(e.target.value)} autoComplete="name" placeholder="Ej. directora administrativa" />
            </div>
          </div>

          {choices.map((c) => (
            <Choices key={c.name} c={c} />
          ))}

          {outOfScope && (
            <p className={styles.scopeNote} role="status">
              {valuation.outOfScope}
            </p>
          )}

          <div className={styles.incentive}>
            <h3>{valuation.incentiveTitle}</h3>
            <p>{valuation.incentive}</p>
          </div>
        </div>

        <div className={styles.preview}>
          <h3>Mensaje que se enviará por WhatsApp</h3>
          <div className={styles.msg} aria-live="polite">
            {message}
          </div>
          {tried && missing.length > 0 && (
            <div className={styles.formError} role="alert" tabIndex={-1} ref={errRef}>
              <p>{valuation.missing}</p>
              <ul>
                {missing.map((m) => (
                  <li key={m.id}>
                    <a href={`#${m.id}`}>{m.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <a className={styles.btn} href={valuationUrl(message)} target="_blank" rel="noopener noreferrer" onClick={onSend}>
            <WhatsappIcon />
            {valuation.cta}
          </a>
          <small className={styles.fine}>{valuation.fine}</small>
          <p className={styles.direct}>
            ¿Prefieres llamar o escribir un correo? <a href={`tel:${contactPhone.replace(/\s/g, "")}`}>{contactPhone}</a> ·{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
      </form>
    </section>
  );
}
