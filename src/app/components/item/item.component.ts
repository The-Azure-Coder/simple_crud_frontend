import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  itemDataSource!: MatTableDataSource<Item>;
  itemLength!: number;

  displayedColumns: string[] = ['itemName', 'description', 'price', 'action'];
  itemColumns: string[] = [
    'itemName',
    'description',
    'price',
    "action"
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemService: ItemService) { }

  fetchItems() {
    this.itemService.getAllItems().subscribe({
      next: (res) => {
        console.log(res);

        this.itemDataSource = new MatTableDataSource(res.data);
        this.itemLength = res.data.length;
        this.itemDataSource.paginator = this.paginator;


      }

    })
  }

  removeItem(id: string) {
    this.itemService.deleteService(id).subscribe({
      next: (res) => {
        this.fetchItems()

      }, error: (err) => {
        console.log(err);



      }

    })

  }

  ngOnInit(): void {
    this.fetchItems();
  }

}
