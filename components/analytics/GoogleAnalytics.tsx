"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

import { ANALYTICS_CONSENT_KEY } from "@/components/analytics/CookieConsent";
import { GA_ID, pageview } from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      setEnabled(value === "granted");
    };

    syncConsent();
    window.addEventListener("analytics-consent-change", syncConsent);
    return () => window.removeEventListener("analytics-consent-change", syncConsent);
  }, []);

  const url = useMemo(() => {
    if (!pathname) return null;
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!enabled || !GA_ID || !url) return;
    pageview(url);
  }, [enabled, url]);

  if (!GA_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        id="ga-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
