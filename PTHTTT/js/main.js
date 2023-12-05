const getRooms = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) return [];
    return data;
  } catch (error) {
    return [];
  }
};

(async function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // render data
  const rooms = await getRooms("http://localhost:5000/api/rooms");

  const top3Rooms = rooms
    .sort((a, b) => b.roomType.price - a.roomType.price)
    .slice(0, 3);

  const roomsHtml = (rooms) =>
    rooms.map(
      (
        room,
        i
      ) => `<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${(
        0.1 *
        i *
        3
      ).toFixed(1)}s">
  <div class="room-item shadow rounded overflow-hidden">
    <div class="position-relative">
      <img class="img-fluid w-100" src="${room.image}" alt="Room Image"  />
      <small
        class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4"
        >$${room.roomType.price}/Night</small
      >
    </div>
    <div class="p-4 mt-2">
      <div class="d-flex justify-content-between mb-3">
        <h5 class="mb-0">${room.name}</h5>
        <div class="ps-2">
          <small class="fa fa-star text-primary"></small>
          <small class="fa fa-star text-primary"></small>
          <small class="fa fa-star text-primary"></small>
          <small class="fa fa-star text-primary"></small>
          <small class="fa fa-star text-primary"></small>
        </div>
      </div>
      <div class="d-flex mb-3">
        <small class="border-end me-3 pe-3"
          ><i class="fa fa-bed text-primary me-2"></i>${
            room.roomType.bedQuantity
          } Bed</small
        >
        <small class="border-end me-3 pe-3"
          ><i class="fa fa-bath text-primary me-2"></i>2 Bath</small
        >
        <small
          ><i class="fa fa-wifi text-primary me-2"></i>Wifi</small
        >
      </div>
      <p class="text-body mb-3 text-truncate-2">
        ${room.description}
      </p>
      <div class="d-flex justify-content-between">
        <a class="btn btn-sm btn-primary rounded py-2 px-4" href=""
          >View Detail</a
        >
        <a class="btn btn-sm btn-dark rounded py-2 px-4" href=""
          >Book Now</a
        >
      </div>
    </div>
  </div>
</div>`
    );

  $(".top3Rooms").html(roomsHtml(top3Rooms));

  $(".rooms").html(roomsHtml(rooms));
})(jQuery);
