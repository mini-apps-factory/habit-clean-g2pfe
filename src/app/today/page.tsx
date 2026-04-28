```typescript
'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
}

export default function TodayPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Habit[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems([
        { id: '1', name: 'Morning meditation', streak: 12, completed: false },
        { id: '2', name: 'Read 30 minutes', streak: 5, completed: true },
        { id: '3', name: 'Exercise', streak: 8, completed: false },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleHabit = (id: string) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light');
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed, streak: item.completed ? item.streak - 1 : item.streak + 1 }
          : item
      )
    );
  };

  return (
    <AppShell>
      <Header title="Today's Habits" />
      <div className="p-4" style={{ backgroundColor: '#F8F4E9', minHeight: '100vh' }}>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="No habits yet" description="Start building your habits today" />
        ) : (
          <div className="space-y-3">
            {items.map((habit) => (
              <Card key={habit.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: '#1A1A1A' }}>
                      {habit.name}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: '#2D7D6E' }}>
                      🔥 {habit.streak} day streak
                    </p>
                  </div>
                  <Button
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`rounded-full w-12 h-12 flex items-center justify-center transition-all ${
                      habit.completed ? 'bg-brand-primary' : 'bg-gray-200'
                    }`}
                    style={habit.completed ? { backgroundColor: '#2D7D6E' } : {}}
                  >
                    <span className="text-xl">{habit.completed ? '✓' : '○'}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
```