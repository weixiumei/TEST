class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (options) {
      this.computed = !!options.computed
    } 

    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }

  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {

    } finally {
      popTarget()
    }
    return value
  }

  update () {
    if (this.computed) {
      if (this.dep.subs.length === 0) {
        this.dirty = true
      } else {
        this.getAndInvoke(() => {
          this.dep.notify()
        })
      }
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  evaluate () {
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }

  depend () {
    if (this.dep && Dep.target) {
      this.dep.depend()
    }
  }
}