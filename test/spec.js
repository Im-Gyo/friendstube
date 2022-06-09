// const sum = function sum(a, b) {
//   return a + b;
// };

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

describe('User API Test', () => {
  test('create new user', async (done) => {
    expect(true).toBe(true);
  });

  test('should create new user', async (done) => {
    const response = await request(app).post('/user')
    .send({
        username: "testName",
        icon    : "http://localhost:3000/",
        tier    : "testTier"
    });
    
    expect(response.status).toEqual(201);
    expect(response.body.success).toEqual(true);
    done();
  });
});
