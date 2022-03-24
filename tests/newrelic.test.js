const helpers = require('../../test/test-helper');
const newrelic = require('../functions/newrelic').handler;
const Twilio = require('twilio');

const event = {};

const mockRecord = {
  get: jest.fn(() => '+1234567890'),
};
const mockAllRecords = [mockRecord];

const mockNotificationChannel = {
  all: jest.fn(() => Promise.resolve(mockAllRecords)),
};

const mockNotification = {
  select: jest.fn(() => {
    return mockNotificationChannel;
  }),
};

const mockNewRelicWebhook = {
  table: jest.fn().mockImplementation(() => {
    return mockNotification;
  }),
};

const mockNewRelic = {
  base: jest.fn().mockImplementation(() => {
    return mockNewRelicWebhook;
  }),
};

jest.mock('newrelic', () => {
  return jest.fn().mockImplementation(() => {
    return mockNewRelicWebhook;
  });
});

const shouldFail = false;
const mockClient = {
  messages: {
    create: jest.fn(async () => {
      if (shouldFail) {
        throw new Error('failed to send mock alert sms');
      } else {
        return {
          sid: 'MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        };
      }
    }),
  },
};

const context = {
  getTwilioClient: () => mockClient,
  MSG_SERVICE_SID: 'MGAbcD12efG3HijK',
};

beforeAll(() => {
  helpers.setup(context);
});

afterAll(() => {
  helpers.teardown();
});

test('returns a Response', (done) => {
  const callback = (_err, result) => {
    expect(result).toBeDefined();
    done();
  };

  newrelic(context, event, callback);
});

test('sends an SMS message', (done) => {
  const callback = (_err, _result) => {
    expect(mockClient.messages.create).toHaveBeenCalledWith({
      from: 'TwilioNumber',
      to: '+1234567890',
      body: 'This is an alert message from Twilio.',
    });
    done();
  };

  newrelic(context, event, callback);
});