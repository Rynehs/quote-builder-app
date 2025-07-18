import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, User, Mail, Building, Phone } from 'lucide-react';
import { QuoteCalculation, ClientInfo, Quotation } from '@/types/quote';

interface QuotationFormProps {
  calculation: QuoteCalculation;
  onBack: () => void;
  onSubmit: (quotation: Quotation) => void;
}

export function QuotationForm({ calculation, onBack, onSubmit }: QuotationFormProps) {
  const [formData, setFormData] = useState<ClientInfo>({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
  });

  const generateQuoteNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `UW-${year}${month}${day}-${random}`;
  };

  const getValidUntilDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      return;
    }

    const quoteNumber = generateQuoteNumber();
    const quotation: Quotation = {
      quoteNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      client: formData,
      calculation,
      validUntil: getValidUntilDate(),
    };

    // Send data to Google Apps Script
    try {
      await fetch("https://script.google.com/macros/s/AKfycbz9277UTwNHgf31G0vZ021sfM2-cq4YvQOrTMLBKrs6WP-0iybeSWHs6iJjwmAqL6pmzQ/exec", {
        method: "POST",
        body: JSON.stringify({
          clientName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          company: formData.companyName,
          websiteType: calculation.websiteType?.name,
          addOns: calculation.addOns.map(addon => addon.name).join(', '),
          hosting: calculation.hostingPlan?.name,
          urgency: calculation.urgencyLevel?.name,
          total: Math.round(calculation.total),
          quoteNumber: quoteNumber,
          notes: `Builder: ${calculation.builderType?.name}`
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => console.log("Success:", res))
      .catch(err => console.error("Error:", err));
    } catch (error) {
      console.error("Failed to send data:", error);
    }

    onSubmit(quotation);
  };

  const handleInputChange = (field: keyof ClientInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Client Information</h1>
          <p className="text-muted-foreground">
            Please provide your details to generate the quotation
          </p>
        </div>

        {/* Back Button */}
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Calculator
        </Button>

        {/* Form */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-xl">Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Your company name"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="bg-background"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="professional"
                  size="lg"
                  className="w-full"
                  disabled={!formData.fullName.trim()}
                >
                  Generate Quotation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Website Type:</span>
                <span className="font-medium">{calculation.websiteType?.name}</span>
              </div>
              {calculation.addOns.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Add-ons:</span>
                  <span className="font-medium">{calculation.addOns.length} selected</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Hosting:</span>
                <span className="font-medium">{calculation.hostingPlan?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Timeline:</span>
                <span className="font-medium">{calculation.urgencyLevel?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Type:</span>
                <span className="font-medium">{calculation.builderType?.name}</span>
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">KES {Math.round(calculation.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}