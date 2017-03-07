import {take, call, put} from 'redux-saga/effects'
import R from 'ramda'
import I18n from 'react-native-i18n'

import Toast from 'react-native-root-toast';
import KanjiActions from '../Redux/KanjiRedux'
import KanjiService from '../Services/KanjiService'

export function * searchKanji (action) {
  const {keyword} = action
  try {
    const kanjis = yield call(KanjiService.getKanjiMatome, keyword)
    if (kanjis) {
      yield put(KanjiActions.kanjiReceive(kanjis[0]))
    } else {
      yield put(KanjiActions.kanjiNotFound())
    }
  } catch (error) {
    Toast.show(I18n.t('cantFindTheKanji'))
    yield put(KanjiActions.kanjiNotFound())
  }
}
