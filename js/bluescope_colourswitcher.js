(function ($) {
  Drupal.behaviors.changeColourBehavior = {
    attach: function (context, settings) {
      var scheme = {};
      scheme["scheme1"] = {};
      scheme["scheme2"] = {};
      scheme["scheme3"] = {};
      scheme.scheme1.name = "scheme1";
      scheme.scheme1.roofcolor = "black";
      scheme.scheme1.roofname = "limestone";
      scheme.scheme1.downpipescolor = "black";
      scheme.scheme1.downpipesname = "limestone";
      scheme.scheme1.fasiacolor = "black";
      scheme.scheme1.fasianame = "limestone";
      scheme.scheme1.garagecolor = "black";
      scheme.scheme1.gargagename = "limestone";
      scheme.scheme1.windowcolor = "black";
      scheme.scheme1.windowname = "limestone";
      scheme.scheme1.wallcolor = "black";
      scheme.scheme1.wallname = "limestone";
      scheme.scheme1.roofcolor = "black";
      scheme.scheme1.roofname = "limestone";

      scheme.scheme2.name = "scheme1";
      scheme.scheme2.roofcolor = "black";
      scheme.scheme2.roofname = "limestone";
      scheme.scheme2.downpipescolor = "black";
      scheme.scheme2.downpipesname = "limestone";
      scheme.scheme2.fasiacolor = "black";
      scheme.scheme2.fasianame = "limestone";
      scheme.scheme2.garagecolor = "black";
      scheme.scheme2.gargagename = "limestone";
      scheme.scheme2.windowcolor = "black";
      scheme.scheme2.windowname = "limestone";
      scheme.scheme2.wallcolor = "black";
      scheme.scheme2.wallname = "limestone";
      scheme.scheme2.roofcolor = "black";
      scheme.scheme2.roofname = "limestone";

      scheme.scheme3.name = "scheme1";
      scheme.scheme3.roofcolor = "black";
      scheme.scheme3.roofname = "limestone";
      scheme.scheme3.downpipescolor = "black";
      scheme.scheme3.downpipesname = "limestone";
      scheme.scheme3.fasiacolor = "black";
      scheme.scheme3.fasianame = "limestone";
      scheme.scheme3.garagecolor = "black";
      scheme.scheme3.gargagename = "limestone";
      scheme.scheme3.windowcolor = "black";
      scheme.scheme3.windowname = "limestone";
      scheme.scheme3.wallcolor = "black";
      scheme.scheme3.wallname = "limestone";
      scheme.scheme3.roofcolor = "black";
      scheme.scheme3.roofname = "limestone";

      var color = {};
      color["yellow"] = {}
      color.yellow.name = "yellow";
      color.yellow.code = 60;

      color["blue"] = {}
      color.blue.name = "blue";
      color.blue.code = 240;

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = start;
      img.src = "http://colorbond.drupalvm.dev/themes/b3colorbond/images/Contemporary1.png";

      $globalImgData = '';

      function start() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        $globalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }


      $(".color-div a", context).click(function() {

        // Change color name
        $('.roof-color-name').text(color[$(this).attr('class')].name);
        $('.roofcolor').css({ "background": color[$(this).attr('class')].name });
        $('.color-div a').removeClass('active');

        code = color[$(this).attr('class')].code;
        $(this).addClass('active');

        convertBack();

        // shift blueish colors to greenish colors
        recolorPants(code);
      });

      $(".house-image.slick-slider").on("click", ".slick-slide", function() {
        // Re-draw image
        img.src = $(this).find('img').attr('src');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, canvas.width, canvas.height);
        $globalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      });

      $(".scheme-switcher.slick-slider").on("click", ".slick-slide", function() {
        // Update scheme panel
        schemeName = $(this).find('img').attr('name');
        $(".scheme .roofing").css({ "background": scheme[schemeName].roofcolor });
        $(".scheme .scheme-roof-name").text(scheme[schemeName].roofname);


        // Re-draw image
        /**
        img.src = $(this).find('img').attr('src');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, canvas.width, canvas.height);
        $globalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         **/
      });

      function convertBack() {

        ctx.putImageData($globalImgData, 0, 0);

      }

      function recolorPants(colorshift) {

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;

        for (var i = 0; i < data.length; i += 4) {
          red = data[i + 0];
          green = data[i + 1];
          blue = data[i + 2];
          alpha = data[i + 3];

          // skip transparent/semiTransparent pixels
          if (alpha < 200) {
            continue;
          }

          // var hsl = rgbToHsl(red, green, blue);
          // var hue = hsl.h * 360;

          // change blueish pixels to the new color
          if (red == 255 && green == 255 && blue == 255) {
            var newRgb = hslToRgb(colorshift/360, .5, .5);
            data[i + 0] = newRgb.r;
            data[i + 1] = newRgb.g;
            data[i + 2] = newRgb.b;
            data[i + 3] = data[i + 3];
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }


      function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }

        return ({
          h: h,
          s: s,
          l: l,
        });
      }


      function hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
          r = g = b = l; // achromatic
        } else {
          function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return ({
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255),
        });
      }
    }
  };

  Drupal.behaviors.slidesBehavior = {
    attach: function (context, settings) {

      $('.house-image', context).slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
      });

      $('.scheme-switcher', context).slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: $('.scheme-prev'),
        nextArrow: $('.scheme-next'),
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: '10px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: '10px',
              slidesToShow: 1
            }
          }
        ]
      });
    }
  };

})(jQuery);