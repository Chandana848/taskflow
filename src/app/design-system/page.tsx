'use client';

import { useState } from 'react';
import { Button, Input, Badge, Card, CardHeader, CardBody, Switch, Spinner } from '@/components/ui';

export default function DesignSystemPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Design System Primitives</h1>
        <p className="text-muted-foreground mt-1">Reusable, accessible component library for TaskFlow</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Buttons & Badges</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Blocked</Badge>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Inputs & Controls</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input label="Workspace Name" placeholder="Engineering" />
          <Switch checked={toggle} onChange={setToggle} label="Enable real-time notifications" />
          <Spinner />
        </CardBody>
      </Card>
    </div>
  );
}
