//E2E Suite for functionality of app
describe('renders home page', () => {
  it('renders correctly', () => {
    cy.visit('/');
    cy.get('.main').should('exist');
  });

  it('adds and removes movie to movie list', () => {
    cy.visit('/nominations');
    cy.get('.searchbar').type('Batman');
    cy.get('.feather-search').click();
    cy.get('.poster__title').should('have.text', 'Batman');
    cy.get('.poster__button').click();
    cy.get('.card').should('be.visible');
    cy.get('.card__button').click();
    cy.get('.card').should('not.exist');
  });

  it('adds 5 nominations and submits', () => {
    const addFiveNoms = async () => {
      const movies = [
        'Batman',
        'Robin Hood',
        'The Dark Knight',
        'Matrix',
        'The Matrix Reloaded',
      ];

      const addNoms = (movie) => {
        cy.get('.searchbar').type(movie);
        cy.get('.feather-search').click();
        cy.get('.poster__title').should('have.text', movie);
        cy.get('.poster__button').click();
      };

      for (let i = 0; i < movies.length; i++) {
        addNoms(movies[i]);
      }
    };
    addFiveNoms();

    cy.get('.movie-list__button').click();
    cy.get('.checkmark');
  });

  it('checks that submitted modifier is added after submission', () => {
    cy.get('.movie-list--submitted').should('be.visible');
  });
});
