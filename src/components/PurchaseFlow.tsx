
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, CheckCircle, ArrowLeft, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseFlowProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PurchaseFlow = ({ onBack, onSuccess }: PurchaseFlowProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States"
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    handleInputChange('expiryDate', value);
  };

  const validateStep1 = () => {
    return formData.email && formData.email.includes('@');
  };

  const validateStep2 = () => {
    return formData.cardNumber.replace(/\s/g, '').length === 16 &&
           formData.expiryDate.length === 5 &&
           formData.cvc.length === 3 &&
           formData.name.trim();
  };

  const validateStep3 = () => {
    return formData.address && formData.city && formData.zipCode;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5);
      toast({
        title: "Payment Successful! 🎉",
        description: "Welcome to Premium Coaching! You now have access to expert trainers and nutritionists.",
        duration: 5000,
      });
      
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 3000);
  };

  if (step === 5) {
    return (
      <Card className="bg-black/40 border-green-800/40 max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-400 mb-2">Payment Successful!</h2>
          <p className="text-gray-300 mb-4">Welcome to Premium Coaching</p>
          <div className="text-sm text-gray-400">
            Redirecting you to your coaching dashboard...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="text-green-400">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= num ? 'bg-green-700 text-white' : 'bg-gray-600 text-gray-400'
            }`}>
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Account Information */}
      {step === 1 && (
        <Card className="bg-black/40 border-green-800/40">
          <CardHeader>
            <CardTitle className="text-white">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-black/20 border-green-800/40 text-white"
                placeholder="your.email@university.edu"
              />
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!validateStep1()}
              className="w-full bg-green-700 hover:bg-green-600"
            >
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment Information */}
      {step === 2 && (
        <Card className="bg-black/40 border-green-800/40">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                className="bg-black/20 border-green-800/40 text-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  className="bg-black/20 border-green-800/40 text-white"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvc" className="text-gray-300">CVC</Label>
                <Input
                  id="cvc"
                  value={formData.cvc}
                  onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, '').substring(0, 3))}
                  className="bg-black/20 border-green-800/40 text-white"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name" className="text-gray-300">Cardholder Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-black/20 border-green-800/40 text-white"
                placeholder="John Doe"
              />
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!validateStep2()}
              className="w-full bg-green-700 hover:bg-green-600"
            >
              Continue to Billing
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Billing Address */}
      {step === 3 && (
        <Card className="bg-black/40 border-green-800/40">
          <CardHeader>
            <CardTitle className="text-white">Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-black/20 border-green-800/40 text-white"
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-gray-300">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-black/20 border-green-800/40 text-white"
                  placeholder="Los Angeles"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-gray-300">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="bg-black/20 border-green-800/40 text-white"
                  placeholder="90210"
                />
              </div>
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!validateStep3()}
              className="w-full bg-green-700 hover:bg-green-600"
            >
              Review Order
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Order Review */}
      {step === 4 && (
        <Card className="bg-black/40 border-green-800/40">
          <CardHeader>
            <CardTitle className="text-white">Review Your Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg border border-green-800/40">
                <Crown className="h-8 w-8 text-yellow-400" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Premium Coaching Plan</h3>
                  <p className="text-sm text-gray-400">Personal Trainer & Nutritionist Access</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">$29.99</div>
                  <div className="text-sm text-gray-400">per month</div>
                </div>
              </div>
              
              <Separator className="bg-green-800/40" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>$2.40</span>
                </div>
                <Separator className="bg-green-800/40" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>$32.39</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Secure payment processed by Stripe</span>
              </div>
            </div>

            <Button 
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-green-700 hover:bg-green-600 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Purchase - $32.39
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PurchaseFlow;
