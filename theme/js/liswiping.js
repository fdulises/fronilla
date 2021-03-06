function liswiping({ el, callback, threshold = 150, restraint = 100, allowedTime = 300 }) {
    const toucheel = document.querySelector(el);
    let ismoving = false;
    let swipedir;
    let cx1, cy1, ct1;
    let cx2, cy2;
    let distX, distY;

    //let threshold = 150; //required min distance traveled to be considered swipe
    //let restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    //let allowedTime = 300; // maximum time allowed to travel that distance

    toucheel.addEventListener('mousedown', function (e) {
        ismoving = true;
        swipedir = 'false';
        cx1 = e.clientX;
        cy1 = e.clientY;
        ct1 = new Date().getTime();
    });

    toucheel.addEventListener('mouseup', function (e) {
        ismoving = false;
        distX = cx2 - cx1;
        distY = cy2 - cy1;
        let elapsedTime = new Date().getTime() - ct1;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipedir = (distX < 0) ? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipedir = (distY < 0) ? 'up' : 'down';
            }
        }
        callback({
            element: toucheel,
            swipedir: swipedir,
            distX: distX,
            distY: distY,
        });
    });

    toucheel.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (ismoving) {
            cx2 = e.clientX;
            cy2 = e.clientY;
        }
    });

    toucheel.addEventListener('touchstart', function (e) {
        e.preventDefault();
        let touchobj = e.changedTouches[0];
        swipedir = 'false';
        cx1 = touchobj.pageX;
        cy1 = touchobj.pageY;
        ct1 = new Date().getTime();
    });

    toucheel.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    toucheel.addEventListener('touchend', function (e) {
        e.preventDefault();
        let touchobj = e.changedTouches[0];
        distX = touchobj.pageX - cx1;
        distY = touchobj.pageY - cy1;
        let elapsedTime = new Date().getTime() - ct1;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipedir = (distX < 0) ? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipedir = (distY < 0) ? 'up' : 'down';
            }
        }
        callback({
            element: toucheel,
            swipedir: swipedir,
            distX: distX,
            distY: distY,
        });
    });
}