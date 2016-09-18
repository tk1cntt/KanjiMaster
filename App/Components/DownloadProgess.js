import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/DownloadProgessStyle'

import Toast from 'react-native-root-toast';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'react-native-fetch-blob'
import ZipArchive from 'react-native-zip-archive'

import StartupActions from '../Redux/StartupRedux'

class DownloadProgess extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      output: 0
    }
  }

  downloadFileFromLink() {
    let sourcePath = "https://raw.githubusercontent.com/tk1cntt/KanjiMaster/master/App/Fixtures/samples.zip";
    let targetPath;

    const dirs = RNFetchBlob.fs.dirs
    RNFetchBlob.config({ trusty : true, fileCache : true, path : dirs.DocumentDir + '/sample.zip'})
    .fetch('GET', sourcePath)
    .progress((received, total) => {
      var x = received/total;
      this.setState({
        output: x
      });
    })
    .then((resp) => {
      ZipArchive.unzip(resp.path(), dirs.DocumentDir)
      .then(() => {
        Toast.show("Download successful")
        RNFetchBlob.fs.ls(dirs.DocumentDir)
        // files will an array contains filenames
        .then((files) => {
            console.log(files)
        })
        this.props.initiativeDatabase();
      })
      .catch((error) => {
        Toast.show("Please check the storage size")
        console.log(error)
      })
      resp.flush()
    })
    .catch((err) => {
      Toast.show("Please check the network connection")
      console.log(error)
    })
  }

  render () {
    return (
      <View>
        <TouchableOpacity style={styles.box} onPress={() => this.downloadFileFromLink()}>
          <Text style={styles.text}>Download data</Text>
        </TouchableOpacity>
        <Progress.Bar progress={this.state.output} width={320} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initiativeDatabase: () => dispatch(StartupActions.initiativeDatabase())
  }
}

export default connect(null, mapDispatchToProps)(DownloadProgess)
