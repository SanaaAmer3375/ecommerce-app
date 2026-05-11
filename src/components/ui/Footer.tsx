import Link from "next/link";
import { 
  Mail, 
  Phone, 
  ArrowUpRight,
  Globe
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Shop: [
            { label: "All Products", href: "/products" },
            { label: "New Arrivals", href: "/products" },
            { label: "Categories", href: "/products" },
            { label: "Featured Items", href: "/products" },
        ],
        Support: [
            { label: "Order Tracking", href: "/profile" },
            { label: "Shipping Policy", href: "/shipping" },
            { label: "Return Policy", href: "/returns" },
            { label: "FAQs", href: "/faq" },
        ],
        Company: [
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ]
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-xl font-bold text-text tracking-tight">Serenity Shop</span>
                        </Link>
                        <p className="text-text-muted text-base max-w-sm leading-relaxed">
                            Crafting spaces that inspire calm and beauty. Your destination for premium, thoughtfully designed home essentials.
                        </p>
                        <div className="flex gap-4">
                            {[Globe].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text/50 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="space-y-6">
                            <h4 className="text-sm font-bold text-text uppercase tracking-widest">{title}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="group text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-1 font-medium">
                                            {link.label}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter & Contact Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-gray-50 items-center">
                    <div className="flex flex-wrap gap-6 text-sm text-text-muted font-medium">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-primary" />
                            hello@serenity.com
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-primary" />
                            +1 (555) 123-4567
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-text-muted font-medium">
                            © {currentYear} Serenity Shop. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}