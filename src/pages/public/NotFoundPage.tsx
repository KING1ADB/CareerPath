import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="h-16 w-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200">
        <Compass className="h-10 w-10 animate-pulse" />
      </div>
      <h1 className="text-4xl font-extrabold text-navy-950">404</h1>
      <h2 className="text-xl font-semibold text-slate-800">Pathway Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm">
        The route you are navigating to does not exist or has been restructured in the CareerPath application.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="default">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
