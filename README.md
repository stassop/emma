## Requirements

- Please avoid using 3rd-party libraries: we want to see your code and problem solving.
- App content: you can read the list of contacts and their info from a local .json file.
- Make sure your solution works on both iOS and Android.
- We expect you to implement this using modern JavaScript, extra points if you use TypeScript or Flow for type safety. You are allowed to write some native code if you have a need for it.
- **Tests are not optional.** We don’t expect good test coverage, we just want to see a few tests on the parts of your app where you think tests are most helpful.
- Have a short README file explaining how to start the app and run the test suite.
- You are free to make assumptions if you find anything ambiguous in the above instructions, just make sure to list those in the README or in comments
- Don't be afraid to cut some corners if you are tight on time. The priority should always be on showing off great code, just make sure to explain what feature you didn't have time to implement.

### Bonus tasks:

- Make your app's main component(s) reusable and package them as you would do if you were to distribute it as open source for other developers to use.
- Tapping on a profile picture should navigate to a "detail" view about the tapped contact. You are free to style that view as you like.

## Run the app

Make sure your [React Native environment](https://reactnative.dev/docs/environment-setup) is set up correctly.

Install the dependencies:

```
npm install
```

Then run:
```
npx react-native run-ios
```
or
```
npx react-native run-android
```

## Testing

### Unit

For unit tests run:

```
npm test
```

### Detox

Make sure iPhone 13 Simulator is installed.

Make sure you have all the [Detox dependencies](https://wix.github.io/Detox/docs/introduction/getting-started) installed.

All the settings are already included in `.detoxrc.json` and the `e2e` folder.

You might need to run `detox init`

Make sure the Metro bundler is running:
```
npx react-native start
```

Build the app:
```
detox build --configuration ios
```

Run the tests:
```
detox test --configuration ios
```
