import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';  
import { AsyncPipe } from '@angular/common'; 
import { emptyLibro } from '../../shared/models/libro.model';

@Component({
  selector: 'libro-edit-dialog',
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
  templateUrl: './libros-edit.component.html',
  styleUrl: './libros-edit.component.css'
})
export class LibrosEditDialogComponent {

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]) ,
    estado: new FormControl(true, [Validators.required])  
  });

  constructor(
    public dialogRef: MatDialogRef<LibrosEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}