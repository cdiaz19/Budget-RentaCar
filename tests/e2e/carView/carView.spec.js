describe('Car View page', function() {

  it('should go to carView page', function() {
    browser.get(browser.baseUrl + 'carView');
    expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/carView");
  });

  it('should have custom buttons', function() {
    expect(element(by.css('.budget-orange-button.button.button-block.button-assertive.has-header')).isPresent()).toBe(true);
    expect(element(by.css('.budget-blue-button.button.button-block.button-assertive.has-header')).isPresent()).toBe(true);

  });


});