"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { buildValuationMessage, valuation, valuationUrl } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { trackWhatsappClick } from "@/lib/analytics";
import { contactEmail, contactPhone } from "@/lib/site";

// Solicitud de revisión: solo lo necesario para iniciar la conversación. El director ve el mensaje antes de enviarlo.
export function Valuation() {
  const [school, setSchool] = useState("");
  const [who, setWho] = useState("");
  const [municipality, setMunicipality] = useState<string>();
  const [active, setActive] = useState<string>();

  const message = useMemo(
    () => buildValuationMessage({ school: school.trim(), who: who.trim(), municipality, active }),
    [school, who, municipality, active],
  );

  return (
    <section id="valoracion" className={`${styles.valuation} ${styles.granule}`} aria-labelledby="imp-valoracion">
      <form className={styles.label} onSubmit={(e) => e.preventDefault()}>
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
              <input id="imp-school" value={school} onChange={(e) => setSchool(e.target.value)} autoComplete="organization" placeholder="Nombre del plantel" />
            </div>
            <div className={styles.field}>
              <label htmlFor="imp-who">Tu nombre y cargo</label>
              <input id="imp-who" value={who} onChange={(e) => setWho(e.target.value)} autoComplete="name" placeholder="Ej. directora administrativa" />
            </div>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>¿Dónde está la escuela?</legend>
            <div className={styles.seg}>
              {valuation.municipalities.map((m, i) => (
                <span key={m} className={styles.opt}>
                  <input type="radio" name="imp-mun" id={`imp-m-${i}`} checked={municipality === m} onChange={() => setMunicipality(m)} />
                  <label htmlFor={`imp-m-${i}`}>{m}</label>
                </span>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              ¿Hay goteras ahora? <small>(opcional)</small>
            </legend>
            <div className={styles.seg}>
              {valuation.active.map((s, i) => (
                <span key={s} className={styles.opt}>
                  <input type="radio" name="imp-active" id={`imp-a-${i}`} checked={active === s} onChange={() => setActive(s)} />
                  <label htmlFor={`imp-a-${i}`}>{s}</label>
                </span>
              ))}
            </div>
          </fieldset>

          <div className={styles.incentive}>
            <h3>{valuation.incentiveTitle}</h3>
            <p>{valuation.incentive}</p>
          </div>
        </div>

        <div className={styles.preview} aria-live="polite">
          <h3>Mensaje que se enviará por WhatsApp</h3>
          <div className={styles.msg}>{message}</div>
          <a className={styles.btn} href={valuationUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsappClick("valoracion")}>
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
