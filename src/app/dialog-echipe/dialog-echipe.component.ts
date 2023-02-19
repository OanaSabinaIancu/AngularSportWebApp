import { Component, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-echipe',
  templateUrl: './dialog-echipe.component.html',
  styleUrls: ['./dialog-echipe.component.css']
})
export class DialogEchipeComponent {
  productForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogEchipeComponent>) { }
  ngOnInit():void {
    this.productForm = this.formBuilder.group({
      IdEchipa : ['',Validators.required],
      NumeEchipa : ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['IdEchipa'].setValue(this.editData.IdEchipa);
      this.productForm.controls['NumeEchipa'].setValue(this.editData.NumeEchipa);
    }
  }

  addProduct(){
   if(!this.editData){
    if(this.productForm.valid){
      this.api.postEchipe(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
        
      })
    }
   }
   else{
    this.updateProduct()
   }
  }
  updateProduct(){
    this.api.putEchipe(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating a record");
      }
    })

  }
}

