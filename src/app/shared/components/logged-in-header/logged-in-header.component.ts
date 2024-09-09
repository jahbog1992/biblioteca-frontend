import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in-header',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './logged-in-header.component.html',
  styleUrl: './logged-in-header.component.css',
})
export class LoggedInHeaderComponent {
  authService = inject(AuthService);

   mostrarSaludo(){
    var texto = "";
    var ahora=new Date(); 
    var hora=ahora.getHours();
    hora = 22;
    if (hora>=6 && hora<13) {
        texto="Buenos días, que tenga un dia productivo.";  
    } else if (hora>=13 && hora<21) { 
        texto="Buenas tardes, que sea un dia productivo.";
    } else { 
        texto="Buenas noches, que vuelva pronto.";
    }
   return texto; 
}
}
