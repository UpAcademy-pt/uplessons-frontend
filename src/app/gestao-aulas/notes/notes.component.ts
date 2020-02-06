import { Component, OnInit, TemplateRef } from '@angular/core';
import { Note } from '../shared/models/note/note';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ServiceGeneralService } from '../shared/services/service-general.service';
import { ReplaySubject } from 'rxjs';
import { DataService } from '../shared/services/data.service';
import { NotesService } from '../shared/services/notes.service';
import { faEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { ScriptPdfService } from '../shared/services/scriptPdf/script-pdf.service';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';

declare var pdfMake: any;


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  title1 = 'PdfExample';

  modalRef: BsModalRef;
  private notes: Note[];
  private note: Note = new Note();
  private notes$: ReplaySubject<Note[]> = new ReplaySubject();
  private editValid: Boolean = false;
  private noteToDelete: number;
  private noteToUpdate: Note;
  public editionIds: number[];
  public editionIds$: ReplaySubject<number[]> = new ReplaySubject(1);
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faUserPlus = faUserPlus;
  public cont: string[];

  private title: string;
  private description: string;
  private editionId: number;
  private lessonId: number;

  constructor(
    private serviceApi: ServiceGeneralService,
    private accountApi: ServiceGeneralService,
    private notesAPI: NotesService,
    private modalService: BsModalService,
    private dataService: DataService,
    private scriptService: ScriptPdfService
  ) {
    this.scriptService.load('pdfMake');
    setTimeout(() => {
      this.scriptService.load( 'vfsFonts');
    }, 500);
    this.dataService.getNotesByAccountId(this.accountApi.getCurrentAccountId());
    this.notes = dataService.notes;
    this.notes$ = dataService.notes$;
    this.editionIds = dataService.editionIds;
    this.editionIds$ = dataService.editionIds$;
    this.dataService.getEditionIdsByAccount(this.accountApi.getCurrentAccountId());
  }

  ngOnInit() {
  }


  /**
   * validEdit
   */
  public validEdit() {
    this.editValid = false;
    this.ngOnInit();
  }

  openModalNewNote(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalDeleteNote(template: TemplateRef<any>, index: number) {
    this.noteToDelete = index;
    console.log(this.noteToDelete);

    this.modalRef = this.modalService.show(template);
  }


  /**
   * createNote
   */
  public createNote() {
    this.note.title = this.title;
    this.note.description = this.description;
    this.note.accountId = this.accountApi.getCurrentAccountId();
    this.note.editionId = this.editionId;
    this.note.lessonId = this.lessonId;
    console.log(this.note);
    this.dataService.createNote(this.note);
    this.note = new Note();
    // this.modalRef.hide();
  }

  /**
   * deleteNoteById
   */
  public deleteNoteById() {
    console.log(this.notes);
    this.notes = this.dataService.notes;
    this.dataService.deleteNoteById(this.notes[this.noteToDelete].id);
    this.modalRef.hide();
  }

  /**
   * updateNote
   */
  public updateNote(note: Note) {
    this.dataService.updateNotes(note);
    console.log(note);
    
    // this.noteToUpdate = new Note();
  }

  async generatePdf() {
    console.log(this.notes);
    
    // const opt = { letterRendering: 1, allowTaint: true, imageTimeout: 10000, onrendered: (canvas) => { } };
    // html2canvas(document.querySelector('#capture'), opt).then(canvas => {
    //   const img = canvas.toDataURL();

      /* const documentDefinition = {
        content: {
          image: img,
          width: 520
        }
      }; */

      
      // var documentDefinition = {
      //   content: [
      //     {
      //       layout: 'lightHorizontalLines', // optional
      //       table: {
      //         // headers are automatically repeated if the table spans over multiple pages
      //         // you can declare how many rows should be treated as headers
      //         headerRows: 1,
      //         widths: [ '*', 'auto', 100, '*' ],
      
      //         body: [
      //           [ 'First', 'Second', 'Third', 'The last one' ],
      //           [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
      //           [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
      //         ]
      //       }
      //     }
      //   ]
      // };
     var documentDefinition = {
      // header: { image: await this.getBase64ImageFromURL(
      //   "http://www.upacademy.pt/media/UP-Academy-Logo-Retina-Website.png"
      // ) },

      content: this.dataService.notes.map(function(element) {
     return {text: 'Nota -' + element.title + '\n\n' + element.description + '\n\n'}
   })
  };

      pdfMake.createPdf(documentDefinition).open();
   // });
  }

  // getBase64ImageFromURL(url) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();
  //     img.setAttribute("crossOrigin", "anonymous");

  //     img.onload = () => {
  //       var canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);

  //       var dataURL = canvas.toDataURL("image/png");

  //       resolve(dataURL);
  //     };

  //     img.onerror = error => {
  //       reject(error);
  //     };

  //     img.src = url;
  //   });
  // }

}




