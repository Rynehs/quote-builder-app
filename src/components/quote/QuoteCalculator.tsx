import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import { WebsiteTypeSelector } from './WebsiteTypeSelector';
import { AddOnsSelector } from './AddOnsSelector';
import { HostingSelector } from './HostingSelector';
import { UrgencySelector } from './UrgencySelector';
import { BuilderSelector } from './BuilderSelector';
import { CostBreakdown } from './CostBreakdown';
import { QuoteCalculation } from '@/types/quote';
import { websiteTypes, addOns, hostingPlans, urgencyLevels, builderTypes } from '@/data/quoteOptions';

interface QuoteCalculatorProps {
  onGenerateQuote: (calculation: QuoteCalculation) => void;
}

export function QuoteCalculator({ onGenerateQuote }: QuoteCalculatorProps) {
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedHosting, setSelectedHosting] = useState<string>('none');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('flexible');
  const [selectedBuilder, setSelectedBuilder] = useState<string>('freelancer');

  const calculateTotal = () => {
    const websiteType = websiteTypes.find(w => w.id === selectedWebsiteType);
    const selectedAddOnObjects = addOns.filter(addon => selectedAddOns.includes(addon.id));
    const hostingPlan = hostingPlans.find(h => h.id === selectedHosting);
    const urgencyLevel = urgencyLevels.find(u => u.id === selectedUrgency);
    const builderType = builderTypes.find(b => b.id === selectedBuilder);

    if (!websiteType || !hostingPlan || !urgencyLevel || !builderType) {
      return null;
    }

    const basePrice = websiteType.price;
    const addOnsTotal = selectedAddOnObjects.reduce((sum, addon) => sum + addon.price, 0);
    const hostingCost = hostingPlan.price;
    
    const subtotal = basePrice + addOnsTotal + hostingCost;
    const urgencyMarkup = subtotal * (urgencyLevel.multiplier - 1);
    const afterUrgency = subtotal + urgencyMarkup;
    const agencyMarkup = afterUrgency * (builderType.multiplier - 1);
    const total = afterUrgency + agencyMarkup;

    return {
      websiteType,
      addOns: selectedAddOnObjects,
      hostingPlan,
      urgencyLevel,
      builderType,
      total,
      breakdown: {
        basePrice,
        addOnsTotal,
        hostingCost,
        urgencyMarkup,
        agencyMarkup,
      }
    };
  };

  const calculation = calculateTotal();

  const handleGenerateQuote = () => {
    if (calculation) {
      onGenerateQuote(calculation);
    }
  };

  const isComplete = selectedWebsiteType && selectedHosting && selectedUrgency && selectedBuilder;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-lg shadow-button">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                UPPERCASE WEB
              </h1>
              <p className="text-sm text-muted-foreground">Professional Website Solutions</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Website Quote Calculator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get an instant quote for your website project. Select your requirements below and see the cost breakdown in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Selections */}
          <div className="lg:col-span-2 space-y-6">
            <WebsiteTypeSelector
              value={selectedWebsiteType}
              onChange={setSelectedWebsiteType}
            />

            <AddOnsSelector
              values={selectedAddOns}
              onChange={setSelectedAddOns}
            />

            <HostingSelector
              value={selectedHosting}
              onChange={setSelectedHosting}
            />

            <UrgencySelector
              value={selectedUrgency}
              onChange={setSelectedUrgency}
            />

            <BuilderSelector
              value={selectedBuilder}
              onChange={setSelectedBuilder}
            />
          </div>

          {/* Right Column - Cost Breakdown */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card border-0 sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {calculation ? (
                  <>
                    <CostBreakdown calculation={calculation} />
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleGenerateQuote}
                        variant="professional"
                        size="lg"
                        className="w-full"
                        disabled={!isComplete}
                      >
                        Generate Quotation
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Select a website type to see pricing
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="bg-gradient-card shadow-card border-0">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedWebsiteType ? "default" : "secondary"} className="text-xs">
                      {selectedWebsiteType ? "✓" : "1"}
                    </Badge>
                    <span className="text-sm">Website Type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">✓</Badge>
                    <span className="text-sm">Add-ons (Optional)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">✓</Badge>
                    <span className="text-sm">Hosting Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">✓</Badge>
                    <span className="text-sm">Urgency Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">✓</Badge>
                    <span className="text-sm">Builder Type</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}