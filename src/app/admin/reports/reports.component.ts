import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Ventas', 'Compras', 'Ganancias'],
    datasets: [
      {
        data: [500, 300, 200],
      },
    ],
  };
  pieChartType: ChartType = 'pie';

  loadRealData() {
    this.pieChartData.datasets[0].data = [100, 200, 300];
    this.chart?.update();
  }

  data: TDocumentDefinitions = {
    content: [
      {
        text: 'Reporte de ventas',
        style: 'header',
      },
      {
        text: 'Ventas por categoría',
        style: 'subheader',
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Categoría', 'Ventas'],
            ['Download Sales', 300],
            ['In-Store Sales', 500],
            ['Mail-Order Sales', 100],
          ],
        },
      },
      {
        text: 'Ventas por producto',
        style: 'subheader',
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Producto', 'Ventas'],
            ['Product 1', 300],
            ['Product 2', 500],
            ['Product 3', 100],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  };
  downloadPDF() {
    pdfMake.createPdf(this.data).download();
  }
  openPDF() {
    pdfMake.createPdf(this.data).open();
  }
}
