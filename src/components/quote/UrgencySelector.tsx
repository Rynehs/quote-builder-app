import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Timer, Zap } from 'lucide-react';
import { urgencyLevels } from '@/data/quoteOptions';
import { cn } from '@/lib/utils';

interface UrgencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const icons = {
  flexible: Clock,
  fast: Timer,
  urgent: Zap,
};

export function UrgencySelector({ value, onChange }: UrgencySelectorProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Select Urgency</CardTitle>
        <p className="text-sm text-muted-foreground">How quickly do you need your website completed?</p>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-4">
          {urgencyLevels.map((level) => {
            const Icon = icons[level.id as keyof typeof icons];
            const markup = level.multiplier > 1 ? `+${Math.round((level.multiplier - 1) * 100)}%` : 'No change';
            
            return (
              <div
                key={level.id}
                onClick={() => onChange(level.id)}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                  value === level.id
                    ? "border-primary bg-primary/5 shadow-button"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={cn(
                    "p-3 rounded-full",
                    value === level.id ? "bg-gradient-primary text-white" : "bg-muted"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{level.name}</h3>
                    <Badge 
                      variant={level.multiplier > 1 ? "destructive" : "secondary"} 
                      className="mt-1"
                    >
                      {markup}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}