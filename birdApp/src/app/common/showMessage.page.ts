import { ToastController } from '@ionic/angular';

export class ShowMessagePage {

    /*** 
   * Método que exibe alguma mensagem na tela
   * 
   * @param message A mensagem
   */
    constructor(
        private readonly toast: ToastController
    ) { }

    public async showMessage(message: string): Promise<void> {
        const toast = await this.toast.create({
            message,
            duration: 5_000,
        });

        await toast.present();
    }
}