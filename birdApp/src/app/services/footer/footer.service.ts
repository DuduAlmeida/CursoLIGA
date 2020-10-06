import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FooterState } from 'src/app/models/enums/footer-state';

/*** 
 * A classe que representa o serviço que lida com os estilos e estados do footer do aplicativo
 */
@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private readonly router: Router,
  ) {
    this.router.events.subscribe((event) => {
      const currentUrl = this.router.url;

      if (currentUrl.startsWith('/main/categories'))
        return void this.selectedFooter.next(FooterState.CATEGORIES);

      if (currentUrl.startsWith('/main/my-comments'))
        return void this.selectedFooter.next(FooterState.MY_COMMENTS);

      if (currentUrl.startsWith('/main/all-comments'))
        return void this.selectedFooter.next(FooterState.ALL_COMMENTS);

    });
  }


  /* #region Private properties*/

  /*** 
   * Inicializa ele com um valor padrão, diferente do Subject.
   * O evento lançado para dizer qual é o menu do footer atualmente selecionado
   */
  private selectedFooter: BehaviorSubject<FooterState> = new BehaviorSubject<FooterState>(FooterState.CATEGORIES);

  /* #Endregion Private properties*/

  /* #region Public properties*/

  /*** 
   * Método que retorna a referÊncia do Observable do evento que diz qual é o menu atualmente selecionado
   */
  public getCurrentSelectedFooter$(): Observable<FooterState> {
    return this.selectedFooter.asObservable();
  }

  public setCurrentSelectedFooter$(newValue:FooterState): void {
    this.selectedFooter.next(newValue);
  }

  /* #Endregion Public properties*/

  
}
