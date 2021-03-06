import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {
    createWC: function(e) {
      e.preventDefault();
      var searchTerm = Ember.$('#input-search').val();
      // var searchTerm = this.get('input-search');
      console.log('searchTerm' + searchTerm);
      var promise = Ember.$.ajax({
        url: "http://45.55.213.242:3000/api/twitter/" + searchTerm,
      })

      promise.then(function(rawWordList) {
        // add search term to stopwords
        var addStopWords = searchTerm.split(' ').join(',');
        stopWords += addStopWords;

        var counterList = getWordCounter(rawWordList.cleanTweetsArr);
        var sentiList = parsePieData(rawWordList.sentiArr);

        pieChartInit(sentiList, searchTerm);

        new WordCloud(document.getElementById('my_canvas'), {
          list: counterList
            // minSize: 9
            // fontFamily:'Lato'
        });
      });
    }

  }

});
