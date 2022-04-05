export class InfiniteScroll {
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25,
  };

  constructor(target, cl) {
    this.observer = this.init(cl);
    this.observer.observe(target);
  }

  init(cl) {
    return new IntersectionObserver(cl, this.options);
  }

}
