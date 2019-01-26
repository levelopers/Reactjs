
let warn = "you havent registered popup yet"

let popup = {
  open: warn,
  close: warn
}

//ref callback
export const register = (ref) => {
  if (ref) {
    popup.open = ref.open
    popup.close = ref.close
  }
}

export default popup
export { default as PopupInstance } from './component'