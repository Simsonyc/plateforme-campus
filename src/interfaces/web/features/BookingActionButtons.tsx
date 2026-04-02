'use client';

import { useState } from 'react';
import { approveBooking, rejectBooking } from './BookingActions';

export default function BookingActionButtons({ bookingId, status }: { bookingId: string; status: string }) {
  const [currentStatus, setCurrentStatus] = useState(status);

  async function handleApprove() {
    await approveBooking(bookingId);
    setCurrentStatus('approved');
  }

  async function handleReject() {
    await rejectBooking(bookingId);
    setCurrentStatus('rejected');
  }

  if (currentStatus === 'approved') {
    return <span style={{ background: '#dcfce7', color: '#166534', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✓ Approuvée</span>;
  }

  if (currentStatus === 'rejected') {
    return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500 }}>✗ Refusée</span>;
  }

  if (currentStatus === 'submitted') {
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

  return (
    <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.4rem 0.875rem', borderRadius: '8px', fontSize: '0.8rem' }}>
      {currentStatus}
    </span>
  );
}