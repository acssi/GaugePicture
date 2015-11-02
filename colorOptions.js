colorComponent = function (rf, lbl, shw) {
    if (shw == undefined) {
        shw = true
    };
    return {
        ref: rf,
        label: lbl,
        component: "slider",
        min: 0,
        max: 255,
        step: 1,
        default: 0,
        show: shw
    }
};

rgbChooser = function (rf, lbl, shw) {
    if (shw == undefined) {
        shw = true
    };
    return {
        type: "items",
        label: lbl,
        items: {
            r: colorComponent(rf + ".red", "Red"),
            g: colorComponent(rf + ".green", "Green"),
            b: colorComponent(rf + ".blue", "Blue")
        },
        show: shw
    }
};

colorPicker = function (rf, lbl, shw) {
    if (shw == undefined) {
        shw = true
    };
    return {
        type: "string",
        component: "color-picker",
        ref: rf,
        label: lbl,
        defaultValue: 1,
        show: shw
    }
};

colorExpression = function (rf, lbl, shw) {
    if (shw == undefined) {
        shw = true
    };
    return {
        type: "string",
        ref: rf,
        expression: "optional",
        label: lbl,
        defaultValue: "blue",
        show: shw
    }
};




colorChooser = function (rf, lbl, shw) {
    return {
        type: "items",
        label: lbl,
        items: {
            colorType: {
                type: "string",
                component: "dropdown",
                label: "Color definition",
                ref: rf + ".colorType",
                options: [{
                        value: 'colorPicker',
                        label: 'ColorPicker'
      }, {
                        value: 'rgb',
                        expression: 'RGB color'
      }, {
                        value: 'expression',
                        label: 'Expression'
      }
    ],
                defaultValue: "colorPicker"

            },
            rgb: rgbChooser(rf + ".rgb", "RGB", function (data) {
                //console.log(data[rf].colorType);
                if (data[rf] == undefined || data[rf].colorType == "rgb") {
                    //  data[rf].color="rgb("+ data[rf].rgb.red+ "," +data[rf].rgb.green +","+ data[rf].rgb.blue +")";
                    return true;
                }
                return false;
            }),
            colorPick: colorPicker(rf + '.colorPicker', "Pick color", function (data) {
                if (data[rf].colorType == "colorPicker") {
                    //  data[rf].color=palette[data[rf].colorPicker];
                    return true;
                }
                return false;
            }),
            colorExpr: colorExpression(rf + '.colorExpression', "Color", function (data) {
                if (data[rf].colorType == "expression") {
                    //  data[rf].color=data[rf].colorExpression;
                    return true;
                }
                return false;
            }),


        }

    }
};






var colorOptions = {
    type: "items",
    label: "Fill Color",
    show: function (data) {
        return data.presentation == "colorFill"
    },
    items: {
        chooser: colorChooser("fillColor", "Background Color", true)

        /*
              fillType: {
                  type: "string",
                  component: "buttongroup",
                  label: "Filling mode",
                  ref: "colorOptions.fillingMode",
                  options: [{
                      value: "plain",
                      label: "Plain fill",
                  }, {
                      value: "scale",
                      label: "Scale",
                  }],
                  defaultValue: 1
              },
              colorType:{
                type:"string",
                component:"dropdown",
                label:"Color definition",
                ref: "colorOptions.colorChooser",
                options:[{
                  value:'colorPicker',
                  label:'ColorPicker'
                },{
                  value:'rgb',
                  expression:'RGB'
                },{
                  value:'expression',
                  label:'Expression'
                }
              ]
            },
              fillColor: {
                  type: "string",
                  component: "color-picker",
                  ref: "colorOptions.fillColor",
                  label: "Background Color",
                  defaultValue: 1,
                  show: function(data){return true}
              },
							imgLocalSource : {
								ref: "imgLocalSource",
								label: "Place your images here: >Qlik >Sense >Extensions >Gauge>images",
								type: "string",
								expression: "optional",
								defaultValue: "bottle.png",
								show: function(data) {return data.imgSourceType=="local";}
              }*/
    }
};