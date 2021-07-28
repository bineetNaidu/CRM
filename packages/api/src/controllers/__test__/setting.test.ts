import request from 'supertest';
import app from '../../app';
import { defaultSetting } from './test.utils';

it('should create a new setting', async () => {
  const { body: setting } = await request(app)
    .post('/api/settings')
    .send(defaultSetting)
    .expect(201);
  expect(setting.data.crmName).toEqual(defaultSetting.crmName);
  expect(setting.data.timezone).toEqual(defaultSetting.timezone);
});

it('should update a setting', async () => {
  await request(app).post('/api/settings').send(defaultSetting).expect(201);

  const { body: updatedSetting } = await request(app)
    .put(`/api/settings`)
    .send({
      crmName: 'updated crm name',
      timezone: 'updated timezone',
    })
    .expect(200);
  expect(updatedSetting.data.crmName).toEqual('updated crm name');
  expect(updatedSetting.data.timezone).toEqual('updated timezone');
});

// a test to return 500 if updating the setting while the setting does not exist
it.todo(
  'should return 500 if updating a setting that does not exist'
  // async () => {
  //   const { body: updatedSetting } = await request(app)
  //     .put('/api/settings')
  //     .send({
  //       crmName: 'updated crm name',
  //       timezone: 'updated timezone',
  //     })
  //     .expect(500);
  //   console.log(updatedSetting);

  //   expect(updatedSetting.message).toEqual('Setting not found');
  // }
);

it('should return 409 if creating multiple settings', async () => {
  await request(app).post('/api/settings').send(defaultSetting).expect(201);
  await request(app).post('/api/settings').send(defaultSetting).expect(409);
});
