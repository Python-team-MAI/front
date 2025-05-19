export interface CardProps {
  src: string;
  alt: string;
  text: string;
  href: string;
}

export interface BigCardProps extends CardProps {
  secondaryText: string;
}