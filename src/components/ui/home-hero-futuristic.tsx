import HeroFuturistic from "@/components/ui/hero-futuristic";

interface HomeHeroFuturisticProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function HomeHeroFuturistic({
  title = "Find Your Session",
  subtitle = "Discover gaming cafes, compare setups, and read reviews from players like you.",
  className,
}: HomeHeroFuturisticProps) {
  return (
    <HeroFuturistic title={title} subtitle={subtitle} className={className} />
  );
}
