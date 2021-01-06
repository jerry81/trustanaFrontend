// https://docs.cypress.io/api/introduction/api.html

const TEST_PASSWORD = 'testPassword'
const TEST_NAME = 'testName'
const TEST_EMAIL = 'testEmail'

const goHomeAndViewEncryptedStrings = (stringsExist) => {
  cy.visit('/')
  cy.contains('User Profile/个人信息')
  if (stringsExist) {
    cy.get('#profileNameVal').contains('cannot decrypt')
    cy.get('#profileEmailVal').contains('cannot decrypt')
  }
}

const decryptWithKnownPasswordAndVerifyFields = () => {
  cy.get('#home-password').clear().type(TEST_PASSWORD)
  cy.get('#submit-password').click({force:true})
  cy.get('#profileNameVal').contains(TEST_NAME)
  cy.get('#profileEmailVal').contains(TEST_EMAIL)
}

describe('Profile', () => {
  it('Profile page renders and items are encrypted.', () => {
    goHomeAndViewEncryptedStrings()
  })
  it('Can create or edit a profile', () => {
    cy.get('.profile-button').then(els => {
      const profileButton = els[0]
      if (profileButton.innerText.includes('Edit Info') || profileButton.innerText.includes('Create User')) {
        cy.wrap(profileButton).click({force:true})
        cy.get('#profile-password').clear().type(TEST_PASSWORD)
        cy.get('#profile-name').clear().type(TEST_NAME)
        cy.get('#profile-email').clear().type(TEST_EMAIL)
        cy.get('#submit-profile').click({force:true})
      }
    })
  })
  it('With known password, can decrypt', () => {
    goHomeAndViewEncryptedStrings(true)
    decryptWithKnownPasswordAndVerifyFields()
  })
})
