/* eslint-disable react/prop-types */
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className
}) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
            {items.map((item, idx) => (
                <motion.div
                    key={item?._id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }} // Stagger the animation
                >
                    <Link
                        to={`/profile/${item._id}`}
                        className="relative group block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-gray-500/[0.8] block rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card>
                            <CardTitle>{item}</CardTitle>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export const Card = ({ className, children }) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative",
                className
            )}
        >
            <div className="relative">{children}</div>
        </div>
    );
};

export const CardTitle = ({ children }) => {
    return (
        <div className="flex items-center w-full p-4 dark:bg-gray-700 rounded-lg shadow-lg">
            <div className="w-16 h-16">
                <img
                    src={children.photo}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                />
            </div>
            <div className="ml-4 text-lg text-white font-semibold">{children.name}</div>
        </div>
    );
};

export default HoverEffect;
