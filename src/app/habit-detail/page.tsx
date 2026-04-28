```typescript
'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface Completion {
  date: string;
  completed: boolean;
}

interface Habit {
  id: string;
  name: string;
  notes: string;
  streak: number;
  completions: Completion[];
}

export default function HabitDetailPage() {
  const [loading, setLoading] = useState(true);
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockHabit: Habit = {
        id: '1',
        name: 'Morning Meditation',
        notes: 'Start your day with calm',
        streak: 12,
        completions: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
          completed: Math.random() > 0.3,
        })),
      };
      setHabit(mockHabit);
      setEditName(mockHabit.name);
      setEditNotes(mockHabit.notes);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTaptic = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light');
  };

  const handleSaveEdit = () => {
    handleTaptic();
    if (habit) {
      setHabit({ ...habit, name: editName, notes: editNotes });
      setIsEditing(false);
    }
  };

  const handleToggleCompletion = (date: string) => {
    handleTaptic();
    if (habit) {
      const updated = habit.completions.map((c) =>
        c.date === date ? { ...c, completed: !c.completed } : c
      );
      setHabit({ ...habit, completions: updated });
    }
  };

  if (loading) {
    return (
      <AppShell>
        <Header title="Loading..." />
        <div className="p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  if (!habit) {
    return (
      <AppShell>
        <Header title="Habit Detail" />
        <EmptyState title="No habit found" description="This habit could not be loaded." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Header title={habit.name} />
      <div className="p-4 space-y-6" style={{ backgroundColor: '#F8F4E9' }}>
        <Card>
          <CardContent className="pt-6">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Habit name"
                />
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Notes"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="bg-brand-primary flex-1">
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    {habit.name}
                  </h2>
                  <p className="text-sm text-gray-600">{habit.notes}</p>
                </div>
                <Button
                  onClick={() => {
                    handleTaptic();
                    setIsEditing(true);
                  }}
                  className="w-full bg-brand-primary"
                >
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold" style={{ color: '#2D7D6E' }}>
                {habit.streak}
              </div>
              <p className="text-gray-600">day streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              Last 30 days
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {habit.completions.map((completion) => (
                <button
                  key={completion.date}
                  onClick={() => handleToggleCompletion(completion.date)}
                  className="aspect-square rounded-lg transition-colors"
                  style={{
                    backgroundColor: completion.completed ? '#2D7D6E' : '#E8E3D6',
                  }}
                  aria-label={`${completion.date}: ${completion.completed ? 'completed' : 'not completed'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
```