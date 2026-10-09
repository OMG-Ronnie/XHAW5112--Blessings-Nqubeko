import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ACTIVITIES, Activity } from '../data/activities';
import { applyDiscount } from '../theme';

export interface CartLine {
  activity: Activity;
  bookings: number;
}

interface BookingContextValue {
  lines: CartLine[];
  distinctCount: number;
  totalBookings: number;
  subtotal: number;
  discountRate: number | null;
  discountAmount: number;
  total: number;
  addActivity: (activityId: string, bookings: number) => void;
  removeLine: (activityId: string) => void;
  setBookings: (activityId: string, bookings: number) => void;
  clear: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addActivity = useCallback((activityId: string, bookings: number) => {
    const activity = ACTIVITIES.find((a) => a.id === activityId);
    if (!activity) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.activity.id === activityId);
      if (existing) {
        return prev.map((l) =>
          l.activity.id === activityId ? { ...l, bookings: l.bookings + bookings } : l,
        );
      }
      return [...prev, { activity, bookings }];
    });
  }, []);

  const removeLine = useCallback((activityId: string) => {
    setLines((prev) => prev.filter((l) => l.activity.id !== activityId));
  }, []);

  const setBookings = useCallback((activityId: string, bookings: number) => {
    setLines((prev) =>
      bookings <= 0
        ? prev.filter((l) => l.activity.id !== activityId)
        : prev.map((l) => (l.activity.id === activityId ? { ...l, bookings } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<BookingContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.activity.fee * l.bookings, 0);
    const totalBookings = lines.reduce((sum, l) => sum + l.bookings, 0);
    const distinctCount = lines.length;
    const { discount, rate } = applyDiscount(subtotal, distinctCount);
    return {
      lines,
      distinctCount,
      totalBookings,
      subtotal,
      discountRate: rate,
      discountAmount: discount,
      total: subtotal - discount,
      addActivity,
      removeLine,
      setBookings,
      clear,
    };
  }, [lines, addActivity, removeLine, setBookings, clear]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = (): BookingContextValue => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
};
