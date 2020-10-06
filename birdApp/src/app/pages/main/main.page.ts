import { FooterState } from './../../models/enums/footer-state';
import { FooterService } from './../../services/footer/footer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage  {

  constructor(
    private readonly footerService:FooterService,
  ) {

    this.footerService.getCurrentSelectedFooter$().subscribe( (footerState) => {
      this.currentSelectedFooter = footerState;
    });
  }


  /* #region Public properties*/
  
  /*** 
   * O menu do footer que está atualmente selecionado
   */
  public currentSelectedFooter: FooterState = FooterState.CATEGORIES;

  /*** 
   * Os estados possíveis para a minha navegação do footer
   * O typeof indica que ele vai ser um dos tipos do FooterState, e não o footerState
   */
  public footerState: typeof FooterState = FooterState;
  
  /* #Endregion Public properties*/

  public onClickIconFooter(newValue: FooterState):void{
    this.footerService.setCurrentSelectedFooter$(newValue);
  }
}
