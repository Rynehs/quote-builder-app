import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Laptop, ShoppingCart, BookOpen, GraduationCap, Check, Target, Users } from 'lucide-react';
import { websiteTypes, addOns } from '@/data/quoteOptions';
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

        {value && (() => {
          const selectedType = websiteTypes.find(type => type.id === value);
          if (!selectedType) return null;
          
          return (
            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-2">Purpose</h4>
                      <p className="text-muted-foreground">{selectedType.purpose}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-3">What's Included</h4>
                      <ul className="space-y-2">
                        {selectedType.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-2">Perfect For</h4>
                      <p className="text-muted-foreground">{selectedType.clientFit}</p>
                    </div>
                  </div>

                  {selectedType.techOptions && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Tech Options</h4>
                      <p className="text-sm text-muted-foreground">{selectedType.techOptions}</p>
                    </div>
                  )}

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Recommended Add-ons</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedType.recommendedAddOns.map((addonId) => {
                        const addon = addOns.find(a => a.id === addonId);
                        return addon ? (
                          <Badge key={addonId} variant="outline" className="text-xs">
                            {addon.name} (+KES {addon.price.toLocaleString()})
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })()}
      </CardContent>
    </Card>
  );
}