import { Component, OnInit } from '@angular/core';
import { FileDatabaseService } from './shared/services/file-database.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  events: string[] = [];
  constructor(public fileDB : FileDatabaseService) { }

  ngOnInit() {
  }

}
