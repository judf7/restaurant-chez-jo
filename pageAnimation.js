//Animation d'apparition avec fondu
const ratio = 0.5;
const options = { root: null, rootMargin: "0px", threshold: ratio };
const handleIntersect = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(handleIntersect, options);
export const observeElements = () => {
  document.querySelectorAll("[class*='reveal-']").forEach((r) => {
    observer.observe(r);
  });
};
