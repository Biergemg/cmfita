import { beforeEach, describe, expect, it, vi } from 'vitest';

import { trackContactFormSubmitted } from '@/lib/analytics';

describe('analytics helpers', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    window.gtag = undefined;
  });

  it('does not throw when GA is unavailable', () => {
    expect(() => trackContactFormSubmitted('rfq')).not.toThrow();
  });
});
