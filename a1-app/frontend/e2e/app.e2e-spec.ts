import { browser, by, element } from 'protractor';

describe('My Angular App', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('should display the application title', async () => {
    const titleText = await element(by.css('h1')).getText();
    expect(titleText).toEqual('Welcome to My Angular App');
  });
});
