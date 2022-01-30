import React, { Component } from 'react'
import { Linking, Dimensions, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types'

const outbrainWidgetURL = "https://widgets.outbrain.com/reactNativeBridge/index.html"
const webViewInitialHeight = 100

export default class OutbrainWidget extends Component {
  static propTypes = {
    url: PropTypes.string,
    widgetId: PropTypes.string,
    userId: PropTypes.string,
    consentV1: PropTypes.string,
    consentV2: PropTypes.string,
    ccpaString: PropTypes.string,
    idx: PropTypes.number,
    webViewHeightPadding: PropTypes.number,
    darkMode: PropTypes.bool,
    style: PropTypes.object
  }

  static defaultProps = {
    webViewHeightPadding: 20
  }

  constructor (props) {
    super(props)
    this._onWebViewMessage = this._onWebViewMessage.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this._buildWidgetURL = this._buildWidgetURL.bind(this)
    this.__onOrganicClickWithListener = this._onOrganicClickWithListener.bind(this)
    this.state = {
      webViewHeight: webViewInitialHeight,
    }
  }

  loadMore() {
    console.log("--> loadMore()")
    this.webview.injectJavaScript('OBR.viewHandler.loadMore(); true;')
    this.webview.injectJavaScript(`setTimeout(function() {
            let result = {}
            let height = document.body.scrollHeight
            result["height"] = height
            window['ReactNativeWebView'].postMessage(JSON.stringify(result))
          }, 500)`)
  }

  _onWebViewMessage(event) {
    console.log("onMessage: " + event.nativeEvent.data)
    let result = JSON.parse(event.nativeEvent.data)
    if (result.height) {
      this.setState({ webViewHeight: result.height + this.props.webViewHeightPadding })
    }
    if (result.url) { // click on rec
      if (result.type === 'organic-rec' && this.props.onOrganicClick) {
        this._onOrganicClickWithListener(result.orgUrl, result.url)
      }
      else {
        Linking.openURL(result.url);
      }
    }
  }

  _onOrganicClickWithListener(orgUrl, recUrl) {
    // report Outbrain backend for organic click with sending traffic.outbrain url..
    let trafficUrl = recUrl + '&noRedirect=true'
    if (this.isValidURL(trafficUrl)) {
      console.log("calling GET - " + trafficUrl)
      fetch(trafficUrl)
      .then((response) => console.log("report organic click response status: " + response.status))
      .catch((error) => {
        console.error('Error reporting organic click: ' + trafficUrl + ', error: ' + error);
      });
    }
    // notify app developer on original url
    this.props.onOrganicClick(orgUrl)
  }

  isValidURL(string) {
    let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  _buildWidgetURL() {
    if (!this.props.url || !this.props.widgetId) {
      console.error("OutbrainWidget - url and widgetId are mandatory props, at least one of them is missing.")
    }
    let url = `${outbrainWidgetURL}?permalink=${this.props.url}&widgetId=${this.props.widgetId}`
    if (this.props.userId) {
      url += `&userId=${this.props.userId}`
    }
    if (this.props.installationKey) {
      url += `&installationKey=${this.props.installationKey}`
    }
    if (this.props.consentV1) {
      url += `&cnsnt=${this.props.consentV1}`
    }
    if (this.props.consentV2) {
      url += `&cnsntv2=${this.props.consentV2}`
    }
    if (this.props.ccpaString) {
      url += `&ccpa=${this.props.ccpaString}`
    }
    if (this.props.darkMode) {
      url += `&darkMode=true`
    }
    return url
  }

  render() {
    const widgetUrl = this._buildWidgetURL()
    const screenWidth = Math.round(Dimensions.get('window').width);
    console.log("OutbrainWidget rendering: " + widgetUrl)
    return (
      <WebView
        source={{uri: widgetUrl}}
        cacheEnabled={false}
        overScrollMode="never"
        mediaPlaybackRequiresUserAction={true}
        ref={input => this.webview = input}
        scrollEnabled={false}
        injectedJavaScript={
          `setTimeout(function() {
            let result = {}
            let height = document.body.scrollHeight
            result["height"] = height
            window['ReactNativeWebView'].postMessage(JSON.stringify(result))
          }, 200)`
        }
        onMessage={this._onWebViewMessage}
        style={[styles.webView, {
          height: this.state.webViewHeight,
          width: screenWidth,
          opacity: 0.99,
          backgroundColor:'transparent'
        }, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 0,
    marginTop: 20,
    alignSelf: 'center'
  }
});
