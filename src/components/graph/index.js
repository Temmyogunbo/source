import { Box } from '@jcblw/box'
import React from 'react'
import { createGraphAttibutes } from './attributes'

const sampleData = [
  { label: 'Google', percent: 0.35 },
  { label: 'Facebook', percent: 0.25 },
  { label: 'Stack-Overflow', percent: 0.1 },
  { label: 'Twitter', percent: 0.1 },
  { label: 'Other', percent: 0.2 },
]

const isSelected = selected => seg =>
  selected && selected.label.children === seg.label.children

export const Graph = React.memo(
  ({
    data,
    height,
    labelRadiusOffest,
    onSegmentClick,
    radius,
    rotateGraph,
    selected,
    selectedStroke,
    spacingAngle,
    stroke,
    strokeLinecap,
    strokeWidth,
    textFill,
    width,
  }) => {
    const center = [width / 2, height / 2]
    const rotation = rotateGraph + (strokeLinecap !== 'butt' ? 1 : 0)
    const segments = createGraphAttibutes({
      data,
      radius,
      center,
      spacingAngle,
      labelRadiusOffest,
      rotateGraph: rotation,
    })
    const isSelectedSegment = isSelected(selected)
    console.log(selected)
    return (
      <Box
        Component="svg"
        width={`${width}px`}
        height={`${height}px`}
        style={{ width, height }}
      >
        <Box
          Component="g"
          transform={`rotate(${rotation}, ${center[0]}, ${
            center[1]
          })`}
        >
          {segments.map((seg, i) => (
            <Box
              key={`path-${i}`}
              fill="transparent"
              strokeWidth={strokeWidth}
              stroke={
                isSelectedSegment(seg) ? selectedStroke : stroke
              }
              strokeLinecap={strokeLinecap}
              Component="path"
              onMouseEnter={onSegmentClick.bind(null, seg)}
              cursor="pointer"
              ariaSelected={isSelectedSegment(seg)}
              {...seg.path}
            />
          ))}
        </Box>
        {segments.map((seg, i) => (
          <Box
            key={`label-${i}`}
            fill={textFill}
            Component="text"
            onMouseEnter={onSegmentClick.bind(null, seg)}
            cursor="pointer"
            {...seg.label}
          />
        ))}
      </Box>
    )
  }
)

Graph.defaultProps = {
  data: sampleData,
  height: 350,
  labelRadiusOffest: 20,
  onSegmentClick: () => {},
  radius: 70,
  rotateGraph: -90,
  selectedStroke: 'outerSpace',
  spacingAngle: 20,
  stroke: 'saltBox',
  strokeLinecap: 'round',
  strokeWidth: 8,
  textFill: 'outerSpace',
  width: 350,
}
