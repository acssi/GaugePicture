define(["./sourceImageOptions", "./colorOptions"], function () {
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
                uses: "measures",
                min: 1,
                max: 1,
                //	ref:'vMeasure'
            },
            sorting: {
                uses: "sorting",
                show: false
            },
            settings: {
                uses: "settings",
                items: {
                    gaugeGroup: {
                        label: "Gauge settings",
                        type: "items",
                        items: {
                            minValue: {
                                type: "integer",
                                ref: "minValue",
                                label: "minValue",
                                defaultValue: 0
                            },
                            maxValue: {
                                type: "integer",
                                ref: "maxValue",
                                label: "maxValue",
                                defaultValue: 100
                            },
                            orientation: {
                                type: "string",
                                component: "buttongroup",
                                label: "Orientation",
                                ref: "orientation",
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
                                ref: "reversed",
                                options: [{
                                    value: true,
                                    label: "Yes"
                                  }, {
                                    value: false,
                                    label: "No"
                                  }],
                                defaultValue: false
                            },

                            presentation: {
                                type: "string",
                                component: "dropdown",
                                label: "Presentation",
                                ref: "presentation",
                                options: [{
                                    label: "Opacity scale",
                                    value: "alpha"
                            }, {
                                    label: "Fill with color",
                                    value: "colorFill"
                            }],
                                defaultValue: "alpha"
                            },

                            //color: colorOptions,


                            opacity: {
                                ref: "opacity",
                                label: "Opacity",
                                type: "number",
                                defaultValue: 0.5,
                                component: "slider",
                                min: 0,
                                max: 1,
                                step: 0.01,
                                show: function (data) {
                                    return (data.presentation == "alpha")
                                }
                            },

                            textColor: {
                                type: "string",
                                component: "color-picker",
                                ref: "textColor",
                                label: "Text Color",
                                defaultValue: 1
                            }
                        }
                    }, // end gaugeGroup
                    sourceImage: sourceImageOptions,
                    color: colorOptions
                }
            }

        }
    }

});