import { QuoteCalculation } from '@/types/quote';

interface CostBreakdownProps {
  calculation: QuoteCalculation;
}

export function CostBreakdown({ calculation }: CostBreakdownProps) {
  const { breakdown, total } = calculation;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Base Website Cost:</span>
        <span className="font-medium">KES {breakdown.basePrice.toLocaleString()}</span>
      </div>
      
      {breakdown.addOnsTotal > 0 && (
        <div className="flex justify-between text-sm">
          <span>Add-ons Total:</span>
          <span className="font-medium">KES {breakdown.addOnsTotal.toLocaleString()}</span>
        </div>
      )}
      
      {breakdown.hostingCost > 0 && (
        <div className="flex justify-between text-sm">
          <span>Hosting Cost:</span>
          <span className="font-medium">KES {breakdown.hostingCost.toLocaleString()}</span>
        </div>
      )}
      
      {breakdown.urgencyMarkup > 0 && (
        <div className="flex justify-between text-sm text-orange-600">
          <span>Urgency Markup:</span>
          <span className="font-medium">+KES {breakdown.urgencyMarkup.toLocaleString()}</span>
        </div>
      )}
      
      {breakdown.agencyMarkup > 0 && (
        <div className="flex justify-between text-sm text-blue-600">
          <span>Agency Markup:</span>
          <span className="font-medium">+KES {breakdown.agencyMarkup.toLocaleString()}</span>
        </div>
      )}
      
      <div className="border-t pt-3">
        <div className="flex justify-between text-lg font-bold">
          <span>Estimated Total:</span>
          <span className="text-primary">KES {Math.round(total).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}