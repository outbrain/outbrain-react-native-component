import React, { Component } from 'react'
import { Linking, Dimensions, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types'

const outbrainWidgetURL = "https://widgets.outbrain.com/reactNativeBridge/index.html"

export default class OutbrainWidget extends Component {
  static propTypes = {
    url: PropTypes.string,
    widgetId: PropTypes.string,
    userId: PropTypes.string,
    idx: PropTypes.number,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    this._onWebViewMessage = this._onWebViewMessage.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this._buildWidgetURL = this._buildWidgetURL.bind(this)
    this.state = {
      webViewHeight: 1,
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
      this.setState({ webViewHeight: result.height })
    }
    if (result.url) {
      Linking.canOpenURL(result.url).then(supported => {
        if (supported) {
          Linking.openURL(result.url);
        }
      })
    }
  }

  _buildWidgetURL() {
    if (!this.props.url || !this.props.widgetId) {
      console.error("OutbrainWidget - url and widgetId are mandatory props, at least one of them is missing.")
    }
    let url = `${outbrainWidgetURL}?permalink=${this.props.url}&widgetId=${this.props.widgetId}`
    if (this.props.userId) {
      url = url + `&userId=${this.props.userId}`
    }
    return url
  }

  render() {
    const widgetUrl = this._buildWidgetURL()
    const screenWidth = Math.round(Dimensions.get('window').width);
    console.log("OutbrainWidget loading: " + widgetUrl)
    return (
      <WebView
        source={{uri: widgetUrl}}
        cacheEnabled={false}
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
        style={[styles.webView, this.props.style, {height: this.state.webViewHeight, width: screenWidth*0.9}]}
      />
    )
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 0,
    marginTop: 20,
  }
});
