import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="text-primary" size={40} />
      </div>
      <h1 className="text-4xl font-bold text-text mb-2">Product Not Found</h1>
      <p className="text-text-muted max-w-md mb-8">
        Sorry, the product you are looking for does not exist or has been moved to another category.
      </p>
      <Link 
        href="/products" 
        className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
      >
        Back to Shopping
      </Link>
    </div>
  );
}