import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  submitted = false;

  addItemForm = new FormGroup({
    'itemName': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'price': new FormControl('', [Validators.required]),

  })




  constructor(private itemService: ItemService, private router: Router) { }

  onSubmit() {
    this.submitted = true
    const formData = this.addItemForm.value as unknown as Partial<Item>;
    if (this.addItemForm.valid) {
      this.itemService.createItem(formData).subscribe({
        next: (res) => {
          Swal.fire('Item added successfully')
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err);

        }
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form...',
        text: 'Please ensure that all required fields are filled',
      })
    }


  }

  ngOnInit(): void {
  }

}
