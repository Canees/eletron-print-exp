class ResizeChart {
  /**
     * 监听resize
     */
  on (chart) {
    if (chart) {
      window.addEventListener('resize', function () {
        if (Array.isArray(chart) && chart.length) {
          for (let k = 0; k < chart.length; k++) {
            const el = chart[k]
            el.resize()
          }
        } else {
          if (chart instanceof Object) {
            chart.resize()
          } else {
            return false
          }
        }
      })
    }
  }
  /**
   * 关闭
   */
  off (chart) {
    if (chart) {
      window.removeEventListener('resize', function () {
        if (Array.isArray(chart) && chart.length) {
          for (let k = 0; k < chart.length; k++) {
            const el = chart[k]
            el.dispose()
          }
        } else {
          chart.dispose()
        }
      })
    }
  }
}
export default new ResizeChart()
