'use client';

import { useState } from 'react';
import { approveMembership, rejectMembership } from './MembershipActions';

export default function MembershipActionButtons({ membershipId }: { membershipId: string }) {
  const [status, setStatus] = useState<'idle' | 'approved' | 'rejected'>('idle');

  async function handleApprove() {
    await approveMembership(membershipId);
    setStatus('approved');
  }

  async function handleReject() {
    await rejectMembership(membershipId);
    setStatus('rejected');
  }

  if (status === 'approved') {
    return <span style={{ background: '#dcfce7', color: '#166534', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✓ Approuvé</span>;
  }

  if (status === 'rejected') {
    return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✗ Refusé</span>;
  }

  return (
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
  );
}