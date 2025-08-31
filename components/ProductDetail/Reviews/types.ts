// types.ts
export interface Review {
  id: string | number;
  name: string;
  trek: string;
  rating: number;
  review: string;
  avatar: string;
  marginTop?: string;
}

export interface ReviewData {
  name: string;
  rating: number;
  review: string;
  photo: File | null;
}

export interface ReviewProps {
  data:
    | {
        title: string;
        reviews?: Review[];
        [key: string]: any; 
      }
    | Review[]; 
}
