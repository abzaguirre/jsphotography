import { motion, useScroll, useTransform, AnimatePresence, Variants, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";

export default function ContactUs() {
    const ref = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Scroll animations
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2, 1], [60, 0, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.95, 1, 1]);

    // Form field animations
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };


    // Success animation variants
    const successVariants: Variants = {
        hidden: {
            scale: 0.8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission with animation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setFormState("success");
            // Reset form after success
            setTimeout(() => {
                setFormData({ name: "", email: "", message: "" });
                setFormState("idle");
            }, 3000);
        } catch (error) {
            console.log(error, "error")
            setFormState("error");
            setTimeout(() => setFormState("idle"), 3000);
        }
    };

    return (
        <motion.section
            ref={ref}
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
            style={{ opacity, y, scale }}
        >
            <div className="w-full mx-auto">
                <div className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
                    >
                        Contact Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-muted-foreground mt-3 max-w-2xl text-left"
                    >
                        I am available for bookings. For more information on rates and availability,
                        please send an email to <span className="text-primary font-medium italic">jsincuya@gmail.com</span> or complete the form below.
                    </motion.p>
                </div>


                <div className="w-full flex justify-center">
                    <motion.div
                        className="w-full max-w-2xl neo-morphism rounded-2xl p-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.3,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {formState === "success" ? (
                                <motion.div
                                    key="success"
                                    className="h-[360px] flex flex-col items-center justify-center text-center"
                                    variants={successVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    exit="exit"
                                >
                                    <CheckCircleIcon />
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-muted-foreground">Your message has been sent successfully. We'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div variants={itemVariants} className="space-y-2">
                                            <Label className="text-sm font-medium" htmlFor="name">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="h-12"
                                                required
                                                autoComplete="name"
                                                placeholder="Enter your name"
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="space-y-2">
                                            <Label className="text-sm font-medium" htmlFor="email">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="h-12"
                                                required
                                                autoComplete="email"
                                                placeholder="Enter your email"
                                            />
                                        </motion.div>
                                    </div>
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <Label className="text-sm font-medium" htmlFor="message">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="min-h-[160px] resize-none"
                                            required
                                            placeholder="Tell us what you're looking for"
                                        />
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={formState === "submitting"}
                                            className={`h-12 px-8 w-full bg-primary hover:bg-primary/90 transition-all duration-300 ${formState === "submitting" ? "opacity-80" : ""
                                                }`}
                                        >
                                            {formState === "submitting" ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                "Send Message"
                                            )}
                                        </button>
                                    </motion.div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Background decorative elements */}
            <motion.div
                className="absolute top-40 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.5, 0.4],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute -bottom-20 -left-16 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </motion.section>
    );
}