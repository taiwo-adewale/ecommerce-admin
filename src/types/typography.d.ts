// Interface for specifying props for typographic elements.
interface TypographyProps {
  // The HTML element type to be used for rendering the typographic element.
  // It is optional and can be one of the following values:
  // "h1", "h2", "h3", "h4", "p", "span", "a", "blockquote".
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "a" | "blockquote";
}

// Interface for specifying props for headings while allowing customization of HTML element type.
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    TypographyProps {}

// Interface for specifying props for paragraphs while allowing customization of HTML element type.
export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    TypographyProps {}

// Interface for specifying props for spans while allowing customization of HTML element type.
export interface SpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    TypographyProps {}

// Interface for specifying props for anchor elements while allowing customization of HTML element type.
export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    TypographyProps {
  // The hyperlink URL (required).
  href: string;
}

// Interface for specifying props for blockquote elements while allowing customization of HTML element type.
export interface QuoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    TypographyProps {}
