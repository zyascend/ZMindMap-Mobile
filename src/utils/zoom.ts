import { select, Selection } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'

/**
 * 使图具有缩放能力
 */
function getZoomer(
  mainG: Selection<SVGGElement, unknown, null, undefined>,
  mainSvg: Selection<SVGSVGElement, unknown, null, undefined>,
) {
  const zoomer = zoom()
    .on('zoom', event => {
      mainG.attr('transform', event.transform)
    })
    .scaleExtent([0.1, 4])
  // .translateExtent([[-1000, -1000], [1000, 800]])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  zoomer(mainSvg)
  mainSvg.on('dblclick.zoom', null)
  return zoomer
}
/**
 * 使导图适应当前屏幕大小
 */
const zoomAndFit = () => {
  const svgRef = document.getElementById('mainSvg') as unknown as SVGSVGElement
  const mainGRef = document.getElementById('mainG') as unknown as SVGGElement
  if (!svgRef || !mainGRef) return
  const gMetrics = mainGRef.getBBox()
  const svgMetrics = svgRef.getBoundingClientRect()

  // 计算缩放尺度
  // [+20]的目的是留出一部分边界空隙
  const scale = Math.min(
    svgMetrics.width / (gMetrics.width + 140),
    svgMetrics.height / (gMetrics.height + 100),
  )

  // 计算移动的中心
  const svgCenter = { x: svgMetrics.width / 2, y: svgMetrics.height / 2 }
  const gCenter = { x: (gMetrics.width * scale) / 2, y: (gMetrics.height * scale) / 2 }
  const center = zoomIdentity
    .translate(
      -gMetrics.x * scale + svgCenter.x - gCenter.x,
      -gMetrics.y * scale + svgCenter.y - gCenter.y,
    )
    .scale(scale)

  const mainG = select(mainGRef)
  const mainSvg = select(svgRef)

  const zoomer = getZoomer(mainG, mainSvg)
  if (!zoomer) return
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mainSvg.transition().duration(500).call(zoomer.transform, center)
}

export default zoomAndFit
