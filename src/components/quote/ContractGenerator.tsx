import { Card, CardContent } from '@/components/ui/card';
import { Quotation } from '@/types/quote';
import html2pdf from 'html2pdf.js';

interface ContractGeneratorProps {
  quotation: Quotation;
}

export function ContractGenerator({ quotation }: ContractGeneratorProps) {
  const generateContract = () => {
    const element = document.getElementById('contract-document');
    if (!element) {
      console.error('Contract document not found');
      return;
    }
    
    // Temporarily show the element for PDF generation
    element.classList.remove('hidden');
    
    const opt = {
      margin: 0.5,
      filename: `contract-${quotation.quoteNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Hide the element again after PDF generation
      element.classList.add('hidden');
    });
  };

  return (
    <div className="contract-generator" ref={(ref) => { if (ref) (ref as any).generateContract = generateContract; }}>
      <Card id="contract-document" className="bg-white shadow-float border print:shadow-none print:border-0 hidden">
        <CardContent className="p-8 print:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">WEBSITE DEVELOPMENT CONTRACT</h1>
            <p className="text-lg text-muted-foreground">Build IT - Professional Website Solutions</p>
            <p className="text-sm text-muted-foreground mt-2">Contract #: {quotation.quoteNumber}</p>
          </div>

          {/* Parties */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">PARTIES TO THE AGREEMENT</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Service Provider:</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium">Build IT</p>
                  <p className="text-sm text-muted-foreground">Professional Website Solutions</p>
                  <p className="text-sm text-muted-foreground">Email: info@buildit.com</p>
                  <p className="text-sm text-muted-foreground">Phone: +254 7XX XXX XXX</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Client:</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium">{quotation.client.fullName}</p>
                  {quotation.client.companyName && (
                    <p className="text-sm text-muted-foreground">{quotation.client.companyName}</p>
                  )}
                  {quotation.client.email && (
                    <p className="text-sm text-muted-foreground">{quotation.client.email}</p>
                  )}
                  {quotation.client.phoneNumber && (
                    <p className="text-sm text-muted-foreground">{quotation.client.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">PROJECT DETAILS</h2>
            <div className="bg-muted/20 p-6 rounded-lg">
              <div className="grid gap-4">
                <div>
                  <span className="font-medium">Website Type:</span> {quotation.calculation.websiteType?.name}
                </div>
                {quotation.calculation.addOns.length > 0 && (
                  <div>
                    <span className="font-medium">Additional Features:</span>
                    <ul className="mt-2 ml-4 list-disc">
                      {quotation.calculation.addOns.map((addon) => (
                        <li key={addon.id}>{addon.name} - {addon.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {quotation.calculation.hostingPlan && (
                  <div>
                    <span className="font-medium">Hosting Plan:</span> {quotation.calculation.hostingPlan.name}
                  </div>
                )}
                <div>
                  <span className="font-medium">Project Timeline:</span> {quotation.calculation.urgencyLevel?.name}
                </div>
                <div>
                  <span className="font-medium">Service Type:</span> {quotation.calculation.builderType?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Terms */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">FINANCIAL TERMS</h2>
            <div className="bg-gradient-primary/5 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Project Cost:</span>
                  <span className="font-bold text-primary">KES {Math.round(quotation.calculation.total).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit Required (50%):</span>
                  <span className="font-bold">KES {Math.round(quotation.calculation.total * 0.5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Payment:</span>
                  <span className="font-bold">KES {Math.round(quotation.calculation.total * 0.5).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">TERMS AND CONDITIONS</h2>
            <div className="space-y-4 text-sm">
              
              <div>
                <h3 className="font-semibold mb-2">1. PAYMENT TERMS</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>50% deposit is required before project commencement</li>
                  <li>Remaining 50% due upon project completion and client approval</li>
                  <li>All payments are non-refundable once work has commenced</li>
                  <li>Late payments may incur additional charges</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. PROJECT DELIVERY</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Timeline is subject to client providing necessary content and feedback</li>
                  <li>Project includes up to 3 rounds of revisions</li>
                  <li>Additional revisions beyond scope may incur extra charges</li>
                  <li>Client must provide all content, images, and materials required</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. INTELLECTUAL PROPERTY</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Upon full payment, client owns the website and its content</li>
                  <li>Build IT retains the right to use project for portfolio purposes</li>
                  <li>Third-party assets are subject to their respective licenses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. SUPPORT AND MAINTENANCE</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>30 days of free technical support included</li>
                  <li>Hosting and maintenance packages available separately</li>
                  <li>Emergency support available at additional cost</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. LIMITATION OF LIABILITY</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Build IT's liability is limited to the contract value</li>
                  <li>Client is responsible for content accuracy and legality</li>
                  <li>Force majeure events may affect delivery timelines</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. TERMINATION</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Either party may terminate with 7 days written notice</li>
                  <li>Client pays for work completed up to termination date</li>
                  <li>All deliverables remain property of Build IT until full payment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold mb-6">AGREEMENT ACCEPTANCE</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Client Signature:</h3>
                <div className="border-b-2 border-gray-300 h-16 mb-2"></div>
                <p className="text-sm">Name: {quotation.client.fullName}</p>
                <p className="text-sm">Date: _________________</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Build IT Representative:</h3>
                <div className="border-b-2 border-gray-300 h-16 mb-2"></div>
                <p className="text-sm">Name: _________________</p>
                <p className="text-sm">Date: _________________</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>This contract is governed by the laws of Kenya.</p>
            <p>Any disputes shall be resolved through mediation or arbitration.</p>
            <p className="mt-4">Build IT - Professional Website Solutions | Contract #{quotation.quoteNumber}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}