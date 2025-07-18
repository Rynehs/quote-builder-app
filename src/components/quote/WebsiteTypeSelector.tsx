import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Laptop, ShoppingCart, BookOpen, GraduationCap } from 'lucide-react';
import { websiteTypes } from '@/data/quoteOptions';
import { cn } from '@/lib/utils';

interface WebsiteTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const icons = {
  landing: Laptop,
  business: Globe,
  ecommerce: ShoppingCart,
  blog: BookOpen,
  lms: GraduationCap,
};

export function WebsiteTypeSelector({ value, onChange }: WebsiteTypeSelectorProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Select Website Type</CardTitle>
        <p className="text-sm text-muted-foreground">Choose the type of website you need</p>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {websiteTypes.map((type) => {
            const Icon = icons[type.id as keyof typeof icons];
            return (
              <div
                key={type.id}
                onClick={() => onChange(type.id)}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                  value === type.id
                    ? "border-primary bg-primary/5 shadow-button"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={cn(
                    "p-3 rounded-full",
                    value === type.id ? "bg-gradient-primary text-white" : "bg-muted"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{type.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      KES {type.price.toLocaleString()}
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