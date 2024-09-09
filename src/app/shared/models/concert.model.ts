export interface Concert {
  id: number;
  title: string;
  description: string;
  place: string;
  unitPrice: number;
  genre: string;
  genreId: number;
  dateEvent: string;
  timeEvent: string;
  imageUrl: string;
  ticketsQuantity: number;
  finalized: boolean;
  status: string;
}

export const emptyConcert: Concert = {
  id: 0,
  title: '',
  description: '',
  place: '',
  unitPrice: 0,
  genre: '',
  genreId: 0,
  dateEvent: '',
  timeEvent: '',
  imageUrl: '',
  ticketsQuantity: 0,
  finalized: false,
  status: '',
};
