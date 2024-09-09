import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { FormattedDataModel } from './libros.model';
import { AsyncPipe } from '@angular/common';
import { LibrosService } from './libros.service';
import { LibrosEditDialogComponent } from '../libros-edit/libros-edit.component';
import { emptyLibro } from '../../shared/models/libro.model';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatDialogModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class Librosomponent implements OnInit, AfterViewInit {
  
  constructor(public dialog: MatDialog) {}
  
  displayedColumns: string[] = [
    'nombre',
    'autor',
    'isbn' 
  ];
  initialData: FormattedDataModel[] = [];
  dataSource = new MatTableDataSource<FormattedDataModel>();
  librosLoaded = false;
  genres: string[] = [];
  events: string[] = [];

  filterFormGroup = new FormGroup({ 
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  librosService = inject(LibrosService);

  ngOnInit() {
    this.loadLibros(); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupPaginatorLabels();
  }

  setupPaginatorLabels() {
    this.paginator._intl.itemsPerPageLabel = 'Nro de ventas por página:';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente';
  }
 

  toggleControl(control: FormControl, enable: boolean) {
    if (enable) {
      control.enable();
    } else {
      control.setValue('');
      control.disable();
    }
  }
   

 
  loadLibros() {
    this.librosLoaded = false; 
    this.librosService
      .getLibros(1, 999)
      .subscribe((response) => {
        this.librosLoaded = true;
        this.handleLibrosResponse(response.data);
      });
  }

  handleLibrosResponse(data: any[]) { 
    this.initialData = data.map(this.formatSaleData);
    this.dataSource.data = this.initialData;
    this.genres = this.extractUniqueValues(data, 'genre');
    this.events = this.extractUniqueValues(data, 'title');
  }

  formatSaleData(libro: any): FormattedDataModel {
    return {
      id: libro.id,
      nombre: libro.nombre,
      autor: libro.autor,
      isbn: libro.isbn 
    };
  }

  extractUniqueValues(data: any[], key: string): string[] {
    return Array.from(new Set(data.map((item) => item[key])));
  }
  
  Editar(elemento?: any): void {
    const dialogRef = this.dialog.open(LibrosEditDialogComponent, {
      data: elemento ,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadLibros();
      } 
    });;
  }

  openEditModal(): void {
    const dialogRef = this.dialog.open(LibrosEditDialogComponent, {
      data: emptyLibro,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadLibros();
      } 
    });;
  }
}
