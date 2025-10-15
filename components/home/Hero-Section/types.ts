export interface SocialMedia {
  icon:
    | "Facebook"
    | "Instagram"
    | "Twitter"
    | "Pinterest"; 
  url: string;
  hoverColor: string;
}

export interface Rating {
  score: number;
  maxStars: number;
  googleIcon: string;
}

export interface Trip {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
  slug: string;
}

export interface Hero {
  title: string;
  buttonText: string;
  backgroundImage: string;
}

export interface HeroData {
  hero: Hero;
  socialMedia: SocialMedia[];
  rating: Rating;
  trips: Trip[];
}

export interface IconProps {
  className: string;
  size: number;
}
