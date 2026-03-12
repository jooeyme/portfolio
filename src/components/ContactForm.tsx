"use client";
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            botField: formData.get("botField") as string,
        };

        if (!data.name || !data.email || !data.message) {
            setErrorMessage("Please fill in all required fields.");
            setStatus("error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setErrorMessage("Please enter a valid email address.");
            setStatus("error");
            return;
        }

        if (data.message.length < 10) {
            setErrorMessage("Message must be at least 10 characters long.");
            setStatus("error");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            console.log(response);

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: any) {
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
            setStatus("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 rounded-2xl bg-zinc-900/60 border border-white/5 backdrop-blur-xl relative overflow-hidden"
        >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Send a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="botField">Leave this field empty</label>
                    <input type="text" id="botField" name="botField" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm text-zinc-400 font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={status === "loading" || status === "success"}
                            className="w-full bg-black/50 border border-white/5 rounded-xl p-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 disabled:opacity-50"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-zinc-400 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={status === "loading" || status === "success"}
                            className="w-full bg-black/50 border border-white/5 rounded-xl p-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 disabled:opacity-50"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-zinc-400 font-medium">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        minLength={10}
                        disabled={status === "loading" || status === "success"}
                        className="w-full bg-black/50 border border-white/5 rounded-xl p-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 resize-none disabled:opacity-50"
                        placeholder="Tell me about your architectural needs..."
                    ></textarea>
                </div>

                <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    whileHover={{ scale: status !== "loading" && status !== "success" ? 1.02 : 1 }}
                    whileTap={{ scale: status !== "loading" && status !== "success" ? 0.98 : 1 }}
                    className="w-full relative group overflow-hidden bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                    {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : status === "success" ? (
                        <span>Message Sent Successfully</span>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            <span>Initiate Connection</span>
                        </>
                    )}
                </motion.button>

                {status === "error" && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm text-center font-medium mt-4">
                        {errorMessage}
                    </motion.p>
                )}
            </form>
        </motion.div>
    );
}
