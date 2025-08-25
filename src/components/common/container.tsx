import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: Props) {
  return <div className={cn("container mx-auto px-4", className)} {...props} />;
}

export function Section({ className, ...props }: Props) {
  return (
    <section
      className={cn("container mx-auto px-4 py-12 sm:py-16", className)}
      {...props}
    />
  );
}
