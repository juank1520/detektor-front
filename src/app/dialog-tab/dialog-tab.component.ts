import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppComponent  } from '../app.component';
import { MotivesService } from '../services/motives.service';


import {FormBuilder, FormGroup} from '@angular/forms'


@Component({
  selector: 'app-dialog-tab',
  templateUrl: './dialog-tab.component.html',
  styleUrls: ['./dialog-tab.component.css']
})
export class DialogTabComponent implements OnInit {

  form: FormGroup;


  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AppComponent>,
    private motive: MotivesService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.form = fb.group({
      motive: data.motivo,
      des_motivo: data.des_motivo,
      estado: data.estado,
      tipo: data.tipo
    });

    
  }

  ngOnInit(): void {
    if(this.data.isNew === false){
      this.form.get('motive').disable();
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  saveMotive(){
    const id = this.data.motivo;
    const des_motivo = this.form.get('des_motivo').value;
    const estado = this.form.get('estado').value;
    const tipo = this.form.get('tipo').value;

    if(this.data.isNew === false){
      this.motive.updateMotive(id, des_motivo, estado, tipo).subscribe(
        ()=> {
          this.dialogRef.close();
        }
      );
    }else{
      this.motive.createMotive(des_motivo, estado, tipo).subscribe(
        ()=> {
          this.dialogRef.close();
        }
      );
    }
  }

}
