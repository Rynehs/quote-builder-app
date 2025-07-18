import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 bg-gradient-primary rounded-xl shadow-button">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                UPPERCASE WEB
              </h1>
              <p className="text-lg text-muted-foreground">Professional Website Solutions</p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Get Your Website Quote
              <br />
              <span className="text-primary">In Minutes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our intelligent quote calculator helps you get accurate pricing for your website project instantly. 
              From landing pages to e-commerce sites, get a detailed breakdown tailored to your needs.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/quote">
              <Button variant="professional" size="lg" className="text-lg px-8 py-6">
                <Calculator className="h-5 w-5" />
                Start Quote Calculator
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-gradient-card shadow-card border-0 hover:shadow-float transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Instant Pricing</h3>
                <p className="text-muted-foreground">
                  Get real-time quotes based on your specific requirements and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-0 hover:shadow-float transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Detailed Breakdown</h3>
                <p className="text-muted-foreground">
                  Transparent pricing with detailed cost breakdown for all services and add-ons.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-0 hover:shadow-float transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Professional Service</h3>
                <p className="text-muted-foreground">
                  Choose between freelancer or agency services to match your project needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
