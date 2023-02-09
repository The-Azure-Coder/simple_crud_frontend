import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  itemDataSource!: MatTableDataSource<Item>;
  itemLength!: number;
  totalItems: number[] = [];

  displayedColumns: string[] = ['itemName', 'description', 'price', 'action'];
  itemColumns: string[] = [
    'itemName',
    'description',
    'price',
    "action"
  ];

  @ViewChild(MatSort) sort!: MatSort;
  totalPrice!: number;

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

  getTotalItems() {
    this.itemService.getAllItems().subscribe(results => {
      this.totalItems = results.data.map(mapitems => {
        return mapitems.price

      })
      this.totalPrice = this.totalItems.reduce((a, b) => {
        return a += b;
      }, 0)


      console.log(this.totalPrice)
    })
  }

  removeItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.itemService.deleteService(id).subscribe({

          next: (res) => {
            this.fetchItems()

          }, error: (err) => {
            console.log(err);
          }

        })

      }
    })

  }

  ngOnInit(): void {
    this.fetchItems();
    this.getTotalItems()

  }

}
