import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';
import { ArrowLeft, Loader2, ShieldAlert } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface RoleGuardProps {
  requiredRole: UserRole;
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ requiredRole, children }) => {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <p className="text-sm text-slate-500">Checking role authorization...</p>
      </div>
    );
  }

  if (role !== requiredRole) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200 shadow-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-2">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl text-red-900">Access Restricted</CardTitle>
            <CardDescription className="text-slate-600">
              Role-Based Access Control (RBAC) Enforced
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-slate-600">
              Your account is registered as a <span className="font-semibold text-navy-950 uppercase">[{role || 'student'}]</span>, but this module requires elevated <span className="font-semibold text-red-700 uppercase">[{requiredRole}]</span> privileges.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/dashboard">
                <Button variant="navy" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Student Portal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
