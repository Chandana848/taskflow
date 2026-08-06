'use client';

import { useState } from 'react';
import { Button, Switch, Card, CardHeader, CardBody } from '@/components/ui';

export function SecuritySettings() {
  const [require2FA, setRequire2FA] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <h3 className="font-bold text-lg">Authentication & Session Security</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Switch
            checked={require2FA}
            onChange={setRequire2FA}
            label="Enforce Two-Factor Authentication (2FA) for all workspace members"
          />
          <Switch
            checked={ipWhitelist}
            onChange={setIpWhitelist}
            label="Restrict workspace access to designated corporate IP addresses"
          />
          <div className="pt-2">
            <Button variant="outline">Download Security Audit Report</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
