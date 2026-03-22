import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactForm } from '@/components/sections/ContactForm';

vi.mock('@/lib/analytics', () => ({
  trackContactFormFailed: vi.fn(),
  trackContactFormStarted: vi.fn(),
  trackContactFormSubmitted: vi.fn(),
  trackRfqSubmitted: vi.fn(),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
  });

  it('shows validation errors and success state', async () => {
    const user = userEvent.setup();
    render(<ContactForm locale="en" />);

    await user.click(screen.getByRole('button', { name: /send request/i }));
    expect((await screen.findAllByText(/Too small: expected string to have >=2 characters/i)).length).toBeGreaterThan(0);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/company/i), 'Acme Industrial');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone/i), '+52 833 000 0000');
    await user.selectOptions(screen.getByLabelText(/project type/i), 'rfq');
    await user.type(screen.getByLabelText(/estimated budget/i), '$100k - $250k');
    await user.type(screen.getByLabelText(/target timeline/i), '30 days');
    await user.type(screen.getByLabelText(/project location/i), 'Ciudad Madero');
    await user.type(screen.getByLabelText(/message/i), 'Need a technical proposal for structural work in Tamaulipas.');
    await user.click(screen.getByRole('button', { name: /send request/i }));

    expect(await screen.findByText(/received your request/i)).toBeInTheDocument();
  });
});
