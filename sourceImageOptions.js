define(["qlik"], function(qlik) {
  return {
    type: "items",
    label: "Source image",
    items: {
      imgSourceType: {
        ref: "gauge.props.imgSourceType",
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
      imgOnlineSource: {
        ref: "gauge.props.imgOnlineSource",
        label: "Full URL to online image",
        type: "string",
        expression: "optional",
        defaultValue: "",
        show: function(data) {
          return data.gauge.props.imgSourceType == "online";
        }
      },
      image: {
        ref: "gauge.props.imgLocalSource",
        label: "Image",
        type: "string",
        component: "dropdown",
        show: function(data) {
          // console.log(data);
          //
          // .then(function(){console.log(data);});
          return true;
        },
        options: function() {/*Erik Wetterberg imgChart extention*/
            return qlik.currApp().getList("MediaList").then(function(e) {
              return e.getLayout().then(function() {
                return e.layout.qMediaList.qItems.map(function(e) {
                  return {
                    value: e.qUrlDef,
                    label: e.qUrlDef
                  }
                })
              })
            })
          }
          // options: function(data) {
          //   var d = [];
          //   d.push({
          //     value: '0',
          //     label: 'test'
          //   });
          //   return qlik.currApp().getList("MediaList", function(l) {
          // 		console.log(data);
          //
          //   }).then(function() {
          //     //console.log(data.qMediaList);
          //     // data.qMediaList.qItems.forEach(function(el) {
          //     //   d.push({
          //     //     value: el.qUrl,
          //     //     label: el.qUrl
          //     //   });
          //     // });
          //     console.log(data);
          //     return d;
          //   })
          // }
      }
      // imgLocalSource: {
      //   ref: "gauge.props.imgLocalSource",
      //   label: "Place your images here: >Qlik >Sense >Extensions >Gauge>images",
      //   type: "string",
      //   expression: "optional",
      //   defaultValue: "bottle.png",
      //   show: function(data) {
      //     return data.gauge.props.imgSourceType == "local";
      //   }
      // }
    }
  };
})
