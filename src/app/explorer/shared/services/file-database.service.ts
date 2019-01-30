import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class FileNode {
  address: string[] = [];
  children: FileNode[] = [];
  name: string;
  type: any;
  constructor(name, parentAddress = []){
    this.name = name
    this.address = parentAddress.concat(name)
  }
}

@Injectable({
  providedIn: 'root'
})
export class FileDatabaseService {

  //#region Declaration

  dataChange = new BehaviorSubject<FileNode[]>([]);
  private _selectedFolder:FileNode
  private _editingFolderName:boolean = false // Used to keep track of whether user is writing name of a folder
  selectedFolderChanged : EventEmitter<FileNode> = new EventEmitter(true) // To handle navigation
  FolderNameCharLimit = 10    // To prevent user enter infi string
  //#endregion

  //#region Properties

  // This is the main object which holds entire tree data
  get data(): FileNode[]        { return this.dataChange.value; }

  get SelectedFolder()          { return this._selectedFolder; }

  set SelectedFolder(value:FileNode){
    if(this._selectedFolder != value){
      if(this._editingFolderName){
        this._editingFolderName = !(confirm('You were creating a new folder, your progress will be lost !'))
      }
      if(!this._editingFolderName){
        this._selectedFolder = value
        this.selectedFolderChanged.emit(value)
      }
    }
  }

  get EditingFolderName()       { return this._editingFolderName; }
  set EditingFolderName(value)  { this._editingFolderName = value } 
  //#endregion
  
  constructor() {
    this.initialize();
  }

  //#region methods
  initialize() {
    let data = [new FileNode('Root')]
    this._selectedFolder = data[0]
    // Notify the change.
    this.dataChange.next(data);
  }

  addEntry(ParentFolder:FileNode, ChildObject){
    ParentFolder.children.push(ChildObject)
    this.dataChange.next(this.data)
    this._editingFolderName = false
  }

  deleteEntry(folder){
    let parentFolder = this.getFolderFromAddress(folder.address.slice(0,-1))
    // parentfolder is from this.data tree only since the method starts its search from root node
    for(let i=0; i<parentFolder.children.length; i++){
      if(parentFolder.children[i].name == folder.name){
        let whatever = parentFolder.children.splice(i,1) // This removes child object with name matched in query
        this.dataChange.next(this.data)
        break
      }
    }
  }

  SelectParent(){
    // pop could not be used as it will remove members from actual address array
    // Slice clones the object and create a new copy
    this.SelectedFolder = this.getFolderFromAddress(this.SelectedFolder.address.slice(0,-1))    
  }

  getFolderFromAddress(address: string[], data = this.data){
  // Creates copy of the address so that original object does not get affected
    for(let i=0; i<data.length;i++){
      if(address[0] == data[i].name){
        if(address.length>1){
          return this.getFolderFromAddress(address.slice(1), data[i].children)            
        }
        else{
          return data[i]
        }
      }
    }
  }

  //#endregion
}