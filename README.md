# Outbrain React Native Demo

Use the tutorial on https://www.freecodecamp.org/news/how-to-publish-a-react-native-component-to-npm-its-easier-than-you-think-51f6ae1ef850/

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

## Usage

### Import Outbrain Module

```
import { OutbrainWidget } from 'react-native-outbrain'
```

### Example for displayinga a regular widget

```
<OutbrainWidget
  url={"http://ofirlevy1234.blogspot.com"}
  widgetId={"MB_2"}
  userId={this.state.IDFA}
/>
```

### Example for displayinga a Smartfeed widget

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
