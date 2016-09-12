import React, {PropTypes} from 'react'
import { ScrollView, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import { Metrics } from '../Themes'

// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import KanjiActions from '../Redux/KanjiRedux'

// Styles
import styles from './Styles/KanjiViewScreenStyle'

// I18n
import I18n from 'react-native-i18n'
import KanjiService from '../Services/KanjiService'
import KanjiComponent from '../Components/KanjiComponent'

class KanjiViewScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {
    this.props.searchKanji(this.props.kanjiContent.keyword)
  }

  render () {
    // let tangos = require('../Fixtures/tangos.json');
    let tangos = [];
    const datas = KanjiService.getTangoByKeyword(this.props.kanjiContent.keyword)
    Object.keys(datas).forEach(function(key) {
      tangos.push(datas[key]);
    });
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode='stretch' />
        <ScrollView style={styles.container}>

          <KanjiComponent kanjiContent={this.props.kanjiContent} tangos={tangos}/>

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
    searchKanji: (keyword) => dispatch(KanjiActions.kanjiSearch(keyword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanjiViewScreen)
