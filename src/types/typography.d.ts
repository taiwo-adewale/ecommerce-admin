export type HeadingVariants = "h1" | "h2" | "h3" | "h4";
export type BodyVariants = "p" | "span";

export type TypographyVariants = HeadingVariants | BodyVariants;

type BaseTypographyProps = {
  variant?: TypographyVariants;
  component?: TypographyVariants;
  className?: string;
  children: React.ReactNode;

  href?: undefined;
  target?: undefined;
};

type AnchorTypographyProps = {
  variant: "a";
  className?: string;
  children: React.ReactNode;
  href: string;
  target?: "_blank" | "_self";

  component?: undefined;
};

export type TypographyProps = BaseTypographyProps | AnchorTypographyProps;
