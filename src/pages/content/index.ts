import "@pages/content/style.scss";

// console.log("content loaded");

const config = {
  characterData: false,
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["src"],
};

const domElementsMutation = (element: HTMLElement) => {
  const links = Array.from(element.querySelectorAll<"a">("a"));

  links.map((link) => {
    const prevBtn = document.getElementById(`${link.href}__check__btn`);

    if (prevBtn) return;
    link.classList.add("tooltip");
    const element = document.createElement("button");
    element.id = `${link.href}__check__btn`;
    element.classList.add("tooltiptext");
    element.textContent = "Check";

    // styles
    element.style.color = "white";
    element.style.background = "black";
    element.style.border = "1px solid maroon";
    element.style.display = "inline-block";

    const checkLink = async () => {
      element.textContent = "Checking...";
      const response = await fetch(
        // "https://raksh-ml-model-2xuov.ondigitalocean.app/api",
        "http://localhost:5000/api",
        {
          method: "POST",
          body: JSON.stringify({
            url: link.href,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      element.textContent =
        data.prediction === "safe" ? "safe ✅" : "unsafe ❗️";

      if (data.prediction === "unsafe") {
        link.setAttribute("raksh__status", "unsafe");
      }
    };

    link.addEventListener("mouseenter", function (e) {
      const children = Array.from(link.children);
      const hasElement = children.some((child) => {
        return child.id === element.id;
      });

      if (!hasElement) link.appendChild(element);
    });

    link.addEventListener("mouseleave", function () {
      link.removeChild(element);
    });

    link.addEventListener("click", (e) => {
      if (link.getAttribute("raksh__status") !== "unsafe") return;

      e.preventDefault();

      const popup = document.createElement("div");
      popup.id = "check__link__popup";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.background = "rgba(0,0,0,0.1)";
      popup.style.zIndex = "999";

      const popupInner = document.createElement("div");
      popupInner.style.position = "absolute";
      popupInner.style.top = "50%";
      popupInner.style.left = "50%";
      popupInner.style.transform = "translate(-50%, -50%)";
      popupInner.style.width = "40%";
      popupInner.style.background = "#dce0e8";
      popupInner.style.color = "#4c4f69";
      popupInner.style.padding = "2rem";
      popupInner.style.borderRadius = "1rem";

      const popupClose = document.createElement("button");
      popupClose.textContent = "X";
      popupClose.style.position = "absolute";
      popupClose.style.top = "10px";
      popupClose.style.right = "40px";
      popupClose.style.border = "none";
      popupClose.style.cursor = "pointer";

      popupClose.addEventListener("click", () => {
        document.body.removeChild(popup);
      });

      popupInner.appendChild(popupClose);

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
      
        <div style="text-align: center;">
          <div class="logo__container">
            <div class="logo__wrapper">
              <img src="https://cdn.tealfeed.com/articles/content-images/642338ef71e7c94dd352fdec/1680029987640.png" />
            </div>

            <h1 class="logo__heading">Raksh</h1>
          </div>

          <h1>
            This link has been marked as unsafe by Raksh!
          </h1>

          <div class="btn__container">
            <button class="back__btn">Go Back</button>
            <buttonn class="proceed__btn">Proceed Anyway</button>
          </div>

          <div class="note__container">
            <p>
              <strong>
                Note: This is a prototype and is not a production ready product.
              </strong>
            </p>
          </div>
        </div>
      `;

      popupContent.querySelector(".back__btn").addEventListener("click", () => {
        document.body.removeChild(popup);
      });

      popupContent
        .querySelector(".proceed__btn")
        .addEventListener("click", () => {
          document.body.removeChild(popup);
          window.open(link.href, "_blank", "noopener,noreferrer");
        });

      popupInner.appendChild(popupContent);

      popup.appendChild(popupInner);

      const prevPopup = document.getElementById("check__link__popup");

      if (!prevPopup) {
        document.body.appendChild(popup);
      }
    });

    element.addEventListener("click", (e) => {
      e.preventDefault();
      checkLink();
    });
  });
};

const observer = new MutationObserver(function (mutations) {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      domElementsMutation(mutation.target as HTMLElement);
    }
  });
});

const watchDOM = () => {
  observer.observe(document, config);
};

watchDOM();

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");
