<template>
  <div v-show='show' class="i-loading-mask">
    <div class='i-loadingt-contain'>
      <div class='weui_mask_transparent'></div>
      <div class='center-container is-table'>
        <div class='table-cell'>
          <div class='center-block' id='iLoadingDiv'>
            <img src="./loading.svg" style="width:40px;margin-bottom:5px;" />
            <div>{{text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .i-loading-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5000;
    background: rgba(255, 255, 255, 0.4);
  }
  .i-loadingt-contain {
    position: fixed;
    top: e('calc(50% - 100px)');
    width: 100%;
    z-index: 5001;
    @modalDuration: 400ms;
    .center-container.is-table {
      display: table;
      width: 100%;
      text-align: center;
    }

    .is-table .table-cell {
      display: table-cell;
      vertical-align: middle;
    }

    .is-table .center-block {
      max-width: 60%;
      margin: 0 auto;
      z-index: 11000;
      text-align: center;
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(1.185);
      transition-property: transform, opacity;
      color: white;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 0.4em;
      padding: 10px 12px 5px;
      font-size: 14px;
      &.modal-in {
        opacity: 1;
        transition-duration: @modalDuration;
        transform: translate3d(0, 0, 0) scale(1);
      }
      &.modal-out {
        opacity: 0;
        z-index: 11000-1;
        transition-duration: @modalDuration;
        transform: translate3d(0, 0, 0) scale(0.815);
      }
    }
  }
</style>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Loading'
    }
  },
  computed: {},
  data () {
    return {
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$nextTick(() => {
          let modal = document.getElementById('iLoadingDiv')
          let size = textSize(this.text)
          if (size.width + 12 * 2 < modal.offsetWidth && modal.offsetWidth) {
            modal.style.width = (size.width + 40) + 'px'
          } else {
            modal.style.width = '80%'
          }
          removeClass(modal, 'modal-out')
          addClass(modal, 'modal-in')
        })
      } else {
        let modal = document.getElementById('iLoadingDiv')
        removeClass(modal, 'modal-in')
        addClass(modal, 'modal-out')
        setTimeout(() => {
          removeClass(modal, 'modal-out')
          modal.style.width = '80%'
        }, 500)
      }
    },
    value (val) {
      this.show = val
    }
  }
}

// 计算字符串宽度
function textSize (text) {
  let span = document.createElement('span')
  let result = {}
  result.width = span.offsetWidth
  result.height = span.offsetWidth
  span.style.visibility = 'hidden'
  document.body.appendChild(span)
  if (typeof span.textContent !== 'undefined') {
    span.textContent = text
  } else {
    span.innerText = text
  }
  result.width = span.offsetWidth - result.width
  result.height = span.offsetHeight - result.height
  span.parentNode.removeChild(span)
  return result
}

function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ' ' + className
  }
}

function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
}

// endregion
</script>
