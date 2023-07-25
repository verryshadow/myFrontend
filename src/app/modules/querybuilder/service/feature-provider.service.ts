import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'
import { IAppConfig } from '../../../config/app-config.model'

@Injectable({
  providedIn: 'root',
})
export class FeatureProviderService {
  STORAGE_FEATURE_KEY = 'FEATURES'
  private renderer: Renderer2

  constructor(
    @Inject(LOCAL_STORAGE) public storage: StorageService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  public initFeatures(features: IAppConfig): void {
    if (features.features.extra.showoptionspage) {
      if (!this.storage.get(this.STORAGE_FEATURE_KEY)) {
        this.storeFeatures(features)
      } else {
        features = this.getFeatures()
      }
    } else {
      this.deleteFeaturesFromLocalStorage()
    }
    this.renderer.addClass(document.body, features.stylesheet)
  }

  public storeFeatures(features: IAppConfig): void {
    this.storage.set(this.STORAGE_FEATURE_KEY, features)
  }

  public deleteFeaturesFromLocalStorage(): void {
    this.storage.remove(this.STORAGE_FEATURE_KEY)
  }

  public getFeatures(): IAppConfig {
    return this.storage.get(this.STORAGE_FEATURE_KEY)
  }

  setTheme(oldTheme: string, newTheme: string): void {
    this.renderer.removeClass(document.body, oldTheme)
    this.renderer.addClass(document.body, newTheme)
    this.renderer.removeClass(document.getElementById('header-logo'), oldTheme)
    this.renderer.addClass(document.getElementById('header-logo'), newTheme)
    this.renderer.removeClass(document.getElementById('footer-logo'), oldTheme)
    this.renderer.addClass(document.getElementById('footer-logo'), newTheme)
    this.renderer.removeClass(document.getElementById('funder-logo'), oldTheme)
    this.renderer.addClass(document.getElementById('funder-logo'), newTheme)
    if (newTheme === 'codexTheme') {
      document
        .getElementById('header-logo')
        .setAttribute('src', 'assets/img/Logo_CODEX_rgb_cropped.png')
      document.getElementById('header-logo').setAttribute('alt', 'CODEX Logo')
      document.getElementById('footer-logo').setAttribute('src', 'assets/img/NUM_Logo.png')
      document.getElementById('footer-logo').setAttribute('alt', 'NUM Logo')

      document.getElementById('funder-logo').setAttribute('src', 'assets/img/bmbf-gef-mit.png')
      document.getElementById('funder-logo').setAttribute('alt', 'BMBF-LOGO Logo')
    }
    if (newTheme === 'abideTheme') {
      document.getElementById('header-logo').setAttribute('src', 'assets/img/Abide_MI_cropped.jpg')
      document.getElementById('header-logo').setAttribute('alt', 'ABIDE Logo')
      document.getElementById('footer-logo').setAttribute('src', 'assets/img/Abide_MI_cropped.jpg')
      document.getElementById('footer-logo').setAttribute('alt', 'MII Logo')

      document.getElementById('funder-logo').setAttribute('src', 'assets/img/bmbf-gef-mit.png')
      document.getElementById('funder-logo').setAttribute('alt', 'BMBF-LOGO Logo')


    }
    if (newTheme === 'sbaTheme') {
      document
        .getElementById('header-logo')
        .setAttribute('src', 'assets/img/sba-research-shared.jpg')
      document.getElementById('header-logo').setAttribute('alt', 'SBA Logo')
      document.getElementById('footer-logo').setAttribute('src', 'assets/img/sba-research-shared.jpg')
      document.getElementById('footer-logo').setAttribute('alt', 'small SBA Logo')

      document.getElementById('funder-logo').setAttribute('src', 'assets/img/Screen4Care.png')
      document.getElementById('funder-logo').setAttribute('alt', 's4c Logo')
    }
  }
}
