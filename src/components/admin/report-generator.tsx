'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttendanceInsightsAction } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type State = {
  success: boolean;
  insights?: string;
  error?: string;
};

export function ReportGenerator() {
  const [state, formAction, isPending] = useActionState<State, FormData>(getAttendanceInsightsAction, { success: false });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Attendance Insights</CardTitle>
          <CardDescription>
            Automatically generate insights on student attendance based on historical data.
            This tool helps flag patterns and potential issues for proactive intervention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Insights
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {state.error && !isPending && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && state.insights && !isPending && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-foreground">
              <p>{state.insights}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
