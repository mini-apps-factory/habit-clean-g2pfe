```typescript
'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  completions: number;
  streak: number;
  lastCompleted?: string;
}

export default function HabitsListPage() {
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddingHabit, setIsAddingHabit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleHaptic = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light');
  };

  const handleAddHabit = () => {
    handleHaptic();
    setIsAddingHabit(true);
  };

  const handleDeleteHabit = (id: string) => {
    handleHaptic();
    setHabits(habits.filter(h => h.id !== id));
  };

  const handleCompleteHabit = (id: string) => {
    handleHaptic();
    setHabits(habits.map(h =>
      h.id === id
        ? {
            ...h,
            completions: h.completions + 1,
            streak: h.streak + 1,
            lastCompleted: new Date().toISOString(),
          }
        : h
    ));
  };

  return (
    <AppShell>
      <Header
        title="My Habits"
        subtitle="Build consistency, one day at a time"
      />

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        ) : habits.length === 0 ? (
          <EmptyState
            title="No habits yet"
            description="Start building better habits. Every journey begins with a single step."
            icon="🌱"
          />
        ) : (
          <>
            {habits.map(habit => (
              <Card key={habit.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {habit.name}
                      </h3>
                      {habit.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {habit.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Streak</p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: '#2D7D6E' }}
                      >
                        {habit.streak} days
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Total</p>
                      <p className="text-lg font-bold text-gray-700">
                        {habit.completions}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Frequency</p>
                      <p className="text-sm font-medium text-gray-700 capitalize">
                        {habit.frequency}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleCompleteHabit(habit.id)}
                    className="w-full bg-brand-primary text-white hover:opacity-90"
                  >
                    Mark Complete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleAddHabit}
          className="rounded-full w-14 h-14 bg-brand-primary text-white flex items-center justify-center text-xl shadow-lg hover:shadow-xl"
        >
          +
        </Button>
      </div>
    </AppShell>
  );
}
```