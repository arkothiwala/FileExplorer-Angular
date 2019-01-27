import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { FileDatabaseService } from '../services/file-database.service';

@Directive({
  selector: '[appCurrentSelection]'
})
export class CurrentSelectionDirective {
  defaultMouseOverStyle = '#6373ce91'
  mouseOverBgColor = this.defaultMouseOverStyle
  currentSelection = null
  //@Output('appCurrentSelection') selectionChanged : EventEmitter<string> = new EventEmitter(true)
  constructor(private elementRef : ElementRef, private renderer: Renderer2, private fileDB: FileDatabaseService) { }


  @Input() set appCurrentSelection(value){
    this.currentSelection = value
  }

  @Input('BgColor') set appCurrentSelectionBgColor(value){
    if(value){
      this.mouseOverBgColor = value
    }
  }

  @HostListener('mouseover') mouseenter(){
    this.renderer.setStyle(this.elementRef.nativeElement,'background-color',this.mouseOverBgColor)
  }

  @HostListener('mouseout') mouseleave(){
    this.renderer.setStyle(this.elementRef.nativeElement,'background-color','transparent')
  }

  @HostListener('click') clicked(){
    console.log(`currentSelection = ${this.currentSelection}`);
    console.log(this.currentSelection);
    this.fileDB.SelectedFolder = this.currentSelection
    //this.selectionChanged.emit(this.currentSelection)
  }


}
