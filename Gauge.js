define(["jquery", "./gauge-properties", "./lib/paper-full.min"],
    // core.utils/theme n'est pas officielement supporté mais permet d'utiliser le colorPicker
    function ($, properties) {

        return {
            //type : "Gauge",
            //Refer to the properties file
            definition: properties,
            fields2: {
                qValueExpression: "=Count (DISTINCT $Field)"
            },
            initialProperties: {
                version: 1.3,
                fields: {
                    qValueExpression: "=Count (DISTINCT $Field)"
                }
            },

            paint: function ($element, layout) {

                //console.log(layout);

                var scope = new paper.PaperScope(),
                    qId = layout.qInfo.qId,
                    qVal = layout.qHyperCube.qGrandTotalRow[0].qNum,
                    qTxt = layout.qHyperCube.qGrandTotalRow[0].qText,
                    minVal = layout.minValue,
                    maxVal = layout.maxValue,
                    mode = layout.presentation,
                    orientation = layout.orientation,
                    opacity = layout.opacity,
                    reversed = layout.reversed,
                    html = "<canvas id='" + qId + "' style='width:100%;height:100%'></canvas>";

                $element.html(html);

                scope.setup(qId);

                with(scope) {

                    if (layout.imgSourceType == "local") {
                        imgSrc = '/Extensions/Gauge/images/' + layout.imgLocalSource
                    } else {
                        imgSrc = layout.imgOnlineSource
                    }

                    //return ;

                    var raster = new Raster({
                        crossOrigin: 'anonymous',
                        source: imgSrc,
                        //position:  [0,0]
                    });

                    raster.onLoad = function () {
                        if (layout.fillColor != undefined) {
                            fillColor = getColor(layout.fillColor);
                        };
                        view.draw();
                        raster.fitBounds(view.bounds);
                        xMax = raster.handleBounds.topRight.x;
                        yMax = raster.handleBounds.bottomRight.y;
                        topLeft = raster.bounds.topLeft;
                        bottomLeft = raster.bounds.bottomLeft;
                        topRight = raster.bounds.topRight;
                        bottomRight = raster.bounds.bottomRight;
                        width = topRight.x - topLeft.x;
                        height = bottomLeft.y - topLeft.y;


                        ratio = Math.min(1, (qVal - minVal) / (maxVal - minVal));


                        if (mode == "colorFill") {
                            draw_backgroundFill(ratio, orientation);
                        } else if (mode == "alpha") {
                            draw_alpha(ratio, orientation);
                        }

                    };

                    draw_alpha = function (ratio, orientation) {
                        rect = new Shape.Rectangle(getRect(ratio, orientation, !reversed));
                        rect.strokeColor = 'white';
                        rect.fillColor = 'white';
                        rect.opacity = 1 - opacity;
                    };


                    draw_backgroundFill = function (ratio, orientation) {
                        rect = new Shape.Rectangle(getRect(ratio, orientation, reversed));
                        rect.strokeColor = 'white';
                        rect.fillColor = fillColor;
                        rect.sendToBack();
                    };


                    getColor = function (o) //retrouve une couleur a partir d'un objet de layout généré par colorChooser dabs colorOptions.js
                        {
                            palette = ["#b0afae", "#7b7a78", "#545352", "#4477aa", "#7db8da", "#b6d7ea", "#46c646", "#f93f17", "#ffcf02", "#276e27", "#ffffff", "#000000"];
                            if (o.colorType == "rgb") {
                                return "rgb(" + o.rgb.red + "," + o.rgb.green + "," + o.rgb.blue + ")";
                                return true;
                            } else if ((o.colorType == "expression")) {
                                return o.colorExpression;
                            } else {
                                //console.log(o.colorPicker);
                                return palette[o.colorPicker];
                            }
                        };


                    getRect = function (ratio, orientation, reversed) {
                        if (orientation == "vertical") {
                            rect = new Rectangle(bottomLeft, new Point(bottomRight.x, topLeft.y + height * (1 - ratio)));
                            p = rect.topLeft;
                        } else if (orientation == "horizontal") {
                            rect = new Rectangle(topLeft, new Point(topLeft.x + width * ratio, yMax));
                            p = rect.bottomRight;
                        }

                        if (reversed == true) {
                            rect = new Rectangle(topRight, p);
                        }

                        return rect;

                    };
                }
            }
        }
    });