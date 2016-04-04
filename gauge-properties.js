define(["./sourceImageOptions", "./colorOptions"], function(sourceImageOptions,colorOptions) {
  //console.log(sourceImageOptions);

  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: {
        uses: "dimensions",
        min: 0,
        max: 0,
        show: false
      },
      measures: {
        type: 'items',
        uses: "measures",
        min: 1,
        max: 1
      },
      sorting: {
        uses: "sorting",
        show: false
      },

      settings: {
        uses: "settings",
        items: {
          gaugeGroup: {
            label: "Présentation",
            type: "items",
            items: {
              minValue: {
                type: "string",
                ref: "measureAxis.min",
                label: "Min.",
                expression:'always',
                defaultValue:'0'

              },
              maxValue: {
                type: "string",
                ref: "measureAxis.max",
                label: "Max.",
                expression:'always',
                defaultValue:'100'
              },
              orientation: {
                type: "string",
                component: "buttongroup",
                label: "Orientation",
                ref: "gauge.props.orientation",
                options: [{
                  value: "vertical",
                  label: "Vertical",
                }, {
                  value: "horizontal",
                  label: "Horizontal",
                }],
                defaultValue: "vertical"
              },

              reversed: {
                type: "boolean",
                component: "switch",
                label: "Reversed",
                ref: "gauge.props.reversed",
                options: [{
                  value: true,
                  label: "Yes"
                }, {
                  value: false,
                  label: "No"
                }],
                defaultValue: false
              },

              displayValue: {
                type: "boolean",
                component: "switch",
                label: "Display measure value",
                ref: "gauge.props.displayValue",
                options: [{
                  value: true,
                  label: "Yes"
                }, {
                  value: false,
                  label: "No"
                }],
                defaultValue: true
              },

              displayLabel: {
                type: "boolean",
                component: "switch",
                label: "Display measure label",
                ref: "gauge.props.displayLabel",
                show:function(data){
                  return data.gauge.props.displayValue;
                },
                options: [{
                  value: true,
                  label: "Yes"
                }, {
                  value: false,
                  label: "No"
                }],
                defaultValue: true
              },

              presentation: {
                type: "string",
                component: "dropdown",
                label: "Type",
                ref: "gauge.props.presentation",
                options: [{
                  label: "Opacity scale",
                  value: "alpha"
                }, {
                  label: "Fill with color",
                  value: "colorFill"
                }],
                defaultValue: "alpha"
              },
              color: colorOptions,

              //color: colorOptions,


              opacity: {
                ref: "gauge.props.opacity",
                label: "Opacity",
                type: "number",
                defaultValue: 0.5,
                component: "slider",
                min: 0,
                max: 1,
                step: 0.01,
                show: function(data) {
                  return (data.gauge.props.presentation == "alpha")
                }
              }


            }
          }, // end gaugeGroup
          sourceImage: sourceImageOptions,

        }
      }

    }
  }

});
