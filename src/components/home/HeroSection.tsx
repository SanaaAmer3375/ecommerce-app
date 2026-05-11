import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="bg-bg-hero relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative">
            <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-white border border-primary/20 px-4 py-2 rounded-full text-sm text-primary font-medium shadow-sm">
                <Sparkles size={14} />
                New Arrivals Every Week
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight tracking-tight">
                Discover{" "}
                <span className="text-primary relative">
                Serenity
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
                </span>
                <br />
                In Every Purchase
            </h1>

            <p className="text-text-muted text-lg max-w-xl leading-relaxed">
                Curated collection of thoughtfully designed products that bring calm and beauty to your everyday life.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 mt-2">
                <Link
                href="/products"
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 group"
                >
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-200 w-full">
                {[
                { icon: Truck, text: "Free Shipping" },
                { icon: RotateCcw, text: "Easy Returns" },
                { icon: ShieldCheck, text: "Secure Payment" },
                ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-text-muted">
                    <Icon size={16} className="text-primary" />
                    {text}
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
}