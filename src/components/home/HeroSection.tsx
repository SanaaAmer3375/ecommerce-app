import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[10%] left-[-5%] w-100 h-100 bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content (Text and CTAs) */}
                    <div className="flex flex-col items-start gap-8 z-10">
                        {/* Weekly New Arrivals Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-xs md:text-sm text-primary font-bold tracking-wide shadow-sm">
                            <Sparkles size={14} />
                            DISCOVER OUR EXCLUSIVE COLLECTION
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-extrabold text-text leading-[1.1] tracking-tight text-left">
                            Bringing <br />
                            <span className="text-primary relative inline-block">
                                Serenity
                                <svg className="absolute -bottom-2 left-0 w-full opacity-40" viewBox="0 0 200 12" fill="none">
                                    <path d="M4 10c40-6 150-6 192 0" stroke="#4a7c59" strokeWidth="8" strokeLinecap="round"/>
                                </svg>
                            </span>
                            <br /> To Your Home.
                        </h1>

                        {/* Subheading */}
                        <p className="text-text-muted text-lg md:text-xl max-w-lg leading-relaxed font-light text-left">
                            Thoughtfully curated products designed to create a calm, beautiful, and functional living space.
                        </p>

                        {/* Call to Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/products"
                                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-2 group text-lg"
                            >
                                Shop Now
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-6 mt-4 pt-8 border-t border-gray-100 w-full">
                            {[
                                { icon: Truck, text: "Free Delivery" },
                                { icon: RotateCcw, text: "Easy Return" },
                                { icon: ShieldCheck, text: "Secure" },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-2 text-sm font-semibold text-text/60 uppercase tracking-wider">
                                    <Icon size={16} className="text-primary" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content (Visual Element) */}
                    <div className="relative hidden lg:block h-137.5">
                        {/* Main Hero Image - Using Local File */}
                        <div className="relative z-10 h-full w-[90%] ml-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <Image 
                                src="/unsplash.jpg"
                                alt="Modern Serenity Decor" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>

                        {/* Floating Sale Badge (Glassmorphism Effect) */}
                        <div className="absolute top-20 -left-4 z-20 bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white/40 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold">
                                %
                            </div>
                            <div>
                                <p className="text-text font-bold">Big Sale</p>
                                <p className="text-text-muted text-xs">Up to 50% Off</p>
                            </div>
                        </div>

                        {/* Background Radial Decoration */}
                        <div className="absolute -bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full -z-10 blur-2xl" />
                    </div>

                </div>
            </div>
        </section>
    );
}