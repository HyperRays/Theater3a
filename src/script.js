/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function (a) {
  ($.browser = $.browser || {}).mobile =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    );
})(navigator.userAgent || navigator.vendor || window.opera);

$(".link-div").on("click", function () {
  window.location = $(this).attr("href");
  return false;
});

let word_list = "Und Dann gab's Keines Mehr".split(" ");

let delayFn = (val) => {
  return (Math.log(val) * 2 + 1) * (Math.log(val) * 3.5 + 1) * 100;
};

word_list.forEach((word, i) => {
  $(".opener>.text-container").append(
    "<span class='initial-state word-" + i + "'>" + word + "</span>"
  );
  $(".opener>.text-container").append(" ");
});

word_list.forEach((_, i) => {
  setTimeout(() => {
    $(".word-" + i).removeClass("initial-state");
    $(".word-" + i).addClass("anim");
  }, delayFn(i));
});

setTimeout(() => {
  $(".cont").css("opacity", "1");
}, delayFn(word_list.length + 1) + 4500);

setTimeout(() => {
  $(".overlay-text").removeClass("initial-state");
  $(".overlay-text").addClass("animate-overlay-text");
}, delayFn(word_list.length + 1) + 5000);

let mouse_y = $(window).height() / 2 - 350 / 2;
let mouse_x = $(window).width() / 2 - 350 / 2;
let scroll = 0;
let paralax = 200;

function set_maskpos() {
  $(".img").css(
    "mask-position",
    mouse_x + "px" + " " + (mouse_y + scroll) + "px"
  );
  $(".img").css(
    "background-position",
    ((0.5 * mouse_x) / $(window).height()) * paralax +
      "px" +
      " " +
      ((0.5 * mouse_y) / $(window).width()) * paralax +
      "px"
  );
}

set_maskpos();

let limiter = (val, fn) => {
  return Math.min(1, Math.max(0, fn(val)));
};
let show_text = () => {
  let opacity_fn = (val) => {
    return val * val * val * 5.359375 - 0.45;
  };

  let css_change = (elem, win, invert = false) => {
    elem.css("opacity", limiter(win, opacity_fn));
    const shift = 100;
    let move_amount = -shift * (limiter(win, opacity_fn) - 1);
    elem.css(
      "transform",
      "translate(" + move_amount * (!invert ? 1 : -1) + "px, 18px)"
    );
    elem.css("color","color-mix(in srgb, var(--final-color) "+ 100*limiter(win, (val) => {return Math.log2(val)+0.9;}) +"%, var(--initial-color))")
  };

  let calc_win_dist = (elem) => {
    let para_top = elem.offset().top;
    let para_h = elem.height();
    return (scroll - para_top) / ($(window).height() + para_h) + 1;
  };

  css_change($(".para-1"), calc_win_dist($(".para-1>.text-contain")));
  css_change($(".para-2"), calc_win_dist($(".para-2>.text-contain")), true);
  css_change($(".para-3"), calc_win_dist($(".para-3>.text-contain")));

  //     if () {
  //         $(".para-1").addClass("pop-in-text-left");
  //         $(".para-1").removeClass("initial-state");
  //     }

  //     if ($(".para-2").offset().top - $(window).height() / 2 <= scroll) {
  //         $(".para-2").addClass("pop-in-text-right");
  //         $(".para-2").removeClass("initial-state");
  //     }

  //     if ($(".para-3").offset().top - $(window).height() / 2 <= scroll) {
  //         $(".para-3").addClass("pop-in-text-left");
  //         $(".para-3").removeClass("initial-state");
  //     }
};

if (!$.browser.mobile) {
  $(".scrollbar-hidden::-webkit-scrollbar").css("display", "none");
  $(".scrollbar-hidden").css(
    "-ms-overflow-style",
    "none",
    " scrollbar-width",
    "none"
  );

  $(document).mousemove((event) => {
    mouse_y = event.clientY - 350 / 2;
    mouse_x = event.clientX - 350 / 2;
    set_maskpos();
  });

  $(window).scroll((event) => {
    scroll = $(window).scrollTop();
    set_maskpos();
    show_text();
  });
} else {
  $(".img").css("transition", "0.1s ease");
  let mouse_y = $(window).height() / 2 - 350 / 2;
  let mouse_x = $(window).width() / 2 - 350 / 2;

  $(window).scroll((event) => {
    scroll = $(window).scrollTop();
    $(".img").css(
      "mask-position",
      mouse_x +
        "px" +
        " " +
        ((scroll / $(window).height()) * paralax * 5 + mouse_y) +
        "px"
    );
    show_text();
  });
}
