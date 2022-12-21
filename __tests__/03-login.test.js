const frisby = require('frisby');

const url = 'http://localhost:3000';
const tokenCollection = [];

describe('3 - Crie o endpoint POST /login', () => {
  it('Será validado que o endpoint deve ser capaz de retornar um token de 16 caracteres', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .expect('status', 200)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.token.length).toBe(16);
      });
  });

  it('Será validado que o endpoint deve ser capaz de retornar tokens aleatórios de 16 caracteres', async () => {
    const generateToken = async () => {
      let token;
      await frisby
        .post(`${url}/login`, {
          body: {
            email: 'deferiascomigo@gmail.com',
            password: '12345678',
          },
        })
        .expect('status', 200)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);
          expect(result.token.length).toBe(16);
          token = result.token;
        });
      return token;
    };
    for (let round = 0; round < 10; round++) {
      tokenCollection.push(await generateToken());
    }
    tokenCollection.sort();
    const setOfToken = [...new Set(tokenCollection)];
    setOfToken.sort();
    expect(setOfToken.length).toBeGreaterThanOrEqual(
      tokenCollection.length / 2,
    );
  });
});
