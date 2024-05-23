import clsx from "clsx";
import { forwardRef } from "react";

type Props = {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
};

const Wrapper = forwardRef<HTMLElement, Props>(
    ({ as: Component = "section", children, className, ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={clsx("px-5 py-10 md:px-10 md:py-16", className)}
                {...props}
            >
                <div className="max-w-7xl mx-auto w-full">{children}</div>
            </Component>
        );
    }
);

Wrapper.displayName = "Wrapper";
export default Wrapper;
