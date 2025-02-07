const request = require('supertest');
const app = require('../src/server');

let token;

beforeAll(async () => {
  // Register & login user to get token
  await request(app).post('/api/users/register').send({
    username: 'taskuser',
    password: 'taskpass'
  });
  const loginRes = await request(app).post('/api/users/login').send({
    username: 'taskuser',
    password: 'taskpass'
  });
  token = loginRes.body.token;
});

describe('Task Endpoints', () => {
  let createdTaskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test Description' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.task).toHaveProperty('_id');
    createdTaskId = res.body.task._id;
  });

  it('should get tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should mark task as complete', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${createdTaskId}/complete`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.task.status).toBe('completed');
  });

  it('should delete the task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted');
  });
});
