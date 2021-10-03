import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  add: FormGroup
  constructor(private matDialogRef: MatDialogRef<AddComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFormGroup()
  }
  setFormGroup() {
    this.add = this.formBuilder.group({
      name: ['',],
      pic: ['',],
      year: ['',],
    });
  }
  addItem(){
    console.log('this.add.value',this.add.value);

    this.matDialogRef.close(this.add.value)
  }
}
