import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileNode, FileDatabaseService } from '../../explorer/shared/services/file-database.service';
import { CurrentSelectionDirective } from '../shared/directives/current-selection.directive';

@Component({
  selector: 'app-directory-content',
  templateUrl: './directory-content.component.html',
  styleUrls: ['./directory-content.component.css'],
})
export class DirectoryContentComponent implements OnInit {

  fileElements : FileNode[]
  constructor(public fileDB: FileDatabaseService) { }

  ngOnInit() {
    this.fileElements = this.fileDB.SelectedFolder.children;
    this.fileDB.selectedFolderChanged.subscribe(
      (updatedSelection)=>{ this.fileElements = updatedSelection.children}
    )
    // This is to handle page refresh or tab close event while creating/editting folder name
    window.addEventListener('beforeunload',(e)=>{
      if(this.fileDB.EditingFolderName){
        e.returnValue = '';
      }
    })
  }

  createNewClick(){
    this.fileDB.EditingFolderName = true
  }

  /**
   * This method does checks of (1) Empty string (2) white-spaces (3) charecter limit (4) duplicate name
   * Then uses file database service to store new Object at appropriate branch of Root tree
   * @param HtmlInputElement - HTML Input element reference passed form Template
   */
  addFolder(HtmlInputElement){
    // To remove white spaces, trim() is used (handles a case of ' ' -> spacebar)
    let value = HtmlInputElement.value.trim()

    // Empty string check
    if(!value){
      alert(`Folder name can not empty!`)
      HtmlInputElement.value = "New Folder"
      return
    }

    // Charecter limit check
    if(value.length > this.fileDB.FolderNameCharLimit){
      alert(`Please enter name with charecter limit to ${this.fileDB.FolderNameCharLimit}`)
      HtmlInputElement.value = value.slice(0,this.fileDB.FolderNameCharLimit)
      return
    }

    // Duplication check
    for(let i=0; i<this.fileElements.length; i++){
      if(value == this.fileElements[i].name){
        alert(`value already exist!`)
        HtmlInputElement.value = (value + ' (copy)').slice(0,this.fileDB.FolderNameCharLimit)
        return
      }
    }
    // The order is set such that user gets minimum warnings
    this.fileDB.addEntry(this.fileDB.SelectedFolder, new FileNode(value,this.fileDB.SelectedFolder.address))
  }

  deleteFolder(folder:FileNode){
    this.fileDB.deleteEntry(folder)
  }
}
