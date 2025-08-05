export interface Memeber {
  name: string;
  position: string;
  bio: string;
  linkedin_link: string;
  whyUsImage: string;
}

export interface PageContent {
  type: string;
  title: string;
  slug: string;
  header: string | null;
  content1: string | null;
  content2: string | null;
  content3: string | null;
  featuredImage: string;
  meta: {
    metaTitle: string | null;
    keywords: string[];
    metaDescription: string | null;
  };
}
