# Outbrain React Native Demo

Project used [this tutorial](https://www.freecodecamp.org/news/how-to-publish-a-react-native-component-to-npm-its-easier-than-you-think-51f6ae1ef850/) for referene.

use `npm pack` to test locally

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


## Usage

### Import Outbrain Module

```
import { OutbrainWidget } from 'react-native-outbrain'
```

### Example for displaying a regular widget

```
<OutbrainWidget
  url={"http://ofirlevy1234.blogspot.com"}
  widgetId={"MB_2"}
  userId={this.state.IDFA}
/>
```

### Example for displaying a Smartfeed widget

```
<OutbrainWidget
  url={"http://ofirlevy1234.blogspot.com"}
  widgetId={"MB_1"}
  ref={input => this.outbrainWidget = input}
  userId={this.state.IDFA}
/>
```

#### Example for detect scroll to bottom

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


### Release a new version

1. Edit version in package.json in root dir
2. npm login
3. npm publish
