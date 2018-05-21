
export const polarToCart = (angle, radius) => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle)
})

export const cartToAngle = (x ,y) => Math.atan2(y,x)

export function getOffset(element, center) {
    var bound = element.getBoundingClientRect();
    var html = document.documentElement;

	center = center ? center : {x: 0, y: 0}

    return {
        x: bound.left + window.pageXOffset - html.clientLeft + center.x,
        y: bound.top + window.pageYOffset - html.clientTop + center.y
    }
}
