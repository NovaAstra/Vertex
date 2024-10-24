import { defineComponent, onMounted, ref, reactive, computed, Ref } from "vue"

import data from "./demo.json"


export const Row = defineComponent({
  props: {
    observer: Function,
    index: Number
  },
  setup(props, { slots }) {
    const rowRef = ref()

    onMounted(() => {
      props.observer(rowRef.value, props.index)
    })

    return () => (
      <div class="row" ref={rowRef}>{slots.default?.()}</div>
    )
  }
})

export type ItemResize = Readonly<[index: number, size: number]>;

export const App = defineComponent({
  setup() {
    const tableRef = ref() as Ref<HTMLElement>

    const offset = ref(0)

    const mountedIndexes = new WeakMap()

    const cache = reactive({
      sizes: [],
      viewport: 0,
      estimatedSize: 60,
      length: 10000
    })

    const height = computed(() => {
      if (!cache.length) return 0;

      let height = 0;

      for (let i = 0; i < cache.length; i++) {
        height += cache.sizes[i] || cache.estimatedSize
      }

      return height
    })

    const range = computed(() => {
      let start = 0;
      let offsetWidth = 0;
      let diff = 0;
      while (offsetWidth < offset.value) {
        const new_val = cache.sizes[start];
        diff = offset.value - offsetWidth;
        start += 1;
        offsetWidth += new_val !== undefined ? new_val : cache.estimatedSize;
      }
      start += diff / (cache.sizes[start - 1] || cache.estimatedSize);

      start = Math.floor(Math.max(0, start - 1))

      let w = 0
      let end = start
      while (w < cache.viewport) {
        const new_val = cache.sizes[start + end] || cache.estimatedSize;
        w += new_val
        end += 1
      }
      console.log(start, end, cache.sizes)
      return [start, end + 1]
    })


    const observer = new ResizeObserver((entries) => {
      const resizes: ItemResize[] = [];

      for (const { target, contentRect } of entries) {
        if (!(target as HTMLElement).offsetParent) continue;

        if (target === tableRef.value) {
          cache.viewport = contentRect.height
        } else {
          const index = mountedIndexes.get(target);
          if (index != null) {
            resizes.push([index, contentRect.height]);
          }
        }
      }

      if (resizes.length) {
        const updated = resizes.filter(
          ([index, size]) => cache.sizes[index] !== size
        );

        for (const [index, size] of updated) {
          cache.sizes[index] = size || cache.estimatedSize
        }
      }
    })

    const observeItem = (el: HTMLElement, i: number) => {
      mountedIndexes.set(el, i);
      observer.observe(el)
    }

    function onScroll(event) {
      event.stopPropagation();
      offset.value = event.target.scrollTop

    }

    function onWheel(event) {
      // event.preventDefault();
      // console.log(1)
    }

    onMounted(() => {
      observer.observe(tableRef.value)

      tableRef.value.addEventListener("scroll", onScroll.bind(this), { passive: true })
      tableRef.value.addEventListener("mousewheel", onWheel.bind(this))
    })

    return () => {
      const Rows = []

      const [start, end] = range.value

      for (let index = start; index < end; index++) {
        Rows.push(<Row observer={observeItem} index={index}>{index}.{data[index].user_name}</Row>)
      }

      return (
        <div class="table" ref={tableRef}>
          <div class="table-virtual-panel" style={{ height: height.value + 'px' }}>
          </div>
          <div class="table-scroll-clip">
            {Rows}
          </div>
        </div>
      )
    }
  }
})