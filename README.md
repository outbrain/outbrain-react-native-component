# Outbrain React Native Demo

Project used [this tutorial](https://www.freecodecamp.org/news/how-to-publish-a-react-native-component-to-npm-its-easier-than-you-think-51f6ae1ef850/) for referene.

use `npm pack` to test locally

See the [Release Notes](release-notes.md) for the latest version details.

## Installation

Using npm:

```shell
npm install --save react-native-outbrain
```

or using yarn:

```shell
yarn add react-native-outbrain
```

## Widget Settings (AMPM)

### Custom Clicks Handler (982) = enable
Must be set so all click will be passed to the native function. if a feed is in use then change this setting to all the feed child widgets

### Feed Manual Chunk Fetch (919) = enable
On ReactNative the native scroll will not work, managing the fetching of next cards is done from the app.

In general please refer to this [Outbrain Confluence page](https://confluence.outbrain.com/display/CATS/React+Native+Bridge+project)


## Example Apps - Download Links

[iOS Demo download link](https://install.appcenter.ms/users/oregev/apps/react-native-ios-demo/distribution_groups/public)

[Android Demo download link](https://install.appcenter.ms/users/oregev/apps/react-native-android-demo/distribution_groups/public)


## Usage

### Import Outbrain Module

```
import { OutbrainWidget } from 'react-native-outbrain'
```

### Example for displaying a regular widget

```
<OutbrainWidget
  url={"http://mobile-demo.outbrain.com"}
  widgetId={"MB_2"}
  installationKey={"NANOWDGT01"}
  userId={this.state.IDFA}
/>
```

### Example for displaying a Smartfeed widget

```
<OutbrainWidget
  url={"http://mobile-demo.outbrain.com"}
  widgetId={"MB_1"}
  installationKey={"NANOWDGT01"}
  ref={input => this.outbrainWidget = input}
  userId={this.state.IDFA}
/>
```

### Example for detect scroll to bottom

```
isCloseToBottom ({layoutMeasurement, contentOffset, contentSize}) {
  const paddingToBottom = 50;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

<ScrollView
  style={styles.container}
  showsVerticalScrollIndicator={false}
  onMomentumScrollEnd={({nativeEvent}) => {
    if (this.outbrainWidget && this.isCloseToBottom(nativeEvent)) {
      console.log("onMomentumScrollEnd - isCloseToBottom")
      this.outbrainWidget.loadMore()
    }
  }}>
```

### GDPR \ CCPA Support

Use the following props to pass `OutbrainWidget` the GDPR or CCPA string from your app code.

For GDPR consent V1 use `consentV1`
For GDPR consent V2 use `consentV2`
For CCPA string use `ccpaString`


```
<OutbrainWidget
                url={"http://mobile-demo.outbrain.com"}
                widgetId={"MB_1"}
                installationKey={"NANOWDGT01"}
                consentV1={"1111111"}
                consentV2={"2222222"}
                ccpaString={"3333333"}
                style={{width: screenWidth*1}}
                ref={input => this.outbrainWidget = input}
                userId={this.state.IDFA}
              />
```

### Example for getting IDFA

```
import { IDFA } from 'react-native-idfa';

componentDidMount() {
  IDFA.getIDFA().then((idfa) => {
    this.setState({ IDFA: idfa, });
  })
  .catch((e) => {
    console.error(e);
  });
}
```

### Example for organic click custom listener

```
<OutbrainWidget
  url={"http://mobile-demo.outbrain.com"}
  widgetId={"MB_1"}
  installationKey={"NANOWDGT01"}
  onOrganicClick={orgUrl => console.log("In App - click on: " + orgUrl)}
  style={{width: screenWidth*1}}
  ref={input => this.outbrainWidget = input}
  userId={this.state.IDFA}
/>
```


### Development Setup

Edit package.json with `"react-native-outbrain": "../../"`

### Test a new version

1. update version in package.json
2. run `npm pack` --> creates `eact-native-outbrain-1.0.3.tgz` for example.
3. in /examples/examples/DemoProject `yarn add ../../react-native-outbrain-1.0.3.tgz`

### Release a new version

1. Edit version in package.json in root dir
2. npm login
3. npm publish
