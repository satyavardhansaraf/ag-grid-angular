import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import { DetailCellRenderer } from './detail-cell-renderer.component';
import { IAccount } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, AgGridAngular, DetailCellRenderer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
  public detailCellRenderer: any = DetailCellRenderer;
  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
  };

  public rowData!: IAccount[];
  public themeClass: string =
    "ag-theme-quartz";
  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '1');
    });
  }

  onGridReady(params: GridReadyEvent<IAccount>) {
    this.http
      .get<IAccount[]>(
        'https://www.ag-grid.com/example-assets/master-detail-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
