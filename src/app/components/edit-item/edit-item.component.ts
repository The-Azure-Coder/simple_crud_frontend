import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success',)
        this.itemService.updateItem(this.item._id, this.editItemForm.value).subscribe(() => {
          this.router.navigate(['/'])
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        this.router.navigate(['/'])
      }
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
