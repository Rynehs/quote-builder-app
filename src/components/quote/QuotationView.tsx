import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Mail, FileText } from 'lucide-react';
import { Quotation } from '@/types/quote';
import { ContractGenerator } from './ContractGenerator';
import html2pdf from 'html2pdf.js';

interface QuotationViewProps {
  quotation: Quotation;
  onBack: () => void;
}

export function QuotationView({ quotation, onBack }: QuotationViewProps) {
  const handleDownloadPDF = () => {
    const element = document.getElementById('quotation-document');
    const opt = {
      margin: 0.5,
      filename: `quotation-${quotation.quoteNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleSendEmail = () => {
    // Implementation for email sending would go here
    console.log('Send email functionality to be implemented');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateContract = () => {
    const element = document.getElementById('contract-document');
    const opt = {
      margin: 0.5,
      filename: `contract-${quotation.quoteNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Action Buttons - No Print */}
        <div className="flex flex-wrap gap-4 print:hidden">
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Calculator
          </Button>
          <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Print Quotation
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handleSendEmail} variant="professional" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send to Email
          </Button>
          <Button onClick={handleGenerateContract} variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Contract
          </Button>
        </div>

        {/* Quotation Document */}
        <Card id="quotation-document" className="bg-white shadow-float border print:shadow-none print:border-0">
          <CardContent className="p-8 print:p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src="public/logo.png" 
                    alt="Build IT Logo" 
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-primary">Build IT</h1>
                    <p className="text-sm text-muted-foreground">Professional Website Solutions</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Email: info@buildit.com</p>
                  <p>Phone: +254 7XX XXX XXX</p>
                  <p>Website: www.buildit.com</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-foreground mb-2">QUOTATION</h2>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Quote #:</span> {quotation.quoteNumber}</p>
                  <p><span className="font-medium">Date:</span> {quotation.date}</p>
                  <p><span className="font-medium">Valid Until:</span> {quotation.validUntil}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Client Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium text-foreground">{quotation.client.fullName}</p>
                {quotation.client.companyName && (
                  <p className="text-muted-foreground">{quotation.client.companyName}</p>
                )}
                {quotation.client.email && (
                  <p className="text-muted-foreground">{quotation.client.email}</p>
                )}
                {quotation.client.phoneNumber && (
                  <p className="text-muted-foreground">{quotation.client.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Services Breakdown */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Services & Pricing:</h3>
              <div className="space-y-4">
                {/* Website Type */}
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <p className="font-medium">{quotation.calculation.websiteType?.name}</p>
                    <p className="text-sm text-muted-foreground">Base website development</p>
                  </div>
                  <p className="font-medium">KES {quotation.calculation.breakdown.basePrice.toLocaleString()}</p>
                </div>

                {/* Add-ons */}
                {quotation.calculation.addOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">{addon.name}</p>
                      <p className="text-sm text-muted-foreground">Additional feature</p>
                    </div>
                    <p className="font-medium">KES {addon.price.toLocaleString()}</p>
                  </div>
                ))}

                {/* Hosting */}
                {quotation.calculation.breakdown.hostingCost > 0 && (
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">{quotation.calculation.hostingPlan?.name}</p>
                      <p className="text-sm text-muted-foreground">Hosting and domain services</p>
                    </div>
                    <p className="font-medium">KES {quotation.calculation.breakdown.hostingCost.toLocaleString()}</p>
                  </div>
                )}

                {/* Urgency Markup */}
                {quotation.calculation.breakdown.urgencyMarkup > 0 && (
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Urgency Markup</p>
                      <p className="text-sm text-muted-foreground">{quotation.calculation.urgencyLevel?.name}</p>
                    </div>
                    <p className="font-medium text-orange-600">+KES {quotation.calculation.breakdown.urgencyMarkup.toLocaleString()}</p>
                  </div>
                )}

                {/* Agency Markup */}
                {quotation.calculation.breakdown.agencyMarkup > 0 && (
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium">Agency Service Fee</p>
                      <p className="text-sm text-muted-foreground">Professional agency services</p>
                    </div>
                    <p className="font-medium text-blue-600">+KES {quotation.calculation.breakdown.agencyMarkup.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-primary/5 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-sm text-muted-foreground">All prices in Kenyan Shillings (KES)</p>
                </div>
                <p className="text-3xl font-bold text-primary">
                  KES {Math.round(quotation.calculation.total).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Terms & Notes */}
            <div className="mt-8 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>50% deposit required to commence project</li>
                  <li>Final payment due upon project completion</li>
                  <li>Timeline subject to content and feedback provision</li>
                  <li>Quote valid for 14 days from issue date</li>
                  <li>Additional revisions may incur extra charges</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Notes:</h4>
                <p className="text-sm text-muted-foreground">
                  This quotation is based on the specifications discussed. Any additional requirements 
                  or changes to the scope may affect the final price. We appreciate your business and 
                  look forward to working with you.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Thank you for choosing Build IT for your website development needs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hidden Contract Document */}
        <ContractGenerator quotation={quotation} />
      </div>
    </div>
  );
}
