import React, {PropTypes} from 'react'
import { ScrollView, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Images } from '../Themes'
import { Metrics } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/StartupScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class StartupScreen extends React.Component {

  static propTypes = {
    kanji: PropTypes.func,
    niteirukanji: PropTypes.func,
    douonigigo: PropTypes.func,
    settei: PropTypes.func
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Default screens for development, debugging, and alpha testing
              are available below.
            </Text>
          </View>

          <RoundedButton onPress={this.props.kanji}>
            漢字
          </RoundedButton>

          <RoundedButton onPress={this.props.niteirukanji}>
            似ている漢字
          </RoundedButton>

          <RoundedButton onPress={this.props.douonigigo}>
            同音異義語
          </RoundedButton>

          <RoundedButton onPress={this.props.settei}>
            設定
          </RoundedButton>

          <View style={styles.centered}>
            <Text style={styles.subtitle}>Made with ❤️ by Infinite Red</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    kanji: NavigationActions.kanji,
    niteirukanji: NavigationActions.niteirukanji,
    douonigigo: NavigationActions.douonigigo,
    settei: NavigationActions.settei
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen)
