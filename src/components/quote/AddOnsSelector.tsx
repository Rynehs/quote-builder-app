import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, MessageCircle, CreditCard, Palette, Share2, Code, Info } from 'lucide-react';
import { addOns } from '@/data/quoteOptions';

interface AddOnsSelectorProps {
  values: string[];
  onChange: (values: string[]) => void;
}

const icons = {
  seo: Search,
  whatsapp: MessageCircle,
  payment: CreditCard,
  logo: Palette,
  social: Share2,
  custom: Code,
};

export function AddOnsSelector({ values, onChange }: AddOnsSelectorProps) {
  const handleToggle = (addonId: string) => {
    if (values.includes(addonId)) {
      onChange(values.filter(id => id !== addonId));
    } else {
      onChange([...values, addonId]);
    }
  };

  return (
    <TooltipProvider>
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-xl">Select Add-ons</CardTitle>
          <p className="text-sm text-muted-foreground">Choose additional features for your website (optional)</p>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {addOns.map((addon) => {
              const Icon = icons[addon.id as keyof typeof icons];
              const isSelected = values.includes(addon.id);
              
              return (
                <div
                  key={addon.id}
                  onClick={() => handleToggle(addon.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-button"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <div className={`p-2 rounded-md ${
                      isSelected ? "bg-gradient-primary text-white" : "bg-muted"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{addon.name}</h3>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">{addon.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        KES {addon.price.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}