'use client';

import { useState } from 'react';
import { Button, Input, Card, CardHeader, CardBody } from '@/components/ui';

export function ProfileSettings({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <h3 className="text-lg font-bold">Personal Profile</h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {saved && <div className="p-3 bg-success/10 text-success text-sm rounded-md">Profile updated!</div>}
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email Address" value={email} disabled />
          <Button type="submit">Save Changes</Button>
        </form>
      </CardBody>
    </Card>
  );
}
