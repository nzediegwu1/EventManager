const faker = require('faker');
const { centerTests } = require('./center.test');
require('dotenv').config();

const superAdmin = process.env.SUPER_ADMIN;
const superAdminPass = process.env.SUPER_ADMIN_PASS;

const userTests = {
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
  'Check visibility of components in login page': browser => {
    browser.expect
      .element('#signinForm')
      .to.have.css('display')
      .which.contains('block'); // login form should be visible
    browser.expect
      .element('#loginPanel > div')
      .to.have.css('display')
      .which.contains('none'); // signup form should be hidden
    browser.expect
      .element('#login > i')
      .to.have.css('display')
      .which.contains('none'); // fa process spinner hidden
    browser.pause(1000);
  },

  'Should login superAdmin successfully'(browser) {
    browser
      .setValue('#login_textbox', superAdmin)
      .setValue('#password_textbox', superAdminPass)
      .pause(2000)
      .click('#login')
      .waitForElementVisible('.toast', 4000)
      .expect.element('.toast')
      .text.to.contain('Login successfull');
    browser.pause(2000);
  },
};
const tests = Object.assign(userTests, centerTests);
module.exports = {
  tests,
};
