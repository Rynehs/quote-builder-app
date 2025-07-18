import { useState } from 'react';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { QuotationForm } from '@/components/quote/QuotationForm';
import { QuotationView } from '@/components/quote/QuotationView';
import { QuoteCalculation, Quotation } from '@/types/quote';

type PageStep = 'calculator' | 'form' | 'quotation';

export default function QuoteCalculatorPage() {
  const [currentStep, setCurrentStep] = useState<PageStep>('calculator');
  const [calculation, setCalculation] = useState<QuoteCalculation | null>(null);
  const [quotation, setQuotation] = useState<Quotation | null>(null);

  const handleGenerateQuote = (calc: QuoteCalculation) => {
    setCalculation(calc);
    setCurrentStep('form');
  };

  const handleFormSubmit = (quote: Quotation) => {
    setQuotation(quote);
    setCurrentStep('quotation');
  };

  const handleBackToCalculator = () => {
    setCurrentStep('calculator');
    setCalculation(null);
    setQuotation(null);
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setQuotation(null);
  };

  if (currentStep === 'calculator') {
    return <QuoteCalculator onGenerateQuote={handleGenerateQuote} />;
  }

  if (currentStep === 'form' && calculation) {
    return (
      <QuotationForm
        calculation={calculation}
        onBack={handleBackToCalculator}
        onSubmit={handleFormSubmit}
      />
    );
  }

  if (currentStep === 'quotation' && quotation) {
    return (
      <QuotationView
        quotation={quotation}
        onBack={handleBackToCalculator}
      />
    );
  }

  return null;
}