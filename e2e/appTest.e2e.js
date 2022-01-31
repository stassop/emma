describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render correctly', async () => {
    await expect(element(by.id('Avatars'))).toBeVisible();
    await expect(element(by.id('Descriptions'))).toBeVisible();
    await expect(element(by.id('Descriptions_740cd900-8082-11ec-a8a3-0242ac120002'))).toBeVisible(); // first item
    await expect(element(by.id('Descriptions_740cdb6c-8082-11ec-a8a3-0242ac120002'))).not.toBeVisible(); // second iten
  });

  it('should handle avatar scrolling', async () => {
    await element(by.type('UIScrollView').withAncestor(by.id('Avatars'))).scroll(100, 'right'); // scroll to second avatar
    await expect(element(by.id('Descriptions_740cd900-8082-11ec-a8a3-0242ac120002'))).not.toBeVisible(); // first item
    await expect(element(by.id('Descriptions_740cdb6c-8082-11ec-a8a3-0242ac120002'))).toBeVisible(); // second iten
  });

  it('should handle avatar tapping', async () => {
    await element(by.id('Avatars_740cdb6c-8082-11ec-a8a3-0242ac120002')).tap(); // tap second avatar
    await expect(element(by.id('Descriptions_740cd900-8082-11ec-a8a3-0242ac120002'))).not.toBeVisible(); // first item
    await expect(element(by.id('Descriptions_740cdb6c-8082-11ec-a8a3-0242ac120002'))).toBeVisible(); // second iten
  });

  it('should handle description swiping', async () => {
    await element(by.type('UIScrollView').withAncestor(by.id('Descriptions'))).swipe('up', 'fast', 0.25); // swipe up
    await expect(element(by.id('Descriptions_740cd900-8082-11ec-a8a3-0242ac120002'))).not.toBeVisible(); // first item
    await expect(element(by.id('Descriptions_740cdb6c-8082-11ec-a8a3-0242ac120002'))).toBeVisible(); // second iten
    await expect(element(by.id('Avatars_740cdcde-8082-11ec-a8a3-0242ac120002'))).toBeVisible(); // third avatar
  });
});
