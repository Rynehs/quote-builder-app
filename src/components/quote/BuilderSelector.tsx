import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Building } from 'lucide-react';
import { builderTypes } from '@/data/quoteOptions';
import { cn } from '@/lib/utils';

interface BuilderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const icons = {
  freelancer: User,
  agency: Building,
};

export function BuilderSelector({ value, onChange }: BuilderSelectorProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Who is building it?</CardTitle>
        <p className="text-sm text-muted-foreground">Choose between freelancer or agency services</p>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          {builderTypes.map((builder) => {
            const Icon = icons[builder.id as keyof typeof icons];
            const markup = builder.multiplier > 1 ? `+${Math.round((builder.multiplier - 1) * 100)}%` : 'No change';
            
            return (
              <div
                key={builder.id}
                onClick={() => onChange(builder.id)}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                  value === builder.id
                    ? "border-primary bg-primary/5 shadow-button"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={cn(
                    "p-3 rounded-full",
                    value === builder.id ? "bg-gradient-primary text-white" : "bg-muted"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{builder.name}</h3>
                    <Badge 
                      variant={builder.multiplier > 1 ? "destructive" : "secondary"} 
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