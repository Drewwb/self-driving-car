function lerp(A, B, t) {
    return A + (B - A) * t;
}
function getIntersection(A, B, C, D) {
    var tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    var uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    var bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
        var t = tTop / bottom;
        var u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            };
        }
    }
    return null;
}
function polyIntersect(poly1, poly2) {
    for (var i = 0; i < poly1.length; i++) {
        for (var j = 0; j < poly2.length; j++) {
            var touch = getIntersection(poly1[i], poly1[(i + 1) % poly1.length], poly2[j], poly2[(j + 1) % poly2.length]);
            if (touch) {
                return true;
            }
        }
    }
    return false;
}
function getRGBA(value) {
    var alpha = Math.abs(value);
    var R = value < 0 ? 0 : 255;
    var G = R;
    var B = value > 0 ? 0 : 255;
    return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
}
