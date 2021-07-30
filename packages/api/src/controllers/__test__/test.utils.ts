export const defaultCustomer = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  phoneNumber: '(000) 000 0000',
  timezone: 'Pacific time',
  avatar:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fbootstrap%2Fimg_avatar3.png&f=1&nofb=1',
  notes: [],
  deals: [],
};

export const defaultDeal = {
  name: 'test',
  description: 'test',
  startDate: new Date().toISOString(),
  endDate: new Date(new Date().setHours(72)).toISOString(),
  estimatedTime: 1633545000000,
};

export const defaultSetting = {
  crmName: 'test',
  timezone: 'IST',
};