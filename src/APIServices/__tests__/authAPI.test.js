import moxios from 'moxios';
// import resolveBaseUrl from '../index';
import AuthenticationAPI from '../authAPI';

const baseUrl = 'http://127.0.0.1:4000/api';

describe('Authentication APIs', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('successfully registers a new user', async () => {
    const userData = {
      firstName: 'Sammy',
      lastName: 'Emeka',
      email: 'em@em.com',
      password: '123abc'
    }
  
    moxios.stubRequest(`${baseUrl}/users/register`, {
      status: 201,
      response: {
        message: 'User successfully registered'
      },
    });

    const response = await AuthenticationAPI.registerUser(userData);


    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/users/register`);

    expect(response.data).toEqual({
      message: 'User successfully registered'
    })
  })

})
