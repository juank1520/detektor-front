import { Component, OnInit } from '@angular/core';
import { MotivesService } from './services/motives.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogTabComponent } from './dialog-tab/dialog-tab.component';



export interface MotivoElement {
  des_motivo: string;
  motivo: number;
  estado: number;
  tipo: string;
}

let motiveData: MotivoElement[] = [];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['motivo', 'des_motivo', 'estado', 'tipo', 'acciones'];
  dataSource = motiveData;

  constructor(
    private motive: MotivesService,
    public dialog: MatDialog
  ){}



  ngOnInit(){
    this.motive.getAllMotives().subscribe( (data: any[])=> {
      this.displayInTable(data);
    });
  }

  displayInTable(motives: any[]){
    this.dataSource = null;
    this.dataSource = motives
  }

  filter(text: any){
    this.motive.getMotives(text.value).subscribe((data: any[])=> {
      this.displayInTable(data);
    });
  }


  sort( type: string ){
    this.motive.getAllMotivesSorted(type).subscribe( (data: any[])=> {
      this.displayInTable(data);
    });
  }

  editMotive(id: number){
    const motive = this.dataSource.find( item => item.motivo === id );
    const dialogRef = this.dialog.open(DialogTabComponent, {
      width: '500px',
      data: {
        ... motive,
        isNew: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.motive.getAllMotives().subscribe( (data: any[])=> {
        this.displayInTable(data);
      });
    });

  }


  newMotive(){
    const dialogRef = this.dialog.open(DialogTabComponent, {
      width: '500px',
      data: {
        isNew: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.motive.getAllMotives().subscribe( (data: any[])=> {
        this.displayInTable(data);
      });
    });
  }

  deleteMotive( id: number ){
    this.motive.deleteMotive(id).subscribe( () =>{
      this.sort('ASC');
    })
  }

}
