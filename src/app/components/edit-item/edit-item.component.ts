import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  item!: Item;
  editItemForm!: FormGroup;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  updateItem() {
    this.itemService.updateItem(this.item._id, this.editItemForm.value).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error(err) {
        console.log(err);

      },
    })

  }

  ngOnInit(): void {

    this.itemService.getItemById(this.route.snapshot.params['id']).subscribe((results) => {
      this.item = results.data
      this.editItemForm = new FormGroup({
        'itemName': new FormControl(results.data.itemName, [Validators.required]),
        'description': new FormControl(results.data.description, [Validators.required]),
        'price': new FormControl(results.data.price, [Validators.required]),

      })

    })
  }

}
