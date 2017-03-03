import { AngularTicketmasterPage } from './app.po';

describe('angular-ticketmaster App', () => {
  let page: AngularTicketmasterPage;

  beforeEach(() => {
    page = new AngularTicketmasterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
