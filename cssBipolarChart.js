/**
 * @author: Srivigneshwar R Prasad
 * @desc: jQuery Plugin for AMS bipolar charts
 **/

(function($) {

  $.fn.drawCSSBipolarChart = function(options) {

    var defaults = $.extend({
      colors: {  left: '#61DA7D', right: '#2E6276'},
      simpleBar: false,
      bothSides: false,
      bipolar: false,
      data: {},
      chartContainer: '<div class="chart-horiz-container"></div>',
      ul: '<ul class="chart-horiz"></ul>',
      li: '<li></li>',
      divPos: '<div class="posValue"></div>',
      divNeg: '<div class="negValue"></div>',
      spanBar: '<div class="bar"></div>',
      spanValue: '<div class="number-label"></div>',
      spanValueLabel: '<div class="valueLabel"></div>',
      transitionDelay: 3000
    }, options);

    return this.each(function() {
      var maxValue = 0, percentage, percentLeft, percentRight, data, i,$ul,$li,$chartContainer ;

      $(this).empty();
      data = defaults.data;
      $ul = $(defaults.ul);

      if(defaults.bothSides){
        defaults.bipolar = true;
      }

      for ( i = 0; i < data.length; i++) {
        $li = $(defaults.li);
        var $spanValueNeg = $(defaults.spanValue).text(data[i][0]); // Label left
        var $spanValuePos = $(defaults.spanValue).text(data[i][1]); // Label right
        var $divNeg = $(defaults.divNeg).append(defaults.spanBar).append($spanValueNeg);
        var $divPos = $(defaults.divPos).append(defaults.spanBar).append($spanValuePos);

        if (defaults.simpleBar) {
          var $spanLabel = $(defaults.spanValue).text(data[i][0]);
          $spanLabel.addClass("label-left");
          $divPos.append($spanLabel);
          $divPos.find(".number-label:first").css("left", 0).empty();
          $divNeg.hide();
          $divPos.css({
            "background": "none",
            "float": "left"
          });
        }
        $li.append($divNeg).append($divPos);
        $ul.append($li);
      }

      $chartContainer = $(defaults.chartContainer).append($ul);
      $(this).append($chartContainer);

      for (var j = 0; j < data.length; j++) {
        if (data[j][1] > maxValue) {
          maxValue = data[j][1];
        }
      }

      i = 0;
      $chartContainer.find('ul').children().each(function() {

        var value;
        value = defaults.simpleBar ? data[i][1] : data[i][2];
        var percentage = Math.round(value * 100) + '%';
        var otherPercentage = (100 - Math.round(value * 100)) + '%';
        value=Math.round(value*100)/100;
        value = value==1?0.99:value;
        value = value==0?0.01:value;
        //For simple bar chart
        if (defaults.simpleBar) {
          var barWidthPercentage = (Math.round(value * 100) / maxValue) + '%';
          $(this).find('.posValue .bar').css("background", defaults.colors.right).animate({'width': barWidthPercentage}, defaults.transitionDelay);
          $(this).find(".posValue .number-label:first").text(percentage).animate({'left': barWidthPercentage}, defaults.transitionDelay);

        }

        /*
         * @params:
         *  container - current container
         *  Percentile - width to animate the bar chart
         *  Color - Color of bars
         *  Side -  left or right side of the bar
         *  average - boolean, if the value is 0.5
         * */
        function renderChart(container, percentile, color, side, average, traitScore, hoverValue){
          var  numberLabel, animateDirection, animateOption = {};
          var ValBar;
          var hoverHTML = '<div class="hoverValue"></div>';
          if(side=="left"){
            ValBar = container.find('.negValue .bar');
            numberLabel = container.find(".negValue .number-label:first");
          }else{
            ValBar = container.find('.posValue .bar');
            numberLabel = container.find(".posValue .number-label:first");
          }
          //Append HTML
          ValBar.append(defaults.spanValueLabel);
          //Add and animate Value eg. 65%
          animateDirection = side=="left"? animateOption.right=percentile:animateOption.left=percentile;
          ValBar.find('.valueLabel').addClass(side).text(traitScore).css("border-color", color).animate(animateOption, defaults.transitionDelay);
          //Add and animate Bar
          ValBar.css("background", color).animate({'width': percentile}, defaults.transitionDelay);
          //Add hover value
          ValBar.append($(hoverHTML).text(hoverValue))
          //Apply colour to the number
          numberLabel.css({"color":color,"font-weight": 600});
        }

        if(defaults.bipolar){
          var traitScore = (value*100).toFixed(0)+"%";
          traitScore = traitScore=="100%"? "99%":traitScore;
          var hoverValue;

          if(value == 0.5){
            renderChart($(this), "1%", defaults.colors.right, "left",true ,"", "average");
            renderChart($(this), "1%", defaults.colors.left, "right",true ,traitScore, "average");
          }else if (value < 0.5) {
            hoverValue  =  Math.abs((1-value) * 100)  + "%";
            /*hoverValue  =  hoverValue=="100%"? "99%":hoverValue;*/
            percentLeft = Math.abs(((value - 0.5)*2)*100);
            renderChart($(this), percentLeft+"%", defaults.colors.right, "left",false,traitScore, hoverValue);
          }else if(value > 0.5){
            percentRight = Math.abs(100 * ((value-0.5)*2)) +"%";
            /*percentRight =  percentRight=="100%"? "99%":percentRight;*/
            hoverValue = traitScore;
            renderChart($(this), percentRight, defaults.colors.left, "right",false,traitScore, hoverValue);
          }

        }

        i++;
      });


    });
  };

}(jQuery));
