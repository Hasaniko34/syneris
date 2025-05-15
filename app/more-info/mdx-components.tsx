import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text",
        className
      )}
      {...props}
    />
  );
}

function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

function Ul({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc space-y-2", className)}
      {...props}
    />
  );
}

function Ol({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  );
}

function Li({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("mt-2", className)} {...props} />
  );
}

function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  );
}

function Hr({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("my-8 border-muted-foreground/30", className)}
      {...props}
    />
  );
}

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn("w-full border-collapse", className)}
        {...props}
      />
    </div>
  );
}

function Th({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-muted-foreground/20 px-4 py-2 text-left font-semibold",
        className
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("border-b border-muted-foreground/10 px-4 py-2", className)}
      {...props}
    />
  );
}

function Img({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Note: Bu örnekte doğrudan img etiketini kullanıyoruz, ancak Next.js projelerinde
  // Image bileşeni kullanmak daha iyi olabilir
  return (
    <div className="my-8 rounded-lg overflow-hidden shadow-md">
      <img className="w-full" alt={alt} {...props} />
    </div>
  );
}

function Pre({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-card p-4",
        className
      )}
      {...props}
    />
  );
}

function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  );
}

function Strong({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <strong
      className={cn("font-semibold", className)}
      {...props}
    />
  );
}

function Em({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <em
      className={cn("italic", className)}
      {...props}
    />
  );
}

function A({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("font-medium underline underline-offset-4 text-primary", className)}
      {...props}
    />
  );
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  table: Table,
  th: Th,
  td: Td,
  img: Img,
  pre: Pre,
  code: Code,
  strong: Strong,
  em: Em,
  a: A,
}; 