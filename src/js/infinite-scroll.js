export class InfiniteScroll {
  constructor(target, cl) {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };
    this.observer = this.init(cl);
    this.observer.observe(target);
  }

  init(cl) {
    return new IntersectionObserver(cl, this.options);
  }
}
