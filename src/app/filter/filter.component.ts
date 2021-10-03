import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CARS } from '../cars';
import { AddComponent } from './add/add.component';



interface Car {
  brand: string;
  model: string;
  year: number;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  cars: Car[] = CARS;
  searchText: string;
  constructor( public matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.isPine()
  }
  isPine(){
    for(let i=1;i<=9;i++){
     let txt = "";
      for(let j=i;j<9;j++){
        txt += " ";
      }
      for(let k=0;k<(i*2)-1;k++){
        txt += i;
      }
      console.log(txt)
  }
  }

  openDialog() {
  const dialogRef = this.matDialog.open(AddComponent, {
    width:'400px',
      data: {
        languageId: '',
      },
      panelClass: 'custom-dialogc-ontainer',
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('result',result);

      let car :Car= {
        brand: result.name,
        model: result.pic,
        year: result.year
      }
      this.cars.push(car)
    })
  }

}
