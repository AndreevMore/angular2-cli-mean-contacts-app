import { browser, element, by } from 'protractor';

export class MeanAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('navigation h1')).getText();
  }
}
