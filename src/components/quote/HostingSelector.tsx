import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Globe, Shield } from 'lucide-react';
import { hostingPlans } from '@/data/quoteOptions';
import { cn } from '@/lib/utils';

interface HostingSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const icons = {
  none: Server,
  standard: Globe,
  premium: Shield,
};

export function HostingSelector({ value, onChange }: HostingSelectorProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Choose Hosting Plan</CardTitle>
        <p className="text-sm text-muted-foreground">Select your hosting and maintenance preferences</p>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-4">
          {hostingPlans.map((plan) => {
            const Icon = icons[plan.id as keyof typeof icons];
            return (
              <div
                key={plan.id}
                onClick={() => onChange(plan.id)}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                  value === plan.id
                    ? "border-primary bg-primary/5 shadow-button"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={cn(
                    "p-3 rounded-full",
                    value === plan.id ? "bg-gradient-primary text-white" : "bg-muted"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{plan.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {plan.price === 0 ? 'Free' : `KES ${plan.price.toLocaleString()}`}
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