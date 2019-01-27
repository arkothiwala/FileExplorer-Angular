import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { FileDatabaseService, FileNode } from '../../explorer/shared/services/file-database.service';

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-directory-tree',
  templateUrl: './directory-tree.component.html',
  styleUrls: ['./directory-tree.component.css'],
})
export class DirectoryTreeComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor(private database: FileDatabaseService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(){
    this.database.dataChange.subscribe((data)=>{
      console.log('subscription logging');
      this.nestedDataSource.data = null
      this.nestedDataSource.data = data
      console.log(this.nestedDataSource.data);
    });
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
}




