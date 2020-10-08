import { Component, OnInit } from '@angular/core';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'bird-all-comments',
  templateUrl: './all-comments.page.html',
  styleUrls: ['./all-comments.page.scss'],
})
export class AllCommentsPage implements OnInit {

  constructor(
    private readonly comment: CommentService
  ) { }


  /* #region Public properties*/

  public listComments: CommentProxy[] = [];

  /* #Endregion Public properties*/

  /* #region Life-Cycle Events*/

  public async ngOnInit() {
    this.listComments = await this.comment.getAllComments();
  }

  /* #Endregion Life-Cycle Events*/

  /* #region Public Methods*/

  public trackById(index: number, value: CommentProxy): number {
    return value.id;
  }

  /* #Endregion Public Methods*/
}
