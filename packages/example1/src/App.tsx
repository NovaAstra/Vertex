import { defineComponent, onMounted, ref, reactive, computed, Ref } from "vue"


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
    const start = ref(0)
    const end = ref(20)

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
      // event.stopPropagation();

      console.log(2)
    }

    function onWheel(event) {
      event.preventDefault();
      console.log(1)
    }

    onMounted(() => {
      observer.observe(tableRef.value)

      tableRef.value.addEventListener("scroll", onScroll.bind(this), { passive: true })
      tableRef.value.addEventListener("mousewheel", onWheel.bind(this))
    })

    return () => {
      const Rows = []

      for (let index = start.value; index < end.value; index++) {
        Rows.push(<Row observer={observeItem} index={index}>{index}</Row>)
      }

      return (
        <div class="table" ref={tableRef}>
          <div class="table-virtual-panel" style={{ height: height.value + 'px' }}>
            <div>{Rows}</div>
          </div>
          <div class="table-scroll-clip"></div>
        </div>
      )
    }
  }
})