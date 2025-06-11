// Tooltip initialization from header.blade.php
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl);
});

includeHTML();

// DOMContentLoaded listener and scroll logic from header.blade.php
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const mainHeader = document.getElementById("mainHeader");
  const mobileHeader = document.getElementById("mobileHeader");
  const infoHeader = document.getElementById("infoHeader");
  window.addEventListener(
    "scroll",
    function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > mainHeader.offsetHeight + 20) {
        mainHeader.classList.add("show");
        mainHeader.classList.add("fixed-header");
        mobileHeader.classList.add("fixed-header");
        mobileHeader.classList.add("show");
      } else if (st < 20) {
        mainHeader.classList.remove("fixed-header");
        mainHeader.classList.remove("show");
        mobileHeader.classList.remove("fixed-header");
        mobileHeader.classList.remove("show");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    },
    false
  );

  // Custom script to close other dropdowns when one is opened in offcanvas
  const offcanvas = document.getElementById("mobileMenu");
  if (offcanvas) {
    offcanvas.addEventListener("show.bs.dropdown", function (event) {
      const dropdownToggles = offcanvas.querySelectorAll(
        '.dropdown-toggle[aria-expanded="true"]'
      );
      dropdownToggles.forEach(function (toggle) {
        if (toggle !== event.target) {
          bootstrap.Dropdown.getInstance(toggle).hide();
        }
      });
    });

    // Custom script for custom toggle menus in offcanvas
    const customToggleLinks = offcanvas.querySelectorAll(".custom-toggle-link");
    customToggleLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;

        offcanvas
          .querySelectorAll(".custom-submenu")
          .forEach((otherSubmenu) => {
            if (
              otherSubmenu !== submenu &&
              !otherSubmenu.classList.contains("d-none")
            ) {
              otherSubmenu.classList.add("d-none");
              const otherLink = otherSubmenu.previousElementSibling;
              if (otherLink && otherLink.querySelector(".fa-angle-down")) {
                otherLink.querySelector(".fa-angle-down").style.transform =
                  "rotate(0deg)";
              }
            }
          });

        submenu.classList.toggle("d-none");
        const arrowIcon = this.querySelector(".fa-angle-down");
        if (arrowIcon) {
          if (!submenu.classList.contains("d-none")) {
            arrowIcon.style.transform = "rotate(180deg)";
          } else {
            arrowIcon.style.transform = "rotate(0deg)";
          }
        }
      });
    });
  }

  // Các biến cấu hình
  const offset = 300;
  const offset_opacity = 1200;
  const scroll_top_duration = 700; // Không còn cần nếu dùng scrollTo với behavior: 'smooth'

  // Lấy phần tử nút back-to-top
  const backToTop = document.getElementById("to-top");

  // Theo dõi sự kiện scroll
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > offset) {
      backToTop.classList.add("cd-is-visible");
      if (scrollTop > offset_opacity) {
        backToTop.classList.add("cd-fade-out");
      } else {
        backToTop.classList.remove("cd-fade-out");
      }
    } else {
      backToTop.classList.remove("cd-is-visible", "cd-fade-out");
    }
  });

  // Sự kiện click: cuộn lên đầu
  backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    // Sử dụng jQuery animate để đảm bảo smooth scroll trên mọi trình duyệt
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      scroll_top_duration
    );
    // Fallback cho trình duyệt không hỗ trợ jQuery
    if (typeof $ === "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;

      // Here you would typically send this data to your server
      // For now, we'll just show an alert
      alert(
        "Cảm ơn " +
          fullName +
          " đã đăng ký! Chúng tôi sẽ liên hệ với bạn qua số điện thoại " +
          phoneNumber +
          " trong thời gian sớm nhất."
      );

      // Close the modal
      $("#registrationModal").modal("hide");

      // Reset the form
      this.reset();
    });
});

function scrollToRegisterForm() {
  const scroll_top_duration = 700;
  const registerForm = document.getElementById("register-form");
  const mainHeader = document.getElementById("mainHeader");
  const mobileHeader = document.getElementById("mobileHeader");
  let headerHeight = 0;

  if (!registerForm) {
    $("#registrationModal").modal("show");
    return;
  }

  if (
    mobileHeader &&
    window.getComputedStyle(mobileHeader).display !== "none"
  ) {
    // Đóng offcanvas của mobileHeader nếu đang mở
    const offcanvasElement = document.querySelector(".offcanvas");
    if (offcanvasElement) {
      const offcanvasInstance =
        bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
    headerHeight = mobileHeader.classList.contains("show")
      ? mobileHeader.offsetHeight
      : 2 * mobileHeader.offsetHeight;
  } else {
    headerHeight = mainHeader.classList.contains("show")
      ? mainHeader.offsetHeight
      : 2 * mainHeader.offsetHeight;
  }

  // Sử dụng jQuery animate để đảm bảo smooth scroll trên mọi trình duyệt
  $("html, body").animate(
    {
      scrollTop: $(registerForm).offset().top - headerHeight - 10,
    },
    scroll_top_duration
  );

  // Fallback cho trình duyệt không hỗ trợ jQuery
  if (typeof $ === "undefined") {
    const offsetPosition =
      registerForm.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      10;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
