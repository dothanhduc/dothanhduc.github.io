document.addEventListener("DOMContentLoaded", function () {
  //handleFooterStyle();

  includeHTML();
  // const offcanvas = document.getElementById("mobileMenu");
  // if (offcanvas) {
  //   offcanvas.addEventListener("show.bs.dropdown", function (event) {
  //     const dropdownToggles = offcanvas.querySelectorAll(
  //       '.dropdown-toggle[aria-expanded="true"]'
  //     );
  //     dropdownToggles.forEach(function (toggle) {
  //       if (toggle !== event.target) {
  //         bootstrap.Dropdown.getInstance(toggle).hide();
  //       }
  //     });
  //   });
  // }
  // const customToggleLinks = offcanvas.querySelectorAll(".dropdown");
  // customToggleLinks.forEach((link) => {
  //   link.addEventListener("click", function (e) {
  //     if (e.target.tagName === "A" || e.target.closest("a")) {
  //       return;
  //     }

  //     e.preventDefault();
  //     const navItem = this.closest(".nav-item");
  //     const submenu = this.querySelector(".dropdown-menu");

  //     offcanvas
  //       .querySelectorAll(".dropdown .dropdown-menu")
  //       .forEach((otherSubmenu) => {
  //         if (otherSubmenu !== submenu) {
  //           const otherNavItem = otherSubmenu.closest(".nav-item");
  //           if (otherNavItem.classList.contains("expanded")) {
  //             otherNavItem.classList.remove("expanded");
  //           }
  //         }
  //       });

  //     navItem.classList.toggle("expanded");
  //   });
  // });

  const offset = 300;
  const offset_opacity = 1200;
  const scroll_top_duration = 700;

  const backToTop = document.getElementById("to-top");

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
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      scroll_top_duration
    );
    if (typeof $ === "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});


window.scrollToRegisterForm = function () {
  const scroll_top_duration = 700;
  const registerForm = document.getElementById("register-component");
  const mainHeader = document.getElementById("mainHeader");
  const mobileHeader = document.getElementById("mobileHeader");
  let headerHeight = 0;

  if (!registerForm) {
    const modalElement = document.getElementById("registrationModal");
    const registrationModal = new bootstrap.Modal(modalElement);
    registrationModal.show();
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
    }
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
    headerHeight = mobileHeader.offsetHeight;
  } else {
    headerHeight = mainHeader.offsetHeight;
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
};

window.handleFooterStyle = function () {
  const footer = document.getElementById("footer");
  const bodyHeight = document.body.getBoundingClientRect().height;
  const oldMarginTop = footer.style.marginTop
    ? parseFloat(footer.style.marginTop.replace("px", ""))
    : 0;
  if (bodyHeight < window.innerHeight) {
    const newMarginTop = window.innerHeight - bodyHeight + oldMarginTop;
    footer.style.marginTop = newMarginTop + "px";
  }
};

window.handleKeySearch = function (e) {
  if (e.key === "Enter") {
    let row = e.target;
    onChangeSearchParams("search", row.value);
  }
};

window.onChangeSearchParams = function (param, value) {
  const urlParams = new URLSearchParams(window.location.search);
  if (value == "") {
    urlParams.delete(param);
  } else {
    urlParams.set(param, value);
  }
  if (urlParams.toString().length === 0) {
    window.location = window.location.pathname;
  } else {
    window.location.search = urlParams;
  }
};

window.handleKeyHeaderSearch = function (e) {
  if (e.key === "Enter") {
    let row = e.target;
    onChangeHeaderSearch(row.value);
  }
};

window.onChangeHeaderSearch = function (value) {
  const urlParams = new URLSearchParams(window.location.search);
  if (value == "") {
    return;
  } else {
    window.location = "/tim-kiem/" + value;
  }
};



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