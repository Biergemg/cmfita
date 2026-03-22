import { describe, expect, it } from 'vitest';

import { contactFormSchema } from '@/lib/contact';

describe('contactFormSchema', () => {
  it('accepts valid payloads', () => {
    const result = contactFormSchema.safeParse({
      name: 'Jane Doe',
      company: 'Acme Industrial',
      email: 'jane@example.com',
      phone: '+52 833 000 0000',
      projectType: 'rfq',
      message: 'Need a technical proposal for structural work in Tamaulipas.',
      budget: '$100k - $250k',
      timeline: '30 days',
      location: 'Ciudad Madero',
      locale: 'es',
      website: '',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid payloads', () => {
    const result = contactFormSchema.safeParse({
      name: 'A',
      company: '',
      email: 'bad-email',
      phone: '1',
      projectType: '',
      message: 'short',
      locale: 'es',
      website: 'spam',
    });

    expect(result.success).toBe(false);
  });
});
