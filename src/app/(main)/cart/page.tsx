import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

const shippingOptions = [
  { id: "standard", label: "Standard Shipping (5-7 days)", price: 5.99 },
  { id: "express", label: "Express Shipping (2-3 days)", price: 12.99 },
  { id: "overnight", label: "Overnight Shipping (1 day)", price: 24.99 },
];

const TAX_RATE = 0.08;

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FBFCFB] pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-text/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ShoppingBag size={24} strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl font-extrabold text-text tracking-tight">Your Cart</h1>
            </div>
          </div>

          {/* Quick Trust Badges */}
          <div className="hidden lg:flex items-center gap-6 border-l border-gray-100 pl-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-text/40 uppercase tracking-widest">
              <ShieldCheck size={16} className="text-primary" />
              Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-text/40 uppercase tracking-widest">
              <Truck size={16} className="text-primary" />
              Free over $150
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-text/40 uppercase tracking-widest">
              <RotateCcw size={16} className="text-primary" />
              30-Day Returns
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8">
                <CartItems />
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
              <CartSummary shippingOptions={shippingOptions} taxRate={TAX_RATE} />
            </div>
            
            {/* Safety Footer under summary */}
            <p className="mt-6 text-center text-xs text-text/40 font-medium px-6 leading-relaxed">
              By clicking Checkout, you agree to our Terms of Service and Privacy Policy. All transactions are secure and encrypted.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}