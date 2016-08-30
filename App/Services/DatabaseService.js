import Database from '../Store/RealmDatabase'

export default {
  createDesk: (name) => {
    Database.write(() => {
      Database.create('Desk', {
        id: Date.now(),
        name: name,
      });
    });
  },

  getDesks: () => {
    let allDesk = Database.objects('Desk');
    return allDesk;
  },

  getDesk: (id) => {
    let desk = Database.objects('Desk').filtered('id == $0', id);
    return desk;
  },

  deleteDesk: (id) => {
    Database.write(() => {
      // Find desk by id
      let desk = Database.objects('Desk').filtered('id == $0', id);

      // Delete the desk
      Database.delete(desk);
    });
  },

  deleteDesks: () => {
    Database.write(() => {
      // Find desk by id
      let allDesk = Database.objects('Desk');

      // Delete the desk
      Database.delete(allDesk);
    });
  },

  addCard: (id, keyword) => {
    let desk = getDesk(id);
    //let tango = get

  },

  createKanjiMatome: (data) => {
    Database.write(() => {
      Database.create('KanjiMatome', {
        keyword: data.keyword,
        onyomi: data.onyomi,
        kunyomi: data.kunyomi,
        radical: data.radical,
        strokes: data.strokes,
        grade: data.grade,
        jlpt: data.jlpt,
        jouyou: data.jouyou,
        rtk6th: data.rtk6th,
        rank: data.rank,
      }, true);
    });
  },

  createKanjiMatomes: (datas) => {
    Database.write(() => {
      datas.map((data) => {
        Database.create('KanjiMatome', {
          keyword: data.keyword,
          onyomi: data.onyomi,
          kunyomi: data.kunyomi,
          radical: data.radical,
          strokes: data.strokes,
          grade: data.grade,
          jlpt: data.jlpt,
          jouyou: data.jouyou,
          rtk6th: data.rtk6th,
          rank: data.rank
        }, true);
      })
    });
  },

  getKanjiMatome: (keyword) => {
    let kanji = Database.objects('KanjiMatome').filtered('keyword == $0', keyword);
    return kanji;
  },

  getKanjiMatomes: () => {
    let sortProperties = [];
    sortProperties.push(["jlpt", true]);
    sortProperties.push(["rtk6th", false]);
    sortProperties.push(["rank", false]);
    let allKanji = Database.objects('KanjiMatome').sorted(sortProperties);
    let firstKanji = allKanji.slice(200,300);
    firstKanji.map((kanji) => {
      console.log(kanji);
      //i++;
      //if (i > 5) break;
    })
    return allKanji;
  },

  getKanjiMatomes: (startIndex, endIndex) => {
    let sortProperties = [];
    sortProperties.push(["jlpt", true]);
    sortProperties.push(["rtk6th", false]);
    sortProperties.push(["rank", false]);
    let allKanji = Database.objects('KanjiMatome').sorted(sortProperties);
    let rangeKanji = allKanji.slice(startIndex,endIndex);
    return rangeKanji;
  },

  getSetting: (key) => {
    let settings = Database.objects('Setting').filtered('key == $0', key);
    return settings;
  },

  setSetting: (key_, value_) => {
    Database.write(() => {
      Database.create('Setting', {
        key: key_,
        value: value_
      }, true);
    });
  },
}
