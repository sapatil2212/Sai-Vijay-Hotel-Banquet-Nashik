import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Line from "@/assets/line.png";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

const SectionHeading = ({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      {subtitle && (
        <span
          className={cn(
            "inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-3",
            light ? "text-accent" : "text-accent"
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight",
          light ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
      <div className={cn("flex justify-center mt-6", !centered && "justify-start")}>
        <img
          src={Line}
          alt="Decorative Line"
          className="w-40 md:w-52 lg:w-64"
        />
      </div>
    </motion.div>
  );
};

export default SectionHeading;
