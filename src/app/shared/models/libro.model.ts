export interface Libro {
  id: number;
  nombre: string;
  autor: string;
  isbn: string;
  status: boolean;
}

export const emptyLibro: Libro = {
  id: 0,
  nombre: '',
  autor: '',
  isbn: '', 
  status: false,
};
