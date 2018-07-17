const faker = require('faker');

const modalFooter = '#eventForm > div:nth-child(6) > div.modal-footer >';
const modalInputs = number => `#eventForm > div:nth-child(${number}) > div > input`;
const username = faker.internet.userName();
const email = faker.internet.email();
const fullname = `${faker.name.firstName()} ${faker.name.lastName()}`;
const realPhone = `+234${faker.random.number({
  min: 7000000000,
  max: 7099999999,
})}`;

const imageFile = '/Users/andeladeveloper/Downloads/concert.jpeg';
const eventTitle = faker.lorem.words(3);

function clearSignupInputFields(browser) {
  return browser
    .pause(2000)
    .clearValue('#signupForm > div:nth-child(3) > div > input')
    .clearValue('#signupForm > div:nth-child(4) > div > input')
    .clearValue('#signupForm > div:nth-child(5) > div > input')
    .clearValue('#signupForm > div:nth-child(6) > div > input')
    .clearValue('#signupForm > div:nth-child(7) > div > input')
    .clearValue('#signupForm > div:nth-child(8) > div > input')
    .pause(1000);
}

function clearInputFields(browser) {
  return browser
    .pause(2000)
    .clearValue(modalInputs(1))
    .clearValue(modalInputs(2))
    .clearValue('#eventForm > div:nth-child(5) > textarea')
    .pause(1000);
}
const eventTests = {
  'Display landing page and ensure all elements are available': browser => {
    browser
      .windowMaximize()
      .url('http://localhost:9876')
      .waitForElementVisible('body', 3000)
      .verify.title('EventManager')
      .assert.containsText('.main-title', 'EventManager')
      .assert.containsText('#signinForm > h3', 'Login')
      .verify.elementPresent('#login_textbox')
      .verify.elementPresent('#password_textbox')
      .assert.containsText('#signinForm > div.form-links > a.welcome', 'Create account')
      .assert.containsText('#reset-password', 'reset password');
    browser.expect.element('#reset-password').to.be.an('a');
    browser.pause(1000);
  },
  'it should display signup form when user clicks account link': browser => {
    browser
      .click('#signinForm > div.form-links > a.welcome')
      .verify.elementPresent('#signupForm > div:nth-child(3) > div > input')
      .verify.elementPresent('#signupForm > div:nth-child(4) > div > input')
      .verify.elementPresent('#signupForm > div:nth-child(5) > div > input')
      .verify.elementPresent('#signupForm > div:nth-child(6) > div > input')
      .verify.elementPresent('#signupForm > div:nth-child(7) > div > input')
      .verify.elementPresent('#signupForm > div:nth-child(8) > div > input')
      .verify.elementPresent('#signupForm > button')
      .assert.containsText('#signupForm > button', 'Signup');
    browser.expect
      .element('#loginPanel > div')
      .to.have.css('display')
      .which.contains('block');
    browser.expect
      .element('#signinForm')
      .to.have.css('display')
      .which.contains('none');
    browser.expect
      .element('#signupForm > button > i')
      .to.have.css('display')
      .which.contains('none'); // fontawesom process spinner
    browser.pause(1000);
  },
  'Check component visibility in register page': browser => {
    browser.expect
      .element('#loginPanel > div')
      .to.have.css('display')
      .which.contains('block'); // register form visible
    browser.expect
      .element('#signinForm')
      .to.have.css('display')
      .which.contains('none'); // login form hidden
    browser.expect
      .element('#signupForm > button > i')
      .to.have.css('display')
      .which.contains('none'); // fa process spinner hidden
    browser.pause(1000);
  },
  'it should display login form when user clicks "signin" link': browser => {
    browser
      .click('#signupForm > div.form-links > a')
      .expect.element('#loginPanel > div')
      .to.have.css('display')
      .which.contains('none'); // hide register form
    browser.expect
      .element('#signinForm')
      .to.have.css('display')
      .which.contains('block'); // display login form
    browser.pause(1000);
  },
  'it should check for required fields': browser => {
    browser.expect
      .element('#signupForm > div > div > input') // all inputs are reqd
      .to.have.attribute('required');
    browser.expect.element('#login_textbox, #password_textbox').to.have.attribute('required');
    browser.pause(1000);
  },
  'Should throw invalid username error'(browser) {
    browser
      .click('#signinForm > div.form-links > a.welcome')
      .setValue('#signupForm > div:nth-child(3) > div > input', 'as')
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', '07068356519')
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast')
      .text.to.contain('Username must not be less than 4 characters');
    clearSignupInputFields(browser);
  },
  'Should test for invalid full name'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', 'ann')
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', '07068356519')
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast')
      .text.to.contain('Full name must not be less than 4 characters');
    clearSignupInputFields(browser);
  },
  'Should test for invalid email'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', 'anaeze@')
      .setValue('#signupForm > div:nth-child(6) > div > input', '07068356519')
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button');
    clearSignupInputFields(browser);
  },
  'Should test for invalid password'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', '07068356519')
      .setValue('#signupForm > div:nth-child(7) > div > input', 'pas')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'pas')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast')
      .text.to.contain('Password must be up to 6 characters');
    clearSignupInputFields(browser);
  },
  'Should test for password matching'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', '07068356519')
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'pasukjjksword1')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 1000)
      .expect.element('.toast')
      .text.to.contain('Passwords do not match');
    clearSignupInputFields(browser);
  },
  'Should check for invalid phone number'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', faker.phone.phoneNumber())
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button');
    clearSignupInputFields(browser);
  },
  'Should check for invalid phone number from server'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', faker.random.number())
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 4000)
      .expect.element('.toast')
      .text.to.contain('None or invalid phone no., include (+) and country code');
    clearSignupInputFields(browser);
  },
  'Should successfully signup new user'(browser) {
    browser
      .setValue('#signupForm > div:nth-child(3) > div > input', username)
      .setValue('#signupForm > div:nth-child(4) > div > input', fullname)
      .setValue('#signupForm > div:nth-child(5) > div > input', email)
      .setValue('#signupForm > div:nth-child(6) > div > input', realPhone)
      .setValue('#signupForm > div:nth-child(7) > div > input', 'password1')
      .setValue('#signupForm > div:nth-child(8) > div > input', 'password1')
      .pause(3000)
      .click('#signupForm > button')
      .waitForElementVisible('.toast', 4000)
      .expect.element('.toast')
      .text.to.contain('Signup successfull');
    browser.pause(2000);
  },
  'Should check new user profile'(browser) {
    browser
      .click('#root > div > nav > a')
      .pause(1000)
      .click('.nav-item.user-profile')
      .pause(3000);
  },
  'Should successfully logout successfully'(browser) {
    browser
      .click('#root > div > nav > a')
      .pause(1000)
      .click('.nav-item.logout')
      .pause(3000);
  },
  'Should throw error when login new user with wrong password'(browser) {
    browser
      .setValue('#login_textbox', username)
      .setValue('#password_textbox', `${faker.internet.password()} ${faker.internet.password()}`)
      .pause(2000)
      .click('#login')
      .waitForElementVisible('.toast', 4000)
      .expect.element('.toast')
      .text.to.contain('Invalid Login Details');
    browser.pause(2000);
    browser
      .clearValue('#login_textbox')
      .clearValue('#password_textbox')
      .pause(1000);
  },

  'Should successfully login again with new user credentials'(browser) {
    browser
      .setValue('#login_textbox', username)
      .setValue('#password_textbox', 'password1')
      .pause(2000)
      .click('#login')
      .waitForElementVisible('.toast', 4000)
      .expect.element('.toast')
      .text.to.contain('Login successfull');
    browser.pause(2000);
  },

  'Verify that addNewEvent modal is available': browser => {
    browser
      .click('#addEvent')
      .pause(1000)
      .verify.elementPresent(modalInputs(1))
      .verify.elementPresent(modalInputs(2))
      .verify.elementPresent(modalInputs(3))
      .verify.elementPresent('#eventForm > div:nth-child(5) > textarea')
      .assert.containsText(`${modalFooter} button.btn.btn-success.createEvent`, 'Save')
      .assert.containsText(`${modalFooter} button.btn.btn-danger`, 'Cancel');
  },
  'Create center: Should throw error when new center name is too short': browser => {
    browser.setValue(modalInputs(1), 'we');
    // .setValue(modalInputs(2), imageFile)
    browser.waitForElementVisible('#displayDate', 100000000000000000000);
    browser.waitForElementVisible('#displayTime', 100000000000000000000);
    // .setValue('#displayDate', '9:45')
    // .setValue('#displayTime', '18 August, 2019')
    browser
      .setValue('#eventForm > div:nth-child(5) > textarea', faker.lorem.sentence(30))
      .click('#eventForm > div:nth-child(6) > div:nth-child(2) > button')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 5000)
      .expect.element('.toast')
      .text.to.contain('Event title should be within 4-99 characters');
    clearInputFields(browser).pause(3000);
  },
  'Create event: Should throw error when no center was selected': browser => {
    browser
      .setValue(modalInputs(1), eventTitle)
      .setValue(modalInputs(2), imageFile)
      .setValue('#eventForm > div:nth-child(5) > textarea', faker.lorem.sentence(30))
      .pause(2000)
      .click('#eventForm > div:nth-child(6) > ul > li:nth-child(4)')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 2000)
      .expect.element('.toast')
      .text.to.contain('No center selected');
    browser.pause(3000);
  },
  'Should successfully create an event': browser => {
    browser
      .click('#eventForm > div:nth-child(6) > div:nth-child(2) > button')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Action Successful');
    browser.pause(3000);
  },
  'Should modify an event': browser => {
    browser
      .click('#editEvent')
      .pause(2000)
      .clearValue(modalInputs(1))
      .pause(1000)
      .setValue(modalInputs(1), faker.lorem.words(3))
      .click('#eventForm > div:nth-child(6) > div:nth-child(2) > button')
      .pause(2000)
      .click(`${modalFooter} button.btn.btn-success.createEvent`)
      .waitForElementVisible('.toast', 6000)
      .expect.element('.toast')
      .text.to.contain('Action Successful');
    browser.pause(3000).end();
  },
};

module.exports = {
  eventTests,
};
