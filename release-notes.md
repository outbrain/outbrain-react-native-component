# outbrain-react-native module - Release Notes

## v1.4.0 - Jan 30, 2022

- Fix crash on Android 11+ with react-native-webview

## v1.3.1 - Jan 25, 2022

- Dark mode support - new prop for `OutbrainWidget` - `darkMode`.
- Change default background of `OutbrainWidget` to transparent.

## v1.3.0 - June 14, 2021

- Added a new prop for `OutbrainWidget` - `webViewHeightPadding` following a request from publisher.
- Fixed issue with flipper and Xcode 12.5 - [see reference](https://stackoverflow.com/questions/66189325/xcode-throws-atomic-notify-oneunsigned-long-is-unavailable)


## v1.2.1 - Feb 8, 2021

- Fix: Video autoplay on iOS opens in full screen instead of inline.

## v1.2.0 - Dec 16, 2020

- Feature: support GDPR, CCPA string - pass as props to `OutbrainWidget`
- Fix dependency react-native-webview error if included twice in a project [#8](https://github.com/outbrain/outbrain-react-native-component/pull/8)
- Bump react-native-webview from 10.10.0 to 11.0.0

## v1.1.0 - Nov 4, 2020

- Infrastructure - update to React Native 0.63.3 (was 0.60.0)
- Infrastructure - update to iOS14
- Update lib "react-native-webview": "^10.10.0"

## v1.0.3 - Jul 7, 2020

- Feature - add support for onOrganicClick()

## v1.0.2 - Apr 5, 2020

- Feature - add support for installationKey param

## v1.0.1 - Feb 10, 2020

- First release
