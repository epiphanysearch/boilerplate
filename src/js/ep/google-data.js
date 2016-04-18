define(["jquery"], function($){

  /**
   * GoogleDataRow takes an array of header rows and an array from the Google Data API
   * Each GoogleDataRow is an object with column header keys and string/numeric/whatever values
   */

  var GoogleDataRow = function(headerData, rowData) {

    var row = {};
    $.each(rowData, function(i, v) {
      row[headerData[i].replace(/\W/g, '').toLowerCase()] = v;
    })
    return row;

  };

  /**
   * GoogleDataTab takes an array from the Google Data API
   * Each GoogleDataTab is an object with a title string, and an array of GoogleDataRows
   */

  var GoogleDataTab = function(title, entry) {

    var matrix = [];
    var rows = [];
    var makeColumnNumber = function(val) {
      var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
      for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
      }
      return result;
    };

    $.each(entry, function(i, v) {
      var cell = v.title['$t'].match(/([A-Z]+)|([0-9]+)/gi);
      var colNumber = makeColumnNumber(cell[0])-1;
      var rowNumber = cell[1]-1;
      if (typeof matrix[rowNumber] === 'undefined') matrix[rowNumber] = [];
      matrix[rowNumber][colNumber] = v.content['$t'];
    });

    // console.log(matrix);

    $.each(matrix, function(i, v) {
      if (i !== 0) {
        rows.push(new GoogleDataRow(matrix[0],v));
      }
    });

    return {
      "title": title,
      "rows": rows
    };

  };

  /**
   * GoogleData takes an id of a Google Doc to initialise
   * It has one public method - fetchData - which takes a callback which it calls with the data as its sole argument
   * The data object is an array of GoogleDataTabs
   */

  var GoogleData = function(id) {

    // Gets URL and returns everything after the final '/'
    var getWorksheetId = function(url) {

      var bits = url.split('/');
      return bits[bits.length-1];

    }

    var getWorksheets = function(onComplete) {

      var worksheets = [];
      var url = "https://spreadsheets.google.com/feeds/worksheets/"+id+"/public/full?alt=json-in-script&callback=?";

      $.getJSON(url, function(r) {

        // console.log("Worksheets retrieved");
        var entry = r.feed.entry;

        $.each(entry, function(i, v) {

          var wID = getWorksheetId(v.id['$t']);
          var wTitle = v.title['$t'];

          worksheets.push({
            id:wID,
            title:wTitle
          });

          if (i === entry.length-1) {
            onComplete(worksheets);
          }

        });

      }).fail(function() {

        // console.log("Failed to retrieve worksheets");
        onComplete(false);

      });

    };

    this.fetchData = function(onComplete) {

      // If single function is passed
      var success = error = onComplete;

      // Or if object is passed
      if (typeof onComplete === 'object') {
        var success = onComplete.success;
        var error = onComplete.error;
      }

      getWorksheets(function(worksheets) {

        // Getting worksheets failed
        if (worksheets === false) {

          error('Failed to retrieve worksheets');

        } else {

          var data = [];
          //A counter variable to check if all sheets have been loaded.
          var successfulSheets = 0;

          $.each(worksheets, function(i, v) {

            var url = "https://spreadsheets.google.com/feeds/cells/"+id+"/"+v.id+"/public/basic?alt=json-in-script&callback=?";

            $.getJSON(url, function(r) {

              var tab = new GoogleDataTab(v.title, r.feed.entry);

              data.push(tab);

              successfulSheets+=1;

              if (successfulSheets === worksheets.length) {

                // console.log("Successfully retrieved data");
                success(data);

              }

            }).fail(function() {

              // console.log("Failed to retrieve data");
              error(r.textStatus);

            });

          });

        }

      });

    };

  };

  return GoogleData;

});
