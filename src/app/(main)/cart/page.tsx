import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

const shippingOptions = [
  { id: "standard", label: "Standard Shipping (5-7 days)", price: 5.99 },
  { id: "express", label: "Express Shipping (2-3 days)", price: 12.99 },
  { id: "overnight", label: "Overnight Shipping (1 day)", price: 24.99 },
];

const TAX_RATE = 0.08;

export default function CartPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-text mb-8">Shopping Cart</h1>
        <div className="flex gap-8 flex-col lg:flex-row">
          <CartItems />
          <CartSummary shippingOptions={shippingOptions} taxRate={TAX_RATE} />
        </div>
      </div>
    </div>
  );
}