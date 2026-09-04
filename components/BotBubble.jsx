"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";


// --------------------------
// CONFIG (change for each project)
// --------------------------
const BRAND_NAME = "NoumanDeveloper"; // auto-used in Messages
const BUBBLE_LINK = "https://nouman-dev-tau.vercel.app/"; // any external or internal link
const ENABLE_CLICK = true; // set false if you don't want navigation

const BRAND_MESSAGES = [
    `Powered by ${BRAND_NAME}`,
    `Need help with something?`,
    `Explore what we offer`,
    `Let’s build something great together`,
];

// --------------------------

export default function BotBubble() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        const messageTimer = setInterval(() => {
            setCurrentMessageIndex(
                (prevIndex) => (prevIndex + 1) % BRAND_MESSAGES.length
            );
        }, 5000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(messageTimer);
        };
    }, []);

    const handleClick = () => {
        if (!ENABLE_CLICK) return;
        if (BUBBLE_LINK) window.open(BUBBLE_LINK, "_blank");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 right-6 z-50 flex items-center cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleClick}
                >
                    {/* Text Bubble */}
                    <motion.div
                        className="bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-xl whitespace-nowrap font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        {BRAND_MESSAGES[currentMessageIndex]}
                    </motion.div>

                    {/* Icon Circle */}
                    <motion.div
                        className="ml-3 bg-primary text-primary-foreground rounded-full p-3 shadow-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MessageCircle className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
