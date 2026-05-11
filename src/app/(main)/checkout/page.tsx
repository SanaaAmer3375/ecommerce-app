import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CheckoutClient from "../../../components/checkout/CheckoutClient";
import { ShieldCheck, Lock, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage() {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="min-h-screen bg-[#FBFCFB] pb-20">
            <div className="max-w-4xl mx-auto px-6 pt-12">
                
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <Link 
                        href="/cart" 
                        className="flex items-center gap-2 text-text/40 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <ChevronLeft size={14} />
                        Back to Cart
                    </Link>
                    <h1 className="text-4xl font-black text-text tracking-tighter">Secure Checkout</h1>
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-3 py-1.5 rounded-full">
                            <ShieldCheck size={14} />
                            SSL Encrypted
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text/40 uppercase tracking-wider">
                            <Lock size={12} />
                            Secure Payment
                        </div>
                    </div>
                </div>

                {/* Main Checkout Component */}
                <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                    <CheckoutClient user={session.user} />
                </div>

                {/* Footer trust info */}
                <p className="mt-8 text-center text-xs text-text/30 font-medium">
                    Your personal data will be used to process your order, support your experience <br/> 
                    throughout this website, and for other purposes described in our privacy policy.
                </p>
            </div>
        </div>
    );
}