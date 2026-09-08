/**
 * Drag & drop upload: dragover highlighting, real File objects read with
 * createObjectURL-free metadata, simulated per-file progress and removal.
 * Replace the fake progress timer with your XHR/fetch upload progress.
 */
(function () {
  const dropzone = document.getElementById("fu-dropzone");
  const input = document.getElementById("fu-input");
  const list = document.getElementById("fu-list");
  if (!dropzone || !input || !list) return;

  const MAX_BYTES = 10 * 1024 * 1024;

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function extensionOf(name) {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().slice(0, 3).toUpperCase() : "FILE";
  }

  function addFile(file) {
    if (file.size > MAX_BYTES) {
      console.warn(file.name + " exceeds the 10 MB limit and was skipped.");
      return;
    }
    const item = document.createElement("li");
    item.className = "fu__item";
    item.dataset.state = "uploading";
    item.innerHTML =
      '<span class="fu__item-icon"></span>' +
      '<span class="fu__item-body"><span class="fu__item-row">' +
      '<span class="fu__item-name"></span><span class="fu__item-size">' +
      formatSize(file.size) +
      "</span></span>" +
      '<span class="fu__item-track"><span class="fu__item-fill"></span></span></span>' +
      '<button type="button" class="fu__item-remove">&times;</button>';
    item.querySelector(".fu__item-icon").textContent = extensionOf(file.name);
    item.querySelector(".fu__item-name").textContent = file.name;
    const removeButton = item.querySelector(".fu__item-remove");
    removeButton.setAttribute("aria-label", "Remove " + file.name);
    list.appendChild(item);

    const fill = item.querySelector(".fu__item-fill");
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(progress + 8 + Math.random() * 14, 100);
      fill.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(timer);
        item.dataset.state = "done";
      }
    }, 140);

    removeButton.addEventListener("click", () => {
      clearInterval(timer);
      item.remove();
    });
  }

  dropzone.addEventListener("click", () => input.click());
  dropzone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      input.click();
    }
  });

  input.addEventListener("change", () => {
    Array.from(input.files || []).forEach(addFile);
    input.value = "";
  });

  ["dragenter", "dragover"].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.setAttribute("data-dragover", "true");
    });
  });

  ["dragleave", "drop"].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      event.preventDefault();
      dropzone.setAttribute("data-dragover", "false");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    const files = event.dataTransfer ? event.dataTransfer.files : [];
    Array.from(files).forEach(addFile);
  });
})();
