import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Materials } from '../shared/models/mamaterials/materials';
import { ReplaySubject, from, Observable } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MaterialsService } from '../shared/services/materials.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { map } from 'rxjs/operators'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { PopoverModule } from 'ngx-bootstrap/popover'

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  private materials: Materials[] = [];
  private material: Materials = new Materials();
  private showTable: boolean = false;

  public header = ["Titulo", "Tecnologia", "Url", "update", "delete"];
  public headerAtt = ["title", "type"];
  public materials$: ReplaySubject<any> = new ReplaySubject(1);
  private rowMaterialToDelete: number;
  public updateTo: number;
  private materialToUpdate: Materials = new Materials();
  public materialsdisplay$: Observable<any[]>;
  public newMaterial: boolean = false;

  modalRef: BsModalRef;
  public title: string;
  public link: string;
  public type: string;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faFile=faFile;

  filterValue: string;

  constructor(
    private apiMaterials: MaterialsService,
    private modalService: BsModalService,

  ) {
    this.apiMaterials.getAllMaterials().subscribe(
      (mat: Materials[]) => {
        this.materials$.next(mat);
        this.materials = mat
        console.log(this.materials);
      }
    )
  }

  ngOnInit() {
    this.displayData();
  }
  public updateObs() {
    this.materials$.next(this.materials)
  }

  public createMaterial() {

    this.material.title = this.title;
    this.material.url = this.link;
    this.material.type = this.type;

    console.log(this.material);

    return this.apiMaterials.createMaterial(this.material).subscribe(
      (msg: number) => {
        this.material.id = msg;
        this.materials.push(this.material);
        this.updateObs();
        console.log(this.material);
        this.material = new Materials();
      }, (error: string) => {
        console.log(error);
        this.material = new Materials();
      }
    )
  }

  public deleteById() {
    this.apiMaterials.deleteById(this.materials[this.rowMaterialToDelete].id).subscribe(
      (msg: string) => {
        this.materials.splice(this.rowMaterialToDelete, 1);
        this.updateObs()
        console.log(msg);
        if (this.materials.length <= 0) {
          this.showTable = false;
        }
      }, (error: string) => {
        console.log(error);
      }
    )
    this.modalRef.hide();
  }

  public updateMat() {
    console.log(this.materialToUpdate);
    this.apiMaterials.updateMaterial(this.materialToUpdate).subscribe(
      (msg: string) => {
        this.materials[this.updateTo] = this.materialToUpdate;
        this.updateObs()
        console.log(msg);
      }, (error: string) => {
        console.log(error);
      }
    )
    this.modalRef.hide();
  }

  public searchFilter() {
    if (this.filterValue === '') {
      return this.materials$;
    } else {
      const re = new RegExp(this.filterValue, 'gi');
      return this.materials$
        .pipe(
          map((items: Materials[]) => items.filter(item => item.title.match(re)))
        );
    }
  }
  public displayData() {
      this.materialsdisplay$ = this.searchFilter();
  }

  openModalConfirmDeleteMaterial(template: TemplateRef<any>, rowIndex: any) {
    for (let i = 0; i < this.materials.length; i++) {
      if (rowIndex == this.materials[i]) {
        this.rowMaterialToDelete = i;
      }
    }
    
    this.modalRef = this.modalService.show(template);
  }
  openModalUpdateMaterial(template: TemplateRef<any>, rowIndex: any) {
    this.materialToUpdate = { ...rowIndex };
    for (let i = 0; i < this.materials.length; i++) {
      if (rowIndex == this.materials[i]) {
        this.updateTo = i;
      }
    }
    this.modalRef = this.modalService.show(template);
  }

}
