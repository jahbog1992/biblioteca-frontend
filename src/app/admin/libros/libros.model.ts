import { Libro } from '../../shared/models/libro.model';

export interface LibrosApiResponse {
  data: Libro[];
  success: boolean;
  errorMessage: string;
}

export interface FormattedDataModel {
  id:number;
  nombre: string;
  autor: string;
  isbn: string; 
}
