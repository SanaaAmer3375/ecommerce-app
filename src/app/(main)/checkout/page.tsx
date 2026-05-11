import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CheckoutClient from "../../../components/checkout/CheckoutClient";

export default async function CheckoutPage() {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-text mb-8">Checkout</h1>
            <CheckoutClient user={session.user} />
        </div>
        </div>
    );
}
