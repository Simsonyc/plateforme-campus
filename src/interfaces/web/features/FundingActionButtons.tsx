'use client';

import { useState } from 'react';
import { approveFunding, rejectFunding, submitFunding } from './FundingActions';

export default function FundingActionButtons({ fundingId, status, amountRequested }: { fundingId: string; status: string; amountRequested: string }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [amount, setAmount] = useState(amountRequested);

  async function handleSubmit() {
    await submitFunding(fundingId);
    setCurrentStatus('submitted');
  }

  async function handleApprove() {
    await approveFunding(fundingId, amount);
    setCurrentStatus('approved');
  }

  async function handleReject() {
    await rejectFunding(fundingId);
    setCurrentStatus('rejected');
  }

  if (currentStatus === 'draft') {
    return (
      <button onClick={handleSubmit}
        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>
        📤 Soumettre
      </button>
    );
  }

  if (currentStatus === 'submitted' || currentStatus === 'under_review') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '0.3rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.8rem', width: '100px' }} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleApprove}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>
            ✓ Approuver
          </button>
          <button onClick={handleReject}
            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>
            ✗ Refuser
          </button>
        </div>
      </div>
    );
  }

  if (currentStatus === 'approved') {
    return <span style={{ background: '#dcfce7', color: '#166534', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✓ Approuvé — {amount} €</span>;
  }

  if (currentStatus === 'rejected') {
    return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✗ Refusé</span>;
  }

  return null;
}