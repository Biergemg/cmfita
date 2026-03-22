import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: vi.fn().mockResolvedValue({ id: 'email_123' }) };
  },
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.RESEND_API_KEY = 'test';
    process.env.CONTACT_TO_EMAIL = 'to@example.com';
    process.env.CONTACT_FROM_EMAIL = 'from@example.com';
  });

  it('returns 400 on invalid payload', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ locale: 'es' }),
      headers: { 'content-type': 'application/json' },
    }));

    expect(response.status).toBe(400);
  });

  it('returns 200 on valid payload', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
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
      }),
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1' },
    }));

    expect(response.status).toBe(200);
  });
});
