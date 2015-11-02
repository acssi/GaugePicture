var sourceImageOptions= {
						type:"items",
						label:"Source image",
						items: {
							imgSourceType : {
								ref: "imgSourceType",
								type: "string",
								component: "buttongroup",
								label: "Location of image folder",
								options: [{
									value: "online",
									label: "Online Image",
								}, {
									value: "local",
									label: "use local image",
								}],
								defaultValue: "local"
              },
							imgOnlineSource : {
								ref: "imgOnlineSource",
								label: "Full URL to online image",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(data) { return data.imgSourceType=="online";}
								},
							imgLocalSource : {
								ref: "imgLocalSource",
								label: "Place your images here: >Qlik >Sense >Extensions >Gauge>images",
								type: "string",
								expression: "optional",
								defaultValue: "bottle.png",
								show: function(data) {return data.imgSourceType=="local";}
              }
							}
            };
