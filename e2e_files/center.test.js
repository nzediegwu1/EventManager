const faker = require('faker');

const modalContent = '#addNewCenter > div > div > div.modal-body.mx-sm-auto.col-sm-10 > form >';
const modalFooter = `${modalContent} div.modal-footer >`;
const modalInputs = number => `${modalContent} div:nth-child(${number}) > div > input`;

const imageFile = '/Users/andeladeveloper/Downloads/quartz_hotels.jpg';
const secondImage = '/Users/andeladeveloper/Downloads/york-town-hall.jpg';

const centerName = faker.company.companyName();
const address = faker.address.streetAddress();
const location = faker.address.city();
const secondCenter = faker.company.companyName();
const secondAddress = faker.address.streetAddress();
const secondLocation = faker.address.state();

function clearInputFields(browser) {
  return browser
    .pause(2000)
    .clearValue(modalInputs(1))
    .clearValue(modalInputs(2))
    .clearValue(modalInputs(3))
    .clearValue(modalInputs(4))
    .clearValue(modalInputs(5))
    .clearValue(modalInputs(6))
    .pause(1000);
}
const centerTests = {
  'Verify that addNewCenter button exists in navBar': browser => {
    browser.assert.containsText('#addCenter', 'Add Center');
    browser.expect
      .element('#addCenter')
      .to.have.attribute('data-target')
      .which.contains('#addNewCenter');
  },
  'Verify that addNewCenter modal is available': browser => {
    browser
      .click('#addCenter')
      .pause(1000)
      .verify.elementPresent(modalInputs(1))
      .verify.elementPresent(modalInputs(2))
      .verify.elementPresent(modalInputs(3))
      .verify.elementPresent(modalInputs(4))
      .verify.elementPresent(modalInputs(5))
      .verify.elementPresent(modalInputs(6))
      .assert.containsText(`${modalFooter} button.btn.btn-success.createEvent`, 'Save')
      .assert.containsText(`${modalFooter} button.btn.btn-danger`, 'Cancel');
    browser.expect
      .element('#set-availability > option:nth-child(2)')
      .to.have.attribute('value')
      .to.equal('open');
    browser.expect
      .element('#set-availability > option:nth-child(3)')
      .to.have.attribute('value')
      .to.equal('close');
  },
  'Create center: Should throw error when new center name is too short': browser => {
    browser
      .setValue(modalInputs(1), 'we')
      .setValue(modalInputs(2), imageFile)
      .setValue(modalInputs(3), 'Central Avenue')
      .setValue(modalInputs(4), 'Lagos')
      .setValue(modalInputs(5), '340')
      .setValue(modalInputs(6), '65000')
      .setValue('#set-availability', 'open')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Center name should be within 4-99 characters');
    clearInputFields(browser);
  },
  'Create center: Should successfully create a center': browser => {
    browser
      .setValue(modalInputs(1), centerName)
      .setValue(modalInputs(2), imageFile)
      .setValue(modalInputs(3), address)
      .setValue(modalInputs(4), location)
      .setValue(modalInputs(5), '340')
      .setValue(modalInputs(6), '65000')
      .setValue('#set-availability', 'open')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Action Successful');
    browser.pause(2000);
  },
  'Create center: Should throw error when same center already exists': browser => {
    browser
      .click('#addCenter')
      .pause(2000)
      .setValue(modalInputs(1), centerName)
      .setValue(modalInputs(2), imageFile)
      .setValue(modalInputs(3), address)
      .setValue(modalInputs(4), location)
      .setValue(modalInputs(5), '340')
      .setValue(modalInputs(6), '65000')
      .setValue('#set-availability', 'open')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Same center already exists');
    clearInputFields(browser);
    browser.pause(1000);
  },
  'Should successfully create a second center': browser => {
    browser
      .setValue(modalInputs(1), secondCenter)
      .setValue(modalInputs(2), secondImage)
      .setValue(modalInputs(3), secondAddress)
      .setValue(modalInputs(4), secondLocation)
      .setValue(modalInputs(5), '470')
      .setValue(modalInputs(6), '73000')
      .setValue('#set-availability', 'close')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Action Successful');
    browser.pause(3000);
  },
  'Edit a center: Should successfully edit a center': browser => {
    browser.click('#editEvent');
    clearInputFields(browser);
    browser
      .pause(1000)
      .setValue(modalInputs(1), faker.company.companyName())
      .setValue(modalInputs(3), address)
      .setValue(modalInputs(4), faker.address.state())
      .setValue(modalInputs(5), '340')
      .setValue(modalInputs(6), '65000')
      .setValue('#set-availability', 'open')
      .pause(3000)
      .click('#add-center-button')
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Action Successful');
    browser.pause(3000);
  },
  'Should view center list'(browser) {
    browser
      .click('#root > div > nav > a')
      .pause(1000)
      .click('.nav-item.center-list')
      .pause(3000);
  },
  'Should use pagination to load more'(browser) {
    browser
      .click('#content > div.mx-sm-auto.col-sm-11 > div > ul > li:nth-child(6)')
      .pause(1000)
      .click('#content > div.mx-sm-auto.col-sm-11 > div > ul > li:nth-child(6)')
      .pause(1000)
      .click('#content > div.mx-sm-auto.col-sm-11 > div > ul > li:nth-child(2)')
      .pause(1000)
      .click('#content > div.mx-sm-auto.col-sm-11 > div > ul > li:nth-child(2)')
      .pause(3000);
  },
  // 'Should filter based on search inputs'(browser) {
  //   browser
  //     .setValue('#filter-centers', 'ep')
  //     .pause(1000)
  //     .clearValue('#filter-centers')
  //     .pause(2000)
  //     .setValue('#filter-centers', 'ha')
  //     .pause(1000)
  //     .clearValue('#filter-centers')
  //     .pause(3000);
  // },
  'Should view a center details'(browser) {
    browser.click('#centerTable > tbody > tr:nth-child(1) > td:nth-child(2) > a').pause(2000);
  },
  'Should logout and login with new regular account'(browser) {
    browser
      .click('#root > div > nav > a')
      .pause(1000)
      .click('.nav-item.logout')
      .pause(3000);
  },
};

module.exports = {
  centerTests,
};
