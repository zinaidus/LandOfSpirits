'use strict';
var TestMe = {
	

	dataArray : function(filename){
		var data_array = [];
		var data_object = {};

		var _ = require('underscore')

		var row_counter = 1;
		var fs = require("fs");
		fs.readFileSync(filename).toString().split("\n")
		.forEach(function (line){ 
			var key = line.split(" ")==undefined ? "" : line.split(" ")[0].replace(":","");
			//console.log('key: ',key);
			var multi_index = line.replace(key+":","").trim().split("|");
			for (var i=0; i<multi_index.length; i++){
				
				multi_index[i] = multi_index[i].trim();
				if (multi_index[i]=="none") {multi_index[i] = "";}
				if (multi_index[i]=="same" && i>0) {multi_index[i] = multi_index[0];}
				//console.log('val: ',multi_index[i]);
			}
			if (key.indexOf("#")>-1) {
				//console.log('counter: ',row_counter%2);
				if (row_counter%2==0) {data_array.push(_.clone(data_object)); data_object={};}
				row_counter++;
			} else if(key!="") {
				data_object[key] = multi_index;
			}
			
		});
		//console.log(data_array);
		return {stories: data_array};
	}
}
//TestMe.dataArray("Stories/story-4.txt");
module.exports = TestMe;
