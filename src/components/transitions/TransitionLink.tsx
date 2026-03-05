"use client";

import { usePageTransition } from "./TransitionProvider";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
    const { navigateTo } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.(e);
        navigateTo(href);
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
