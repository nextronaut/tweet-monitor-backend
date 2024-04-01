import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { Tweet } from './interfaces/tweet.interface';

describe('TweetsController', () => {
  let controller: TweetsController;
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers: [
        {
          provide: TweetsService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              content: 'Test tweet',
              platform: 'Twitter',
              platformId: '123',
            }),
            findAll: jest.fn().mockResolvedValue([
              { id: '1', content: 'Test tweet', platform: 'Twitter', platformId: '123' },
              { id: '2', content: 'Another test tweet', platform: 'Twitter', platformId: '456' },
            ]),
            findByPlatform: jest.fn().mockImplementation((platform: string) =>
              Promise.resolve([
                { id: '1', content: 'Test tweet', platform: platform, platformId: '123' },
              ]),
            ),
            findDetectedTweet: jest.fn().mockImplementation((platform: string, platformId: string) =>
              Promise.resolve({ id: '1', content: 'Test tweet', platform: platform, platformId: platformId }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
    service = module.get<TweetsService>(TweetsService);
  });

  it('should create a tweet', async () => {
    const dto = { content: 'Test tweet', platform: 'Twitter', platformId: '123', createdAt: new Date(2000, 11, 24), hashtags:['string'], archived: true};
    expect(await controller.create(dto)).toEqual({
      id: '1',
      content: 'Test tweet',
      platform: 'Twitter',
      platformId: '123'
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all tweets', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '1', content: 'Test tweet', platform: 'Twitter', platformId: '123' },
      { id: '2', content: 'Another test tweet', platform: 'Twitter', platformId: '456' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find tweets by platform', async () => {
    const platform = 'Twitter';
    expect(await controller.findByPlatform(platform)).toEqual([
      { id: '1', content: 'Test tweet', platform: platform, platformId: '123' },
    ]);
    expect(service.findByPlatform).toHaveBeenCalledWith(platform);
  });

  it('should find a detected tweet', async () => {
    const platform = 'Twitter';
    const platformId = '123';
    expect(await controller.findDetectedTweet(platform, platformId)).toEqual({
      id: '1',
      content: 'Test tweet',
      platform: platform,
      platformId: platformId,
    });
    expect(service.findDetectedTweet).toHaveBeenCalledWith(platform, platformId);
  });
});
