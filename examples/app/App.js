/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import PropTypes from 'prop-types'
import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Image,
  Text,
  Linking,
  Dimensions,
  StatusBar,
} from 'react-native';

import { WebView } from 'react-native-webview';
import { IDFA } from 'react-native-idfa';

import { OutbrainWidget } from 'react-native-outbrain'
const OutbrainHTML = require('./assets/outbrain/index.html');


export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showSmartfeed: true,
      showRegularWidget: true,
      IDFA: null,
    }
  }

  componentDidMount() {
    IDFA.getIDFA().then((idfa) => {
      this.setState({ IDFA: idfa, });
    })
    .catch((e) => {
      console.error(e);
    });
  }

  isCloseToBottom ({layoutMeasurement, contentOffset, contentSize}) {
    const paddingToBottom = 50;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={({nativeEvent}) => {
              if (this.outbrainWidget && this.isCloseToBottom(nativeEvent)) {
                console.log("onMomentumScrollEnd - isCloseToBottom")
                this.outbrainWidget.loadMore()
              }
            }}>

            <Text style={styles.articleTitle}>
              {"Jose Mourinho agrees deal to replace Mauricio Pochettino as Tottenham manager"}
            </Text>
            <Text style={styles.articleSubtitle}>
              {"The Portuguese boss had been out of work since being sacked by Manchester United in December 2018."}
            </Text>
            <View style={styles.articleAuthorContainer}>
              <Image
                style={{width: 65, height: 65, borderRadius: 32}}
                source={require('./assets/Images/skynews-tom-gillespie-news-reporter_4616217.jpg')} />
                <View style={{marginLeft: 15, marginTop: 5, alignSelf: 'flex-start'}}>
                  <Text style={styles.authorName}>
                    {"Tom Gillepie"}
                  </Text>
                  <Text style={styles.authorDescription}>
                    {"News reporter @TomGillespie1"}
                  </Text>
                </View>
            </View>
            <Text style={styles.articleDatetime}>
              {"Wednesday 20 November 2019 12:12, UK"}
            </Text>

            <Image
              style={{height: 250, marginLeft: -20, width: screenWidth, marginTop: 10, resizeMode: 'contain'}}
              source={require('./assets/Images/skynews-jose-mourinho_4841610.jpg')} />

            <Text style={styles.articleContent}>
              {"Jose Mourinho has agreed a deal to replace Mauricio Pochettino as Tottenham's manager until the end of the 2022/23 season.\
              \n\nPochettino was sacked last night after five-and-a-half years in charge, and less than six months after leading Spurs to their\
               first ever Champions League final.\
               \n\nNegotiations between the London side and Mourinho's representatives intensified over the last few days, with talks continuing into Tuesday night.\
               \n\nThe Portuguese boss had been out of work since being sacked by Manchester United in December 2018.\
               \n\nThe 56-year-old said after his appointment: \"I am excited to be joining a club with such a great heritage and such passionate supporters."}
            </Text>

            {this.state.showRegularWidget && this.state.IDFA &&
              <OutbrainWidget
                url={"http://ofirlevy1234.blogspot.com"}
                widgetId={"MB_2"}
                userId={this.state.IDFA}
              />
            }

            <Text style={styles.articleContent}>
              {"Jose Mourinho has agreed a deal to replace Mauricio Pochettino as Tottenham's manager until the end of the 2022/23 season.\
              \n\nPochettino was sacked last night after five-and-a-half years in charge, and less than six months after leading Spurs to their\
               first ever Champions League final.\
               \n\nNegotiations between the London side and Mourinho's representatives intensified over the last few days, with talks continuing into Tuesday night.\
               \n\nThe Portuguese boss had been out of work since being sacked by Manchester United in December 2018.\
               \n\nThe 56-year-old said after his appointment: \"I am excited to be joining a club with such a great heritage and such passionate supporters."}
            </Text>

            {this.state.showSmartfeed && this.state.IDFA &&
              <OutbrainWidget
                url={"http://ofirlevy1234.blogspot.com"}
                widgetId={"MB_1"}
                ref={input => this.outbrainWidget = input}
                userId={this.state.IDFA}
              />
            }


          </ScrollView>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  articleTitle: {
    fontSize: 30,
    fontWeight: '300'
  },
  articleSubtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '200'
  },
  articleAuthorContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  authorName: {
    fontSize: 14,
    color: "#063e7b"
  },
  authorDescription: {
    marginTop: 5,
    fontSize: 14,
    color: "#707070"
  },
  articleDatetime: {
    marginTop: 20,
    fontSize: 14,
    color: '#9f9f9f',
    alignSelf: 'flex-start'
  },
  articleContent: {
    marginTop: 25,
    fontSize: 16,
    color: '#4a4a4a'
  }
});
